export type Props = {
    [key: string]: {
        type: 'text' | 'radio-group' | 'javascript'
        info: string,
        default: string
    }
}

export type Template<D> = {
    name: string
    type: 'action' | 'system' | 'verify' | 'engineer' | 'custom'
    btnText: string
    info: string,
    help: string,
    color: string
    display: (data: D) => string
    validate: (data: D) => true | string
    write: (data: D) => string
}

export function defineTemplate<
    P extends Props,
    E = Template<{ [key in keyof P]: string }>
>({ props, template }: { props: P, template: E }) {
    return {
        ...template,
        props
    }
}
