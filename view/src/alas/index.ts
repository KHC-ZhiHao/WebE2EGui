import AlasCore from 'alas'
import MsPackage from 'alas/packages/ms'

type Containers = {
    
}

export const alas: AlasCore<Containers> = new AlasCore()

alas.setLocale('zh-tw')
alas.addPackage(MsPackage)

export default alas
