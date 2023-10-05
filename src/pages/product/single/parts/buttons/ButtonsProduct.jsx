import { Box, HStack, Link, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext, useState } from 'react'
import { productContext } from '../../context'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { productCreateServices, productUpdateServices } from 'lib/apis/product/productServices'
import AppErrors from 'lib/utils/statics/errors/errors'
import useAppToast from 'functions/hooks/toast/useToast'
import ButtonsProductClass from './model/ButtonProductModel'
import useStack from 'functions/hooks/stack/useStack'
import ProductSingleModel from '../../model/model'
import ModalHashkey from 'pages/affiliate/notifications/parts/list/parts/buttons/parts/hashkey/ModalHashkey'
import AppTypography from 'components/common/typography/AppTypography'

// prdocut page
function ButtonsProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const [States, setStates] = useState({
        loading: false,
        draft: false,
        hashkey: null
    })
    const { state, productID, store: { state: { prev_data } } } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData, record } = ButtonsProductClass
    const { showToast } = useAppToast()
    const stacks = useStack()
    const { refactorData } = ProductSingleModel

    const setStateHandle = useCallback((key, value) => setStates(prev => ({ ...prev, [key]: value })), [])

    // Submit product
    const submit = useCallback(async (draft) => {
        try {
            // Check change data
            const isChanged = JSON.stringify(prev_data) === JSON.stringify(state)
            if (isChanged && (state.sku[0]?.recordData?.status !== "NOT_RECORDED" && state.product_type === "DIGITAL")) return shopNavigate("products")

            setStateHandle("draft", draft)
            setStateHandle("loading", true)

            // Validate product data
            await validate({ state, draft })

            // Make and handle data for draft mode 
            const formData = makeData({ state, draft, productID })

            // Request service
            const requestData = productID ? { productID, params: formData } : formData
            const product = state.product_type === "DIGITAL" ? !productID ? refactorData(await (await create.mutateAsync(requestData)).data?.data) : productID && !isChanged ? refactorData(await (await update.mutateAsync(requestData)).data?.data) : state : !productID ? await create.mutateAsync(requestData) : await update.mutateAsync(requestData)

            if (!draft && state.product_type === "DIGITAL" && state.sku[0].recordData.status === "NOT_RECORDED") {
                try {
                    const hashkey = await record({ product, stacks })
                    await update.mutateAsync({ productID: productID || product._id, params: { publish_product: true } })
                    setStateHandle('hashkey', hashkey)
                    onOpen()
                } catch (error) {
                    shopNavigate("products")
                    showToast("Somthimg went wrong", "error")
                }
            } else {
                showToast(draft ? AppErrors.product.your_product_draft : AppErrors.product.your_product_published, "success")
                shopNavigate("products")
            }
            setStateHandle("loading", false)
        } catch (error) {
            setStateHandle("loading", false)
            showToast(error?.response?.data?.data?.message ? error?.response?.data?.data?.message : error?.message ? error.message : "Oops! Something went wrong", "error")
        }
    }, [state, productID, stacks])

    return (
        <>
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
            {isOpen && <ModalHashkey
                blockchain={state.digitalDetail.chain}
                size='3xl'
                description={(<AppTypography textAlign="center" size="18px">By hashing your product variant on the blockchain network, it becomes secured and decentralized, unlocking the potential to join the droplinked decentralized affiliate network. <Link color="#2BCFA1" _hover={{ color: "#2BCFA1" }}>Learn more</Link></AppTypography>)}
                close={() => {
                    shopNavigate("products")
                    onClose()
                }}
                hashkey={States.hashkey}
                open
                text='NFT Successfully Created!'
            />}
        </>
    )
}

export default ButtonsProduct