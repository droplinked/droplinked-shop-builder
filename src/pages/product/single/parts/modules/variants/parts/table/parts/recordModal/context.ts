import { createContext } from "react";

interface IState {
    loading: boolean
    hashkey: string | null
    blockchain: string
    image?: string
}

interface IrecordContext {
    state: IState
    product: any
    updateState(key: string, value: any): void
}

export const recordStates: IState = {
    hashkey: null,
    loading: false,
    blockchain: null
}

const recordContext = createContext<IrecordContext>({
    state: recordStates,
    product: [],
    updateState: () => { }
})

export default recordContext