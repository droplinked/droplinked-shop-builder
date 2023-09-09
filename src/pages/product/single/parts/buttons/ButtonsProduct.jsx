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

    const setThumb = useCallback(async () => {
        const checkChange = (field) => JSON.stringify(prev_data.media.map(el => el[field])) === JSON.stringify(state.media.map(el => el[field]))
        try {
            const isMain = state.media.find(el => el.isMain)?.url
            const isMainIndex = state.media.findIndex(el => el.isMain)
            if (!isMain) throw Error('')

            if (!checkChange('url') && state.product_type === "PRINT_ON_DEMAND") {
                const data = await generateThumb.mutateAsync(state.media.map(el => el.url))
                state.media = refactorImage(data?.data?.data?.originals).map((el, key) => ({ url: el.url, isMain: key === isMainIndex }))
                state.thumb = state.media.find(el => el.isMain)?.url
            } else if (!checkChange('isMain')) {
                const data = await generateThumb.mutateAsync([isMain])
                state.thumb = data?.data?.data?.thumbs[0]
            }
        } catch (error) { }
    }, [state, prev_data])

    const setStateHandle = useCallback((key, value) => setStates(prev => ({ ...prev, [key]: value })), [])

    const submit = useCallback(async (draft) => {
        try {
            // Check change data
            if (JSON.stringify(prev_data) === JSON.stringify(state)) return shopNavigate("products")

            setStateHandle("draft", draft)
            setStateHandle("loading", true)
            await setThumb()
            const service = productID ? update.mutateAsync : create.mutateAsync
            await validate({ state, draft })
            const formData = makeData({ state, draft, productID })
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