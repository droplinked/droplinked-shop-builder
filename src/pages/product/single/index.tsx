import { VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { initialStatesProduct, productContext } from './context'
import ButtonsProduct from './parts/buttons/ButtonsProduct'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { productByIdServices } from 'lib/apis/product/productServices'
import ProductSingleModel from './model/model'
import General from './parts/general/General'
import Variant from './parts/variant/Variant'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import ProductCollapse from './parts/modules/collapse/ProductCollapse'
import { IproductByIdServices } from 'lib/apis/product/interfaces'
import ShippingProduct from './parts/modules/shipping/ShippingProduct'
import ProductPodDesign from './parts/podDesign/ProductPodDesign'
import CollectionProduct from './parts/collection/CollectionProduct'

function ProductSingle() {
    const { mutate, isLoading } = useMutation((params: IproductByIdServices) => productByIdServices(params))
    const params = useParams()
    const [State, setState] = useState(initialStatesProduct)
    const { shop } = useProfile()
    const { refactorData } = ProductSingleModel
    const productId = params?.productId

    const updateState = useCallback((element: any, value: any) => {
        if ([typeof element, typeof value].includes("undefined")) return false
        setState(prev => ({ ...prev, [element]: value }))
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
        if (params?.productId) fetch().then((res: any) => setState(res))
    }, [params])

    useEffect(() => {
        console.log(State);
    }, [State])

    return (
        <productContext.Provider value={{
            state: State,
            methods: { updateState, fetch },
            productID: productId,
            loading: productId ? !isLoading : true,
        }}>
            <VStack spacing={5}>
                <General />
                <ProductPodDesign />
                <ShippingProduct />
                <CollectionProduct />
                <Variant />
                <ButtonsProduct />
            </VStack>
        </productContext.Provider>
    )
}

export default ProductSingle