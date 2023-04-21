import { createContext } from "react";

const propertiesFormState = []

interface IpropertiesFormContext {
    state: Array<any>,
    updateState(...params:any): void 
}

const propertiesFormContext = createContext<IpropertiesFormContext>({
    state: propertiesFormState,
    updateState: () => {}
})

export default propertiesFormContext