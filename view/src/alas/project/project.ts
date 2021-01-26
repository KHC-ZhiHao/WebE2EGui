import JSzip from 'jszip'
import core from '@/core'
import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList, ILoader } from 'alas'
import { mkdir, rmdir, write, read, beautify } from '@/requests'
import { getConfig } from '@/utils'

import * as Spec from './spec'
import * as Group from './group'
import * as Variables from './variable'
import * as CustomBtns from './customBtn'
import * as Dependencies from './dependencie'
import * as BrowserOption from './browserOption'

const config = getConfig()

export type Output = {
    id: string
    tag: string
    name: string
    desc: string
    specs: Spec.Output[]
    groups: Group.Output[]
    createdAt: number
    updatedAt: number
    variables: Variables.Output[]
    customBtns: CustomBtns.Output[]
    dependencies: Dependencies.Output[]
}

export interface Model extends IModel {
    id: string
    name: string
    desc: string
    createdAt: number
    updatedAt: number
    specs: Spec.List
    groups: Group.List
    browserOption: BrowserOption.Model
    variables: Variables.List
    customBtns: CustomBtns.List
    dependencies: Dependencies.List
    $v: {
        tag: 'project'
        output: Output
        projectPath: string
    }
    $m: {
        validate: () => any
        zip: () => any
        getOutputFiles: (specs?: string[]) => any
    }
    $o: {
        fetch: ILoader<void, { name: string }>
        save: ILoader<void, void>
        write: ILoader<void, {
            specs?: string[]
        } | undefined>
    }
}

export interface List extends IList<Model> {
    v: {
        output: Output[]
    }
}

export const Options: IModelOptions<Model, List> = {
    body: {
        id: [],
        name: [],
        desc: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        desc: () => '',
        createdAt: () => Date.now()
    },
    refs: {
        specs: '[spec]',
        groups: '[group]',
        variables: '[variable]',
        customBtns: '[customBtn]',
        dependencies: '[dependencie]',
        browserOption: 'browserOption'
    },
    export(self) {
        if (self.dependencies.size === 0) {
            self.dependencies.write({
                name: 'request-promise'
            })
        }
    },
    views: {
        tag() {
            return 'project'
        },
        output(self) {
            return {
                id: self.id,
                tag: self.$v.tag,
                name: self.name,
                desc: self.desc,
                specs: self.specs.v.output,
                groups: self.groups.v.output,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt,
                variables: self.variables.v.output,
                customBtns: self.customBtns.v.output,
                dependencies: self.dependencies.v.output,
                browserOption: self.browserOption.$v.output
            }
        },
        projectPath(self) {
            return `${config.projectDir}/${self.name}.json`
        }
    },
    methods: {
        async zip(self) {
            let { e2eOptions, packageOptions, specsItems, readmeFiles } = self.$m.getOutputFiles()
            let zip = new JSzip()
            let data = zip.folder("data")
            let docs = zip.folder("docs")
            zip.file('project.json', JSON.stringify(self.$v.output, null, 4))
            zip.file('package.json', packageOptions)
            zip.file('readme.md', self.desc || '無內容')
            data.file('config.js', e2eOptions)
            for (let item of specsItems) {
                data.file(item.name, await beautify(item.content, 4))
            }
            for (let item of readmeFiles) {
                docs.file(item.name, item.content)
            }
            let content = await zip.generateAsync({ type: 'blob' })
            return content
        },
        getOutputFiles(self, specs?) {
            let params = {}
            for (let variables of self.variables.items) {
                params[variables.key] = variables.value
            }
            let e2eOptions = {
                framework: 'jasmine',
                directConnect: true,
                ignoreUncaughtExceptions: true,
                params,
                capabilities: {
                    browserName: self.browserOption.target,
                    marionette: true,
                    acceptInsecureCerts: true,
                    chromeOptions: {
                        args: [
                            '-ignore-certificate-errors',
                            self.browserOption.openConsole ? '--auto-open-devtools-for-tabs' : null,
                            `--window-size=${self.browserOption.width},${self.browserOption.height}`,
                            `--window-position=${self.browserOption.posX},${self.browserOption.posY}`
                        ].filter(e => !!e)
                    }
                },
                jasmineNodeOpts: {
                    defaultTimeoutInterval: 10000000
                },
                specs: self.specs.items.filter(s => specs ? specs.includes(s.id) : true).map(s => s.name + '.js')
            }
            let readmeFiles = []
            let devDependencies = {
                axios: '0.20.0'
            }
            let packageOptions = {
                scripts: {
                    test: `protractor "./config.js"`
                },
                devDependencies
            }
            for (let item of self.dependencies.items) {
                devDependencies[item.name] = item.version
            }
            let specsItems = []
            self.specs.forEach(model => {
                if ((specs && !specs.includes(model.id)) !== true) {
                    specsItems.push({
                        name: `${model.name}.js`,
                        content: model.$v.write
                    })
                    if (model.desc) {
                        readmeFiles.push({
                            name: `${model.name}.md`,
                            content: model.desc
                        })
                    }
                }
            })
            return {
                e2eOptions: `exports.config = ${JSON.stringify(e2eOptions, null, 4)}`,
                specsItems,
                readmeFiles,
                packageOptions: JSON.stringify(packageOptions, null, 4)
            }
        },
        validate(self) {
            let output = []
            let templates = []
            self.specs.forEach(sprite => {
                templates = templates.concat(sprite.$v.templates)
            })
            for (let template of templates) {
                let result = core.templates[template.name].validate(template.props)
                if (result !== true) {
                    output.push({
                        result,
                        template
                    })
                }
            }
            return output
        }
    },
    loaders: {
        async fetch(self, done, fail, { name }) {
            let data = await read(`${config.projectDir}/${name}.json`)
            self.$init(JSON.parse(data))
            done()
        },
        async save(self, done, fail) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            await write(self.$v.projectPath, JSON.stringify(self.$v.output, null, 4))
            done()
        },
        async write(self, done, fail, { specs }) {
            let promises = []
            let releaseDir = config.releaseDir
            let { e2eOptions, packageOptions, specsItems } = self.$m.getOutputFiles(specs)
            await rmdir(releaseDir)
            await mkdir(releaseDir)
            for (let item of specsItems) {
                promises.push(write(`${releaseDir}/${item.name}`, item.content, true))
            }
            await write(`${releaseDir}/config.js`, e2eOptions)
            await write(`${releaseDir}/package.json`, packageOptions)
            await Promise.all(promises)
            done()
        }
    }
}
