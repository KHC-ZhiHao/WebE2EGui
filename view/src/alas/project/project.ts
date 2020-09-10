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

const config = getConfig()

export type Output = {
    id: string
    tag: string
    name: string
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
    createdAt: number
    updatedAt: number
    specs: Spec.List
    groups: Group.List
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
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        createdAt: () => Date.now()
    },
    refs: {
        specs: '[spec]',
        groups: '[group]',
        variables: '[variable]',
        customBtns: '[customBtn]',
        dependencies: '[dependencie]'
    },
    init(self, source = {}) {
        return source
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
                specs: self.specs.v.output,
                groups: self.groups.v.output,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt,
                variables: self.variables.v.output,
                customBtns: self.customBtns.v.output,
                dependencies: self.dependencies.v.output
            }
        },
        projectPath(self) {
            return `${config.projectDir}/${self.name}.json`
        }
    },
    methods: {
        async zip(self) {
            let { e2eOptions, packageOptions, specsItems } = self.$m.getOutputFiles()
            let zip = new JSzip()
            let data = zip.folder("data")
            zip.file('project.json', JSON.stringify(self.$v.output, null, 4))
            zip.file('package.json', packageOptions)
            data.file('config.js', e2eOptions)
            for (let item of specsItems) {
                data.file(item.name, await beautify(item.content, 4))
            }
            let content = await zip.generateAsync({ type: 'blob' })
            return content
        },
        getOutputFiles(self, specs?) {
            let e2eOptions = {
                framework: 'jasmine',
                directConnect: true,
                capabilities: {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ['--window-size=1600,900', '--auto-open-devtools-for-tabs']
                    }
                },
                jasmineNodeOpts: {
                    defaultTimeoutInterval: 10000000
                },
                specs: self.specs.items.filter(s => specs ? specs.includes(s.id) : true).map(s => s.name + '.js')
            }
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
                }
            })
            return {
                e2eOptions: `exports.config = ${JSON.stringify(e2eOptions, null, 4)}`,
                specsItems,
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
