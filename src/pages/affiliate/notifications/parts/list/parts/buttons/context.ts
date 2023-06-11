import { createContext } from "react";

interface IProps {
    shop: any
    modal: {
        open: Function
    }
    methods: {
        setStates: any
    }
}

export const requestsButtonsContext = createContext<IProps>({
    shop: {},
    modal: {
        open: () => { }
    },
    methods: {
        setStates: () => { }
    }
})