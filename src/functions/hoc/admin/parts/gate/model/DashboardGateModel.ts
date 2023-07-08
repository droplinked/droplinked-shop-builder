import { statuesModule } from "./modules/statues";

interface IcheckPermission {
    shop: Object
}

interface IregisterGate extends IcheckPermission {
    redirect(to: string): void
    pathname: string
    to: string
}

export default class DashboardGateModel {
    static checkPermission = ({ shop }: IcheckPermission) => {
        const statues = new statuesModule(shop)
        const shopInfo = statues.shopInfo()
        const designTemplate = statues.designTemplate()
        const technical = statues.technical()
        return shopInfo || designTemplate || technical
    }

    static registerGate = ({ to, redirect, pathname }: IregisterGate) => {
        if (pathname.includes("register")) return false
        const checkPath = pathname.includes(to) // check current path
        if (!checkPath) redirect(to)
    }
}