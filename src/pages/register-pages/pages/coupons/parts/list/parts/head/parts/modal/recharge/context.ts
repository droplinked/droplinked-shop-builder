import { createContext } from "react";

interface IPrpos {
    clientSecret: string
    close: any
    updateState(key: string, value: any): void
}
const rechargeContext = createContext<IPrpos>({
    clientSecret: null,
    close: null,
    updateState: () => { }
})

export default rechargeContext