import { Box, HStack, Link, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import CircleRecordModal from 'components/modals/circle-record-modal/CircleRecordModal'
import useStack from 'functions/hooks/stack/useStack'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import useAppWeb3 from 'functions/hooks/web3/useWeb3'
import { productCreateServices, productUpdateServices } from 'lib/apis/product/productServices'
import { getShopSubscriptionDataService } from 'lib/apis/subscription/subscriptionServices'
import useAppStore, { useLegalUsage } from 'lib/stores/app/appStore'
import useGrowthHackStore from 'lib/stores/growth-hack/useGrowthHackStore'
import productTypeLegalUsageMap from 'lib/utils/helpers/productTypeLegalUsageMap'
import AppErrors from 'lib/utils/statics/errors/errors'
import ModalHashkey from 'pages/affiliate/notifications/parts/list/parts/buttons/parts/hashkey/ModalHashkey'
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { productContext } from '../../context'
import ProductSingleModel from '../../model/model'
import ButtonsProductClass from './model/ButtonProductModel'

// prdocut page
function ButtonsProduct() {
    const createdProductRef = useRef(null)
    const shopLegalUsage = useLegalUsage()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isCircleRecordModalOpen, onOpen: openCircleRecordModal, onClose: closeCircleRecordModal } = useDisclosure()
    const create = useMutation((params) => productCreateServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const [States, setStates] = useState({ loading: false, draft: false, hashkey: null })
    const { state, productID, store: { state: { prev_data } } } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate, makeData, record, checkSkuesRecord } = ButtonsProductClass
    const { showToast } = useAppToast()
    const stacks = useStack()
    const { refactorData } = ProductSingleModel
    const appWeb3 = useAppWeb3()
    const { user: { wallets, _id }, shop } = useAppStore()
    const { growthHackData, fetchGrowthHackData } = useGrowthHackStore();
    const selectedChain = state?.digitalDetail?.chain
    const isProducer = useMemo(() => productID && (_id !== state?.ownerID), [state, _id, productID])
    const setStateHandle = useCallback((key, value) => setStates(prev => ({ ...prev, [key]: value })), [])

    const checkProductTypeLegalUsage = () => {
        const { errorMessage, key } = productTypeLegalUsageMap[state.product_type]
        const legalUsage = shopLegalUsage.find(obj => obj.key === key)
        if (!(legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0))
            throw new Error(errorMessage)
    }

    const recordCreatedProduct = async () => {
        try {
            const product = createdProductRef.current
            const hashkey = await record({
                method: (data) => appWeb3.web3({ method: "record", params: { ...data, shop: shop }, chain: selectedChain, wallets, stack: stacks, shop }),
                product: {
                    ...state,
                    _id: product._id,
                    sku: [{ ...state.sku[0], _id: product.sku[0]._id }]
                },
                stacks
            })
            await update.mutateAsync({ productID: productID || product._id, params: { publish_product: true } })
            await getShopSubscriptionDataService()
            setStateHandle('hashkey', hashkey)
            closeCircleRecordModal()
            onOpen()
        }
        catch (error) {
            shopNavigate("products")
            showToast({ message: error.message || "Something went wrong during the recording process", type: "error" })
        }
    }

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

            const shouldRecordDigitalProduct = !draft && selectedChain && state.product_type === "DIGITAL" && state.sku[0].recordData.status === "NOT_RECORDED"

            if (state.product_type === "DIGITAL") {
                if (!productID) {
                    checkProductTypeLegalUsage()
                    const createResponse = await create.mutateAsync({ ...requestData, publish_product: shouldRecordDigitalProduct ? false : true });
                    createdProductRef.current = refactorData(createResponse.data?.data);
                }
                else if (productID && !isChanged) {
                    const updateResponse = await update.mutateAsync(requestData);
                    createdProductRef.current = refactorData(updateResponse.data?.data);
                }
                else createdProductRef.current = state
            }
            else {
                if (!productID) {
                    checkProductTypeLegalUsage()
                    createdProductRef.current = await create.mutateAsync(requestData);
                }
                else createdProductRef.current = await update.mutateAsync(requestData);
            }

            if (shouldRecordDigitalProduct) {
                try {
                    const shouldOpenCircleModal =
                        !shop.deployedContracts?.some(contract => contract.type === selectedChain) &&
                        ["ETH", "POLYGON", "SOLANA"].includes(selectedChain) &&
                        shop.circleWallets?.some(cw => cw.chain === selectedChain)

                    if (shouldOpenCircleModal) openCircleRecordModal()
                    else await recordCreatedProduct()
                }
                catch (error) {
                    shopNavigate("products")
                    showToast({ message: "Something went wrong during the recording process", type: "error" })
                }
            }
            else {
                if (!growthHackData?.list?.createFirstProduct || (!growthHackData?.list?.joinAffiliateMarket && state?.commission)) await fetchGrowthHackData();
                showToast({ message: draft ? AppErrors.product.your_product_draft : productID ? AppErrors.product.your_product_updated : AppErrors.product.your_product_published, type: "success" })
                shopNavigate("products")
            }
            setStateHandle("loading", false)
        }
        catch (error) {
            setStateHandle("loading", false)
            showToast({ message: error?.response?.data?.data?.message ? error?.response?.data?.data?.message : error?.message ? error.message : "Oops! Something went wrong", type: "error" })
        }
    }, [state, productID, stacks, wallets, stacks.stxAddress, openCircleRecordModal, recordCreatedProduct])

    return (
        <>
            <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
                <Box>
                    {(!state.publish_product || !productID) && !isProducer ? (
                        <BasicButton
                            isLoading={States.draft ? States.loading : false}
                            variant={'outline'}
                            onClick={() => submit(true)}
                        >
                            Save as Draft
                        </BasicButton>
                    ) : null}
                </Box>
                {!checkSkuesRecord({ sku: state.sku }) ? (
                    <Box>
                        <BasicButton
                            isLoading={!States.draft ? States.loading : false}
                            isDisabled={States.loading || isProducer}
                            onClick={() => !isProducer && submit(false)}
                        >
                            {productID && state.publish_product ? "Update Product" : "Publish Product"}
                        </BasicButton>
                    </Box>
                ) : null}
            </HStack>
            {isOpen && <ModalHashkey
                blockchain={selectedChain}
                size='3xl'
                description={(<AppTypography textAlign="center" fontSize="18px">By hashing your product variant on the blockchain network, it becomes secured and decentralized, unlocking the potential to join the droplinked decentralized affiliate network. <Link color="#2BCFA1" _hover={{ color: "#2BCFA1" }}>Learn more</Link></AppTypography>)}
                close={() => {
                    shopNavigate("products")
                    onClose()
                }}
                hashkey={States.hashkey}
                open
                text='NFT Successfully Created!'
            />}

            {isCircleRecordModalOpen && (
                <CircleRecordModal
                    isOpen={isCircleRecordModalOpen}
                    onClose={() => {
                        closeCircleRecordModal()
                        shopNavigate("products")
                    }}
                    selectedChain={selectedChain}
                    recordFunction={recordCreatedProduct}
                />
            )}
        </>
    )
}

export default ButtonsProduct