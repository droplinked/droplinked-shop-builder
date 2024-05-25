import { statusesModule } from "./modules/statues";

interface IcheckPermission {
    user: any
}

interface IregisterGate extends IcheckPermission {
    redirect(to: string): void
    pathname: string
    to: string
}

const DashboardGateModel = ({
    checkPermission: ({ user }: IcheckPermission) => {
        const statuses = new statusesModule(user)
        const urlRegistration = statuses.urlRegistration()
        return urlRegistration
    },

    registerGate: ({ to, redirect, pathname }: IregisterGate) => {
        if (pathname.includes("url-registration")) return false
        const checkPath = pathname.includes(to) // check current path
        if (!checkPath) redirect(to)
    }
})

export default DashboardGateModel 