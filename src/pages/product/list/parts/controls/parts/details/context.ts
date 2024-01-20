import { createContext } from "react";

interface Iprops {
    product: any
    fetch: any
}
const detailsProductContext = createContext<Iprops>({
    product: [],
    fetch: () => { }
})

export default detailsProductContext