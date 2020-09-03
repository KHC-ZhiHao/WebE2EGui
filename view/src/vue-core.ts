import { SetupContext, onUnmounted } from "@vue/composition-api"

export type RefComponent<E extends Vue = Vue> = {
    value: E
}

export type RefComponentArray<E extends Vue = Vue> = {
    value: E[]
}

export type RefElement<E extends Element> = {
    value: E
}

export type RefElementArray<E extends Element> = {
    value: E[]
}

export class Self {
    private timers: { [key: string]: any } = {}
    private context: SetupContext
    constructor(context: SetupContext) {
        this.context = context
        onUnmounted(() => {
            for (let name in this.timers) {
                this.timerClear(name)
            }
        })
    }

    get route() {
        return this.context.root.$route
    }

    get router() {
        return this.context.root.$router
    }

    t(m: string) {
        return this.context.root.$i18n.t(m)
    }

    emit(channel: string, ...params: any) {
        return this.context.emit(channel, ...params)
    }

    forceUpdate() {
        return this.context.parent.$children.forEach(e => e.$forceUpdate())
    }

    nextTick(callback: () => any) {
        this.context.root.$nextTick(callback)
    }

    timer(name: string, timeout: number, callback: () => any) {
        if (this.timers[name]) {
            throw new Error('Timer already exists.')
        }
        this.timers[name] = setInterval(callback, timeout)
    }

    timerClear(name: string) {
        if (this.timers[name]) {
            clearInterval(this.timers[name])
            delete this.timers[name]
        }
    }
}
