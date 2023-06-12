import { Box, Flex, HStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext } from 'react'
import { productContext } from '../../context'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { productCreateServices, productUpdateServices, skuUpdateByIdServices } from 'lib/apis/product/productServices'
import AppErrors from 'lib/utils/statics/errors/errors'
import useAppToast from 'functions/hooks/toast/useToast'
import ButtonsProductClass from './model/ButtonProductModel'
import MakeDataProductModel from './model/modules/MakeDataProduct'

// prdocut page
function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const updateSku = useMutation((params) => skuUpdateByIdServices(params))
    const { state, productID } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData, makeskuUpdate } = ButtonsProductClass
    const { showToast } = useAppToast()

    const submit = useCallback(async (draft) => {
        try {
            const service = productID ? update.mutateAsync : create.mutateAsync
            await validate({ state, draft })
            const formData = makeData({ state, draft, productID })
            const query = await service(productID ? { productID, params: formData } : formData)
            if (productID) await updateSkues(MakeDataProductModel.refactorSku({ skues: state.sku })) // Update skues

            showToast(draft ? AppErrors.product.your_product_draft : AppErrors.product.your_product_published, "success")
            shopNavigate(draft ? `products/${query.data?.data._id}` : "products")
        } catch (error) {
            showToast(error.errors ? error.errors[0] : error?.message ? error.message : "Oops! Something went wrong", "error")
        }
    }, [state, productID])

    const updateSkues = useCallback((skues) => {
        return Promise.all(skues.filter(el => el._id).map(el => updateSku.mutateAsync({ skuID: el._id, params: makeskuUpdate({ sku: el }) })))
    }, [])

    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box>
                {!state.publish_product && (
                    <BasicButton
                        isLoading={productID ? update.isLoading || updateSku.isLoading : create.isLoading}
                        variant={'outline'}
                        onClick={() => submit(true)}
                    >
                        Save as Draft
                    </BasicButton>
                )}
            </Box>
            <Box>
                <BasicButton
                    isLoading={productID ? update.isLoading || updateSku.isLoading : create.isLoading}
                    onClick={() => submit(false)}
                >
                    Publish Product
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct