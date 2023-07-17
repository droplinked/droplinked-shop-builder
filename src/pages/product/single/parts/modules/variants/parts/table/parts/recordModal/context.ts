import { blockchainTypes } from "components/common/hashKey/HashKey";
import { createContext } from "react";

interface IState {
    loading: boolean
    hashkey: string | null
    blockchain: blockchainTypes
}

interface IrecordContext {
    state: IState
    updateState(key: string, value: any): void
}

export const recordStates: IState = {
    hashkey: null,
    loading: false,
    blockchain: null
}

const recordContext = createContext<IrecordContext>({
    state: recordStates,
    updateState: () => { }
})

export default recordContext