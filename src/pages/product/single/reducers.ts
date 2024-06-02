import { IDigitalLinks, IproductState } from "lib/apis/product/interfaces";

export type productActions =
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
    } |
    {
        type: "updateSync",
        params: { value: boolean }
    } |
    {
        type: "updateDigitalLinks",
        params: IDigitalLinks
    }

export const productParams: IproductState = {
    title: '',
    ownerID: null,
    description: ' ',
    productCollectionID: '',
    media: [],
    priceUnit: "USD",
    shippingPrice: 0,
    product_type: "NORMAL",
    publish_product: true,
    shippingType: "EASY_POST",
    properties: [],
    sku: [],
    prodviderID: null,
    pod_blank_product_id: null,
    artwork: null,
    artwork2: null,
    m2m_positions: [],
    artwork_position: null,
    artwork2_position: null,
    thumb: "",
    m2m_services: [],
    purchaseAvailable: true,
    positions: null,
    printful_template_id: null,
    custome_external_id: null,
    m2m_positions_options: [],
    digitalDetail: undefined,
    mainCategory: null,
    subCategories: [],
    technique: null,
    isAddToCartDisabled: false,
    pre_purchase_data_fetch: false,
    productTile: [],
    printful_option_data: null
}

namespace ProductPageNamespace {
    export interface IStore {
        variants: any
        available_variant: Array<any>
        print_positions: Array<any>
        product_types: Array<any>
        prev_data: IproductState
        product_printful: any
    }

    export interface IStates {
        params: IproductState
        store: IStore
        loading: boolean
        sync: boolean
    }

    export const initialState: IStates = {
        params: productParams,
        store: {
            variants: [],
            available_variant: [],
            print_positions: [],
            prev_data: productParams,
            product_types: [],
            product_printful: null
        },
        loading: false,
        sync: false
    };

    export const reducers = (state: IStates, action: productActions): IStates => {
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
            case 'updateDigitalLinks':
                if (!action.params) return state
                return {
                    ...state,
                    params: {
                        ...state.params,
                        digitalDetail: { ...state.params?.digitalDetail, ...action.params }
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
            case 'updateSync':
                return {
                    ...state,
                    sync: action.params.value
                }
            default:
                break;
        }
    }
}

export default ProductPageNamespace