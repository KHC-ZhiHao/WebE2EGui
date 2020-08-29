import { IContainerOptions, IContainer, IContainerModel } from 'alas'
import * as Copy from './copy'
import * as Drag from './drag'
import * as Message from './message'

export interface Container extends IContainer {
    models: {
        copy: IContainerModel<Copy.Model, Copy.List>
        drag: IContainerModel<Drag.Model, Drag.List>
        message: IContainerModel<Message.Model, Message.List>
    }
}

export const Container: IContainerOptions<Container> = {
    models: {
        drag: Drag.Options,
        copy: Copy.Options,
        message: Message.Options
    }
}
