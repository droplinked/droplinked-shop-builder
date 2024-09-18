import { createContext } from "react";

export interface IproductPageState {
    image: string | null;
    product: any;
    option: {
        color: string | null;
        size: string | null;
        custom_variants: {key: string, value: string}[]
        quantity: number;
    };
    sku: any;
    ruleset: {
        loading: boolean;
        data: any;
    };
}
export const productPageState: IproductPageState = {
    image: null,
    product: null,
    option: {
        color: null,
        size: null,
        custom_variants: [],
        quantity: 1,
    },
    sku: null,
    ruleset: {
        loading: false,
        data: false
    }
}

interface IProps {
    states: IproductPageState
    methods: {
        updateState: Function
    }
}

const productPageContext = createContext<IProps>({
    states: productPageState,
    methods: {
        updateState: () => { }
    }
})

export default productPageContext