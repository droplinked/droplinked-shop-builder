import { VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { initialStatesProduct, IproductStore, productContext } from './context'
import ButtonsProduct from './parts/buttons/ButtonsProduct'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { productByIdServices } from 'lib/apis/product/productServices'
import ProductSingleModel from './model/model'
import General from './parts/general/General'
import Variant from './parts/variant/Variant'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { IproductByIdServices, IproductState } from 'lib/apis/product/interfaces'
import ShippingProduct from './parts/modules/shipping/ShippingProduct'
import ProductPodDesign from './parts/podDesign/ProductPodDesign'
import CollectionProduct from './parts/collection/CollectionProduct'
import ProductStore from './parts/store/ProductStore'

interface Istate {
    params: IproductState
    store: IproductStore
}

function ProductSingle() {
    const { mutate, isLoading } = useMutation((params: IproductByIdServices) => productByIdServices(params))
    const params = useParams()
    const [State, setState] = useState<Istate>({
        params: initialStatesProduct,
        store: {
            variants: []
        }
    })
    const { shop } = useProfile()
    const { refactorData } = ProductSingleModel
    const productId = params?.productId

    const updateState = useCallback((element: any, value: any) => {
        if ([typeof element, typeof value].includes("undefined")) return false
        setState(prev => ({ ...prev, params: { ...prev.params, [element]: value } }))
    }, [])

    const updateStore = useCallback((storeName: any, value: any) => {
        if ([typeof storeName, typeof value].includes("undefined")) return false
        setState(prev => ({ ...prev, store: { ...prev.store, [storeName]: value } }))
    }, [])

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
        if (params?.productId) fetch().then((res: any) => setState(prev => ({ ...prev, params: res })))
    }, [params])

    // useEffect(() => {
    //     console.log(State.params.media);
    // }, [State])

    return (
        <productContext.Provider value={{
            state: State.params,
            store: {
                state: State.store,
                methods: { update: updateStore }
            },
            methods: { updateState, fetch },
            productID: productId,
            loading: productId ? !isLoading : true,
        }}>
            <ProductStore>
                <VStack spacing={5}>
                    <General />
                    <ProductPodDesign />
                    <ShippingProduct />
                    <Variant />
                    <CollectionProduct />
                    <ButtonsProduct />
                </VStack>
            </ProductStore>
        </productContext.Provider>
    )
}

export default ProductSingle