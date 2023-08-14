import { IproductState } from "lib/apis/product/interfaces";

namespace ProductPageNamespace {
    export interface IStore {
        variants: any
        available_variant: Array<any>
    }

    export interface IStates {
        params: IproductState
        store: IStore
    }

    type actions =
        {
            type: "updateStateParams",
            params: { result: any }
        } |
        {
            type: "updateState",
            params: { element: any, value: any }
        } |
        {
            type: "updateStore",
            params: { storeName: string, value: any }
        }

    export const initialState: IStates = {
        params: {
            title: '',
            description: '',
            productCollectionID: '',
            media: [],
            priceUnit: "USD",
            shippingPrice: 0,
            product_type: "NORMAL",
            publish_product: true,
            shippingType: "EASY_POST",
            properties: [],
            sku: [],
            prodviderID: "DLW",
            pod_blank_product_id: null,
            artwork: null,
            artwork2: null,
            m2m_positions: [],
            artwork_position: null,
            artwork2_position: null,
            thumb: "",
            m2m_services: [],
            purchaseAvailable: true
        },
        store: {
            variants: [],
            available_variant: []
        }
    };

    export const reducers = (state: IStates, action: actions): IStates => {
        switch (action.type) {
            case 'updateStateParams':
                return {
                    ...state,
                    params: action.params.result
                }
            case 'updateState':
                if ([typeof action.params.element, typeof action.params.value].includes("undefined")) return state
                return {
                    ...state,
                    params: {
                        ...state.params,
                        [action.params.element]: action.params.value
                    }
                }
            case 'updateStore':
                if ([typeof action.params.storeName, typeof action.params.value].includes("undefined")) return state
                return {
                    ...state,
                    store: {
                        ...state.store,
                        [action.params.storeName]: action.params.value
                    }
                }
            default:
                break;
        }
    }
}

export default ProductPageNamespace