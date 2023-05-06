import { VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Introduction from './parts/introduction/Introduction'
import TechnicalProduct from './parts/technical/TechnicalProduct'
import { initialStatesProduct, productContext } from './context'
import Properties from './parts/properties/Properties'
import Variants from './parts/variants/Variants'
import ButtonsProduct from './parts/buttons/ButtonsProduct'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { productByIdServices } from 'lib/apis/product/productServices'
import ProductSingleModel from './model/model'

function ProductSingle() {
    const { mutate, isLoading } = useMutation((params) => productByIdServices(params))
    const params = useParams()
    const [State, setState] = useState(initialStatesProduct)
    const { refactorData } = ProductSingleModel
    const productId = params?.productId

    const updateState = useCallback((element, value) => {
        if ([typeof element, typeof value].includes("undefined")) return false
        setState(prev => ({ ...prev, [element]: value }))
    }, [])

    // Fetch product for edit
    const fetch = useCallback(() => {
        return new Promise((resolve, reject) => {
            mutate(
                {
                    productID: params?.productId
                },
                {
                    onSuccess: (res) => res.data.statusCode === 200 && res.data?.data ? resolve(refactorData(res.data.data)) : reject("Cant find this product"),
                    onError: (err) => { reject(err) }
                }
            )
        })
    }, [params])

    useEffect(async () => {
        if (params?.productId) setState(await fetch())
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
                <Introduction />
                <TechnicalProduct />
                <Properties />
                <Variants />
                <ButtonsProduct />
            </VStack>
        </productContext.Provider>
    )
}

export default ProductSingle