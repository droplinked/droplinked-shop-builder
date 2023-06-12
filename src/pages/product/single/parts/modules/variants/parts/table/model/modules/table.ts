import { IproductState } from "lib/apis/product/interfaces";

interface Ivariants {
    variants: any
    states: IproductState
}
export default class ProductSkuesTable {
    static variants = ({ variants, states }: Ivariants) => {
        return variants?.single_print_price
    }
}