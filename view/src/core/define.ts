export type Props = {
    [key: string]: {
        type: 'text' | 'radio-group' | 'javascript'
        info: string
        show?: (data: { [name in typeof key]: string }) => boolean
        default: string
        options?: Array<{
            text: string
            value: string
        }>
    }
}

export type Template<D> = {
    name: string
    type: 'action' | 'system' | 'verify' | 'engineer' | 'custom'
    btnText: string
    info: string
    help: string
    color: string
    display: (data: D) => string
    validate: (data: D) => true | string
    write: (data: D) => string
}

export type Params<P, T> = {
    props: P
    template: T
}

export function defineTemplate<
    P extends Props,
    T = Template<{ [key in keyof P]: string }>
>({ props, template }: Params<P, T>) {
    return {
        ...template,
        props
    }
}
