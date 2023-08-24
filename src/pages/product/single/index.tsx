import { VStack } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import { productContext } from './context'
import ButtonsProduct from './parts/buttons/ButtonsProduct'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { productByIdServices } from 'lib/apis/product/productServices'
import ProductSingleModel from './model/model'
import General from './parts/general/General'
import Variant from './parts/variant/Variant'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { IproductByIdServices } from 'lib/apis/product/interfaces'
import ShippingProduct from './parts/modules/shipping/ShippingProduct'
import ProductPodDesign from './parts/podDesign/ProductPodDesign'
import CollectionProduct from './parts/collection/CollectionProduct'
import ProductStore from './parts/store/ProductStore'
import DigitalLinks from './parts/digital/DigitalLinks'
import productPageNamespace from './reducers'
import ProductLoading from './parts/loading/ProductLoading'
import ProductModel from './model'

function ProductSingle() {
    const { mutate, isLoading } = useMutation((params: IproductByIdServices) => productByIdServices(params))
    const { reducers, initialState } = productPageNamespace
    const params = useParams()
    const [state, dispatch] = useReducer(reducers, initialState)
    const { shop } = useProfile()
    const { refactorData, productTypeHandle } = ProductSingleModel
    const productId = params?.productId
    const queryParams = useParams()

    // Fetch product for edit
    const fetch = useCallback(() => {
        return new Promise((resolve, reject) => {
            mutate(
                {
                    productID: params?.productId,
                    shopname: shop.name
                },
                {
                    onSuccess: (res) => res.data.statusCode === 200 && res.data?.data ? resolve(refactorData(res.data.data)) : reject("Cant find this product"),
                    onError: (err) => { reject(err) }
                }
            )
        })
    }, [params])

    useEffect(() => {
        if (params?.productId) fetch().then((res: any) => dispatch({ type: "updateStateParams", params: { result: res } }))
    }, [params])

    useEffect(() => {
        if (queryParams.type) dispatch({ type: "updateState", params: { element: "product_type", value: productTypeHandle(queryParams.type) } });
    }, [queryParams])

    // Set default printfull when PRINT_ON_DEMAND product type
    useEffect(() => {
        if (!productId && state.params.product_type === "PRINT_ON_DEMAND") dispatch({ type: "updateState", params: { element: "prodviderID", value: "PRINTFUL" } })
    }, [productId, state.params.product_type])

    // useEffect(() => {
    //     console.log(state.params.media);
    // }, [state])

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
                    <General />
                    <DigitalLinks />
                    <ShippingProduct />
                    {!ProductModel.isPrintful(state.params.prodviderID) && <Variant />}
                    <ProductPodDesign />
                    {ProductModel.isPrintful(state.params.prodviderID) && <Variant />}
                    <CollectionProduct />
                    <ButtonsProduct />
                </VStack>
            </ProductStore>
        </productContext.Provider>
    )
}

export default ProductSingle