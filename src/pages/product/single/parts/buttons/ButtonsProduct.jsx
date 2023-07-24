import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext, useState } from 'react'
import { productContext } from '../../context'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { productCreateServices, productUpdateServices } from 'lib/apis/product/productServices'
import AppErrors from 'lib/utils/statics/errors/errors'
import useAppToast from 'functions/hooks/toast/useToast'
import ButtonsProductClass from './model/ButtonProductModel'
import MakeDataProductModel from './model/modules/MakeDataProduct'

// prdocut page
function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const [TargetButton, setTargetButton] = useState('')
    const { state, productID } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData, makeskuUpdate } = ButtonsProductClass
    const { showToast } = useAppToast()

    const submit = useCallback(async (draft) => {
        try {
            const service = productID ? update.mutateAsync : create.mutateAsync
            await validate({ state, draft })
            setTargetButton(draft ? "draft" : "create")
            const formData = makeData({ state, draft, productID })
            await service(productID ? { productID, params: formData } : formData)

            showToast(draft ? AppErrors.product.your_product_draft : AppErrors.product.your_product_published, "success")
            shopNavigate("products")
        } catch (error) {
            showToast(error.errors ? error.errors[0] : error?.message ? error.message : "Oops! Something went wrong", "error")
        }
    }, [state, productID])

    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box>
                {!state.publish_product || !productID ? (
                    <BasicButton
                        isLoading={TargetButton === "draft" ? productID ? update.isLoading : create.isLoading : false}
                        variant={'outline'}
                        onClick={() => submit(true)}
                    >
                        Save as Draft
                    </BasicButton>
                ) : null}
            </Box>
            <Box>
                <BasicButton
                    isLoading={TargetButton === "create" ? productID ? update.isLoading : create.isLoading : false}
                    onClick={() => submit(false)}
                >
                    {productID && state.publish_product ? "Update Product" : "Publish Product"}
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct