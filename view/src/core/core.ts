class Core {
    templates: { [key: string]: any } = {}
    types = ['action', 'system', 'verify', 'engineer', 'custom']
    propTypes = ['text', 'radio-group', 'javascript']

    reloadCustom(project) {
        this.clearCustom()
        for (let item of project.customBtns.items) {
            this.addTemplateCustom(item.name, item.script)
        }
    }

    addTemplateCustom(name, string) {
        let template = null
        eval('template =' + string)
        template.name = 'custom-' + name
        template.type = 'custom'
        this.addTemplate(template, true)
    }

    addTemplate(data, custom = false) {
        try {
            let result = this.verifyTemplate(data)
            result.custom = custom
            this.templates[result.name] = result
        } catch (error) {
            console.error(error)
        }
    }

    verifyTemplate(data) {
        try {
            let result = this.verify(data, {
                name: [true, ['string']],
                type: [true, ['string']],
                help: [false, ['string'], null],
                info: [true, ['string']],
                props: [true, ['object']],
                color: [true, ['string']],
                write: [true, ['function']],
                btnText: [true, ['string']],
                display: [true, ['function']],
                validate: [false, ['function'], () => true]
            })
            if (this.types.includes(result.type) === false) {
                throw(`Type(${result.type}) not found`)
            }
            for (let prop in result.props) {
                result.props[prop] = this.verify(result.props[prop], {
                    type: [true, ['string']],
                    info: [true, ['string']],
                    show: [false, ['function'], () => true],
                    default: [false, ['string'], null],
                    options: [false, ['array'], []]
                })
                if (this.propTypes.includes(result.props[prop].type) === false) {
                    throw(`Prop type(${result.props[prop].type}) not found`)
                }    
            }
            return result
        } catch (error) {
            throw error
        }
    }

    clearCustom() {
        for (let key in this.templates) {
            if (this.templates[key].custom) {
                delete this.templates[key]
            }
        }
    }

    verify(data, validates): any {
        let newData = {}
        for (let key in validates) {
            let target = data[key]
            let type = Array.isArray(target) ? 'array' : typeof target
            let validate = validates[key]
            let [required, types, defaultValue] = validate
            if (typeof required !== 'boolean') {
                throw new Error('Required must be a boolean')
            }
            if (Array.isArray(types) !== true) {
                throw new Error('Types must be a array')
            }
            if (required && target == null) {
                throw new Error(`Key(${key}) is required`)
            }
            if (types && target != null && !types.includes(type)) {
                throw new Error(`Type(${key}::${type}) error, need ${types.join(' or ')}`)
            }
            newData[key] = target === undefined ? defaultValue : target
        }
        return newData
    }
}

export default Core
