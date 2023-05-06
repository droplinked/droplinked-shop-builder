import { createContext } from "react";

interface IState {
    loading: boolean
    hashkey: string | null
}

interface IrecordContext {
    state: IState
    updateState(key: string, value: any): void
}

export const recordStates: IState = {
    hashkey: null,
    loading: false
}

const recordContext = createContext<IrecordContext>({
    state: recordStates,
    updateState: () => { }
})

export default recordContext