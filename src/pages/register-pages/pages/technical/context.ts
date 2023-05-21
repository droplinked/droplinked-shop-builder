import { createContext } from "react"

export const technicalContextState = {
    imsType: '',
    payments: []
}

interface IStates {
    imsType:string
    payments: Array<any>
}

interface IProps {
    state: IStates
    userPayments: any
    updateState: Function
    updatePayment: Function
}

const technicalContext = createContext<IProps>({
    state: technicalContextState,
    userPayments: {},
    updateState: () => { },
    updatePayment: () => { }
})

export default technicalContext