import Alas from 'alas'
import alas from './index'

let status = new Alas.Status({
    states: {
        copy: () => alas.make('actions', 'copy'),
        drag: () => alas.make('actions', 'drag'),
        message: () => alas.make('actions', 'message'),
        project: () => alas.make('project', 'project')
    }
})

export default status
