import { IProductPosition } from "lib/apis/product/interfaces";
import { createContext } from "react";

interface Iprops {
    color: string
    position: IProductPosition
    setStates: Function
}

export const artwork2dStates = {
    color: null,
    position: {
        area_height: 213,
        area_width: 160,
        height: 80,
        width: 0,
        left: 0,
        top: 0
    }
}

const artwork2dContext = createContext<Iprops>({
    ...artwork2dStates,
    setStates: () => { }
})

export default artwork2dContext