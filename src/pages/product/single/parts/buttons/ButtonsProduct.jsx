import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext } from 'react'
import { productContext } from '../../context'
import ButtonsProductClass from './model'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { productCreateServices, productUpdateServices, skuUpdateByIdServices } from 'lib/apis/product/productServices'
import AppErrors from 'lib/utils/statics/errors/errors'
import useAppToast from 'functions/hooks/toast/useToast'

function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const updateSku = useMutation((params) => skuUpdateByIdServices(params))
    const { state, productID } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeDataUpdate, makeskuUpdate } = ButtonsProductClass
    const { showToast } = useAppToast()

    const submit = useCallback(async () => {
        try {
            const query = productID ? update.mutateAsync : create.mutateAsync
            await validate(state)
            await query(productID ? { productID, params: makeDataUpdate({ state }) } : state)
            if (productID) await updateSkues(state.sku) // Update skues

            showToast(AppErrors.product.your_product_published, "success")
            shopNavigate("products")
        } catch (error) {
            showToast(error.errors ? error.errors[0] : "Oops! Something went wrong", "error")
        }
    }, [state, productID])

    const updateSkues = useCallback((skues) => {
        return Promise.all(skues.filter(el => el._id).map(el => updateSku.mutateAsync({ skuID: el._id, params: makeskuUpdate({ sku: el }) })))
    }, [])

    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box><BasicButton onClick={() => shopNavigate("products")} variant='outline'>Cancel</BasicButton></Box>
            <Box>
                <BasicButton
                    isLoading={productID ? update.isLoading || updateSku.isLoading : create.isLoading}
                    onClick={submit}
                >
                    Publish
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct