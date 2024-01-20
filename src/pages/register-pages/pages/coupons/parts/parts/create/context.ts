import { createContext } from "react";

export const CouponsCreateStates = {
    type: ""
}

interface IProps {
    type: string
    updateState: Function
    closeModal: Function
}

const CouponsCreateContext = createContext<IProps>({
    ...CouponsCreateStates,
    updateState: () => { },
    closeModal: () => { }
})

export default CouponsCreateContext