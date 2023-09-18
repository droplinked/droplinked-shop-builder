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
import { generateThumbService } from 'lib/apis/pod/services'
import introductionClass from '../general/model'

// prdocut page
function ButtonsProduct() {
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const generateThumb = useMutation((params) => generateThumbService(params))
    const [States, setStates] = useState({
        loading: false,
        draft: false
    })
    const { state, productID, store: { state: { prev_data } } } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData } = ButtonsProductClass
    const { showToast } = useAppToast()
    const { refactorImage } = introductionClass

    const setStateHandle = useCallback((key, value) => setStates(prev => ({ ...prev, [key]: value })), [])

    // Submit product
    const submit = useCallback(async (draft) => {
        try {
            // Check change data
            if (JSON.stringify(prev_data) === JSON.stringify(state)) return shopNavigate("products")

            setStateHandle("draft", draft)
            setStateHandle("loading", true)

            // Handle service mode update or create
            const service = productID ? update.mutateAsync : create.mutateAsync

            // Validate product data
            await validate({ state, draft })

            // Make and handle data for draft mode 
            const formData = makeData({ state, draft, productID })

            // Request service
            await service(productID ? { productID, params: formData } : formData)

            showToast(draft ? AppErrors.product.your_product_draft : AppErrors.product.your_product_published, "success")
            shopNavigate("products")
            setStateHandle("loading", false)
        } catch (error) {
            setStateHandle("loading", false)
            showToast(error?.response?.data?.data?.message ? error?.response?.data?.data?.message : error?.message ? error.message : "Oops! Something went wrong", "error")
        }
    }, [state, productID])

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
                    {productID && state.publish_product ? "Update Product" : "Publish Product"}
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct