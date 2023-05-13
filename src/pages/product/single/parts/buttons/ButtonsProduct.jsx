import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useCallback, useContext } from 'react'
import { productContext } from '../../context'
import ButtonsProductClass from './model'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate'
import { productCreateServices, productUpdateServices, skuUpdateByIdServices } from 'lib/apis/product/productServices'

function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const updateSku = useMutation((params) => skuUpdateByIdServices(params))
    const { state, productID } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate } = ButtonsProductClass

    const submit = useCallback(async () => {
        try {
            const query = productID ? update.mutateAsync : create.mutateAsync
            await validate(state)
            await query(productID ? { productID, params: state } : state)
            if (productID) await updateSkues(state.sku) // Update skues

            toast.success(`Product ${productID ? "update" : "created"} success`)
            shopNavigate("products")
        } catch (error) {
            toast.error(error.errors ? error.errors[0] : "Somthing wrong")
        }
    }, [state, productID])

    const updateSkues = useCallback((skues) => {
        return Promise.all(skues.filter(el => el._id).map(el => updateSku.mutateAsync({ skuID: el._id, params: el })))
    }, [])

    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box><BasicButton onClick={() => shopNavigate("products")} variant='outline'>Cancel</BasicButton></Box>
            <Box>
                <BasicButton
                    isLoading={productID ? update.isLoading || updateSku.isLoading : create.isLoading}
                    onClick={submit}
                >
                    {productID ? "Update" : "Save"}
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct