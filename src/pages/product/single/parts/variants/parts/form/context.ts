import { createContext } from "react";

interface IvariontFormContext {
    form: {
        errors: any
        setFieldValue: Function
        values: any
    },
    state: any
}

const variontFormContext = createContext<IvariontFormContext>({
    form: {
        errors: null,
        setFieldValue: () => { },
        values: null
    },
    state: null
})

export default variontFormContext