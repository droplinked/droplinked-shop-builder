import { IProductPosition } from "lib/apis/product/interfaces";
import { createContext } from "react";

interface Iprops {
    technique: string
    setStates(key: string, value: string): any
}

export const artwork2dStates = {
    technique: null,
}

const artwork2dContext = createContext<Iprops>({
    ...artwork2dStates,
    setStates: () => { }
})

export default artwork2dContext