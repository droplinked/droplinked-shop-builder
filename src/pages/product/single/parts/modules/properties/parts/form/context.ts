import { createContext } from "react";
import { IaddPropertyItem } from "./parts/form/parts/item/model/model";

const propertiesFormState = []

interface IpropertiesFormContext {
    state: Array<any>,
    updateState(...params: any): void
    set(props: IaddPropertyItem): void
    remove: Function
    checkItem: Function
}

const propertiesFormContext = createContext<IpropertiesFormContext>({
    state: propertiesFormState,
    updateState: () => { },
    set: () => { },
    checkItem: () => { },
    remove: () => { }
})

export default propertiesFormContext