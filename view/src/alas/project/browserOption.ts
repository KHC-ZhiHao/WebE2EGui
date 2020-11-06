import { IModelOptions, IModel, IList } from 'alas'

export interface Model extends IModel {
    posX: number
    posY: number
    width: number
    height: number
    target: 'chrome' | 'firefox'
    updatedAt: number
    openConsole: boolean
}

export interface List extends IList<Model> {}

export const Options: IModelOptions<Model, List> = {
    body: {
        posX: ['#ms.number', '#ms.required'],
        posY: ['#ms.number', '#ms.required'],
        width: ['#ms.number', '#ms.required'],
        height: ['#ms.number', '#ms.required'],
        target: ['#ms.required'],
        updatedAt: [],
        openConsole: ['#ms.required']
    },
    defs: {
        posX: () => 0,
        posY: () => 0,
        width: () => 1440,
        height: () => 900,
        target: () => 'chrome',
        updatedAt: () => Date.now(),
        openConsole: () => true
    },
    views: {
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return self.$export()
        }
    }
}
