import { statuesModule } from "./modules/statues";

interface IcheckPermission {
    shop: Object
}

interface IregisterGate extends IcheckPermission {
    redirect(to: string): void
    pathname: string
    to: string
}

const DashboardGateModel = ({
    checkPermission: ({ shop }: IcheckPermission) => {
        const statues = new statuesModule(shop)
        const shopInfo = statues.shopInfo()
        const designTemplate = statues.designTemplate()
        const technical = statues.technical()
        return shopInfo || designTemplate || technical
    },

    registerGate: ({ to, redirect, pathname }: IregisterGate) => {
        if (pathname.includes("register")) return false
        const checkPath = pathname.includes(to) // check current path
        if (!checkPath) redirect(to)
    }
})

export default DashboardGateModel 