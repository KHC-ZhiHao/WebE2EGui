// import fs from 'fs'
// import fsx from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

import * as Spec from './spec'
import * as Group from './group'
import * as Variables from './variable'
import * as CustomBtns from './customBtn'
import * as Dependencies from './dependencie'

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
        lockDependencies: ['request-promise']
    }
    $m: {
        isLockDependencies: () => boolean
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
        filepath(self) {
            return `${projectDir}/${self.name}.json`
        },
        lockDependencies() {
            return ['request-promise']
        }
    },
    methods: {
        isLockDependencies(self, dependencie) {
            return self.$v.lockDependencies.includes(dependencie)
        },
        save(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            fs.writeFileSync(self.$v.filepath, JSON.stringify(self.$v.output, null, 4))
        },
        write(self, ids) {
            fsx.removeSync(outputDir)
            if (fs.existsSync(outputDir) === false) {
                fs.mkdirSync(outputDir)
            }
            fs.writeFileSync(`${outputDir}/config.js`, `exports.config = ${JSON.stringify({
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
                specs: self.specs.items.filter(s => ids ? ids.includes(s.id) : true).map(s => s.name + '.js')
            }, null, 4)}`)
            let devDependencies = {}
            for (let item of self.dependencies.items) {
                devDependencies[item.name] = item.version
            }
            fs.writeFileSync(`${outputDir}/package.json`, JSON.stringify({
                scripts: {
                    test: `protractor "./config.js"`
                },
                devDependencies
            }, null, 4))
            self.specs.forEach(model => {
                if (ids && !ids.includes(model.id)) {
                    return null
                }
                fs.writeFileSync(`${outputDir}/${model.name}.js`, model.$v.write)
            })
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
    }
}
