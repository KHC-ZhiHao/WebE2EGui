import { IContainerOptions, IContainer, IContainerModel } from 'alas'
import * as Copy from './copy'
import * as Drag from './drag'
import * as Message from './message'
import * as Confirm from './confirm'

export interface Container extends IContainer {
    models: {
        copy: IContainerModel<Copy.Model, Copy.List>
        drag: IContainerModel<Drag.Model, Drag.List>
        message: IContainerModel<Message.Model, Message.List>
        confirm: IContainerModel<Confirm.Model>
    }
}

export const Container: IContainerOptions<Container> = {
    models: {
        drag: Drag.Options,
        copy: Copy.Options,
        confirm: Confirm.Options,
        message: Message.Options
    }
}
