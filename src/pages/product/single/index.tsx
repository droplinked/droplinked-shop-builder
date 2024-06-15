import { VStack } from '@chakra-ui/react'
import useShopSubscriptionData from 'functions/hooks/shop-subscription-data/useShopSubscriptionData'
import { IproductService } from 'lib/apis/shop/interfaces'
import { productService } from 'lib/apis/shop/shopServices'
import { nanoid } from 'nanoid'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { productContext } from './context'
import NormalProduct from './layouts/NormalProduct'
import PODProduct from './layouts/PODProduct'
import ProductSingleModel from './model/model'
import ProductLoading from './parts/loading/ProductLoading'
import ProductStore from './parts/store/ProductStore'
import productPageNamespace from './reducers'

function ProductSingle() {
    const { mutate, isLoading } = useMutation((params: IproductService) => productService(params))
    const { isFetching } = useShopSubscriptionData()
    const { reducers, initialState } = productPageNamespace
    const params = useParams()
    const [state, dispatch] = useReducer(reducers, initialState)
    const { refactorData, productTypeHandle } = ProductSingleModel
    const productId = params?.productId
    const queryParams = useParams()

    // Fetch product for edit
    const fetch = useCallback(() => {
        return new Promise((resolve, reject) => {
            mutate(
                {
                    productID: params?.productId,
                },
                {
                    onSuccess: (res) => res.data.statusCode === 200 && res.data?.data ? resolve(refactorData(res.data.data)) : reject("Cant find this product"),
                    onError: (err) => { reject(err) }
                }
            )
        })
    }, [params])

    // Set data product when edit mode
    useEffect(() => {
        if (params?.productId) fetch().then((res: any) => {
            dispatch({ type: "updateStateParams", params: { result: res } })
            dispatch({ type: "updateStore", params: { storeName: "prev_data", value: res } })
        })
    }, [params])

    // Set product type as url
    useEffect(() => {
        if (queryParams.type) dispatch({ type: "updateState", params: { element: "product_type", value: productTypeHandle(queryParams.type) } });
    }, [queryParams])

    // Set default printfull when PRINT_ON_DEMAND product type
    useEffect(() => {
        if (!productId && state.params.product_type === "PRINT_ON_DEMAND") {
            dispatch({ type: "updateState", params: { element: "prodviderID", value: "PRINTFUL" } })
            dispatch({ type: "updateState", params: { element: "custome_external_id", value: Date.now() + nanoid(13) } })
        }
    }, [productId, state.params.product_type])

    return (
        <productContext.Provider value={{
            state: state.params,
            store: {
                state: state.store,
                methods: { update: (storeName, value) => dispatch({ type: "updateStore", params: { storeName, value } }) }
            },
            methods: {
                updateState: (element, value) => dispatch({
                    type: "updateState",
                    params: { element, value }
                }),
                fetch,
                setSync: (value) => dispatch({ type: "updateSync", params: { value } }),
                dispatch
            },
            productID: productId,
            loading: productId ? !isLoading : true,
            sync: state.sync,
        }}>
            <ProductStore>
                <ProductLoading />
                <VStack spacing={5}>
                    {state.params.product_type === "PRINT_ON_DEMAND" ? <PODProduct /> : <NormalProduct />}
                </VStack>
            </ProductStore>
        </productContext.Provider>
    )
}

export default ProductSingle