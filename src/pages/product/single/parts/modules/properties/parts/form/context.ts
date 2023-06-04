import { createContext } from "react";

const propertiesFormState = []

interface IpropertiesFormContext {
    state: Array<any>,
    updateState(...params: any): void
    set: Function
    remove: Function
}

const propertiesFormContext = createContext<IpropertiesFormContext>({
    state: propertiesFormState,
    updateState: () => { }
    set: () => { }
    remove: () => { }
})

export default propertiesFormContext