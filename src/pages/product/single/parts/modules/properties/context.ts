import { createContext } from "react";
import { IaddPropertyItem } from "./parts/item/model";

interface IpropertiesFormContext {
    set(props: IaddPropertyItem): void
    remove: Function
}

const propertiesFormContext = createContext<IpropertiesFormContext>({
    set: () => { },
    remove: () => { }
})

export default propertiesFormContext