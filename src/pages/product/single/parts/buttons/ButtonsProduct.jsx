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
import RecordModalModule from '../modules/variants/parts/table/parts/recordModal/parts/form/model/recordFormModel'
import useStack from 'functions/hooks/stack/useStack'

// prdocut page
function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const [States, setStates] = useState({
        loading: false,
        draft: false
    })
    const { switchRecord } = RecordModalModule
    const { state, productID, store: { state: { prev_data } } } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData } = ButtonsProductClass
    const { showToast } = useAppToast()
    const stacks = useStack()

    const setStateHandle = useCallback((key, value) => setStates(prev => ({ ...prev, [key]: value })), [])

    // Submit product
    const submit = useCallback(async (draft) => {
        try {
            // Check change data
            if (JSON.stringify(prev_data) === JSON.stringify(state) && (state.sku[0]?.recordData?.status !== "NOT_RECORDED" && state.product_type !== "DIGITAL")) return shopNavigate("products")

            setStateHandle("draft", draft)
            setStateHandle("loading", true)

            // Handle service mode update or create
            const service = productID ? update.mutateAsync : create.mutateAsync

            // Validate product data
            await validate({ state, draft })

            // Make and handle data for draft mode 
            const formData = makeData({ state, draft, productID })

            // Request service
            const data = await service(productID ? { productID, params: formData } : formData)

            if (!draft && state.product_type === "DIGITAL") {
                try {
                    const product = data?.data?.data
                    const deployhash = await switchRecord({
                        data: {
                            blockchain: state.digitalDetail.chain,
                            commission: state.sku[0].commision,
                            quantity: state.sku[0].quantity
                        },
                        product,
                        sku: product?.skuIDs[0],
                        stacks
                    })
                    formData.sku[0].deploy_hash = deployhash
                    formData.publish_product = true
                    await update.mutateAsync({ productID: product._id, params: formData })
                } catch (error) {
                    shopNavigate("products")
                    showToast("Somthimg went wrong", "error")
                }
            }
            showToast(draft ? AppErrors.product.your_product_draft : AppErrors.product.your_product_published, "success")
            shopNavigate("products")
            setStateHandle("loading", false)
        } catch (error) {
            setStateHandle("loading", false)
            showToast(error?.response?.data?.data?.message ? error?.response?.data?.data?.message : error?.message ? error.message : "Oops! Something went wrong", "error")
        }
    }, [state, productID, stacks])

    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box>
                {!state.publish_product || !productID ? (
                    <BasicButton
                        isLoading={States.draft ? States.loading : false}
                        variant={'outline'}
                        onClick={() => submit(true)}
                    >
                        Save as Draft
                    </BasicButton>
                ) : null}
            </Box>
            <Box>
                <BasicButton
                    isLoading={!States.draft ? States.loading : false}
                    isDisabled={States.loading}
                    onClick={() => submit(false)}
                >
                    {productID && state.publish_product ? "Update Product" : state.product_type === "DIGITAL" ? "Publish And Drop" : "Publish Product"}
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct