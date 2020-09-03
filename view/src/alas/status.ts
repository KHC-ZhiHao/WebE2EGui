import Alas from 'alas'
import alas from './index'

let status = new Alas.Status({
    states: {
        copy: () => alas.make('actions', 'copy').$init(),
        drag: () => alas.make('actions', 'drag').$init(),
        message: () => alas.make('actions', 'message').$init(),
        confirm: () => alas.make('actions', 'confirm').$init(),
        project: () => alas.make('project', 'project')
    }
})

export default status
