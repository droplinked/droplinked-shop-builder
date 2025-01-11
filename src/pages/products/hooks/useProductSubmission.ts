import useStack from 'functions/hooks/stack/useStack'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppWeb3 from 'functions/hooks/web3/useWeb3'
import { createProductService, updateProductService } from 'lib/apis/product/productServices'
import { getShopSubscriptionDataService } from 'lib/apis/subscription/subscriptionServices'
import useAppStore, { useLegalUsage } from 'lib/stores/app/appStore'
import useGrowthHackStore from 'lib/stores/growth-hack/useGrowthHackStore'
import productTypeLegalUsageMap from 'lib/utils/helpers/productTypeLegalUsageMap'
import { useRef } from 'react'
import useProductPageStore from '../stores/ProductPageStore'
import { Product, ProductType } from '../utils/types'

interface Params {
    closeProductFormDrawer: () => void
    openCircleModal: () => void
    closeCircleModal: () => void
}

const useProductSubmission = ({ closeProductFormDrawer, openCircleModal, closeCircleModal }: Params) => {
    const { editingProductId } = useProductPageStore()
    const { growthHackData, fetchGrowthHackData } = useGrowthHackStore()
    const { showToast } = useAppToast()
    const { web3 } = useAppWeb3()
    const stacks = useStack()
    const shopLegalUsage = useLegalUsage()
    const { user: { wallets }, shop } = useAppStore()
    const { currency } = shop
    const selectedChain = useRef<string>(null)
    const savedProduct = useRef<Product>(null)
    const transactionHash = useRef<string | null>(null)

    const handleSubmit = async (values: Product) => {
        const { publish_status, digitalDetail, product_type, sku, } = values
        const isSavingAsDraft = publish_status === 'DRAFTED'
        const selectedChain = digitalDetail.chain

        const shouldRecordProduct = selectedChain && !isSavingAsDraft && sku[0].recordData.status === "NOT_RECORDED"

        try {
            if (editingProductId) {
                const response = await updateProductService({ productID: editingProductId, params: values })
                const { skuIDs, ...rest } = response.data.data
                savedProduct.current = { ...rest, sku: skuIDs }
            }
            else {
                checkProductTypeLegalUsage(product_type)
                const response = await createProductService({ ...values, publish_product: !shouldRecordProduct })
                const { skuIDs, ...rest } = response.data.data
                savedProduct.current = { ...rest, sku: skuIDs }
            }

            if (shouldRecordProduct) {
                const shouldOpenCircleModal =
                    !shop.deployedContracts?.some(contract => contract.type === selectedChain) &&
                    ["ETH", "POLYGON", "SOLANA"].includes(selectedChain) &&
                    shop.circleWallets?.some(cw => cw.chain === selectedChain)

                if (shouldOpenCircleModal) openCircleModal()
                else await recordProduct()
            }
            else {
                if (
                    !growthHackData?.list?.createFirstProduct ||
                    (!growthHackData?.list?.joinAffiliateMarket && values.commission)
                ) {
                    await fetchGrowthHackData()
                }
                showToast({ message: "The product has been saved successfully!", type: "success" })
                closeCircleModal()
                closeProductFormDrawer()
            }
        }
        catch (error) {
            const errorMessage =
                error?.response?.data?.data?.message ||
                error?.message ||
                "Something went wrong. Please refresh or try again later."

            showToast({ message: errorMessage, type: "error" })
        }
    }

    const recordProduct = async () => {
        const product = savedProduct.current

        try {
            transactionHash.current = await web3({
                method: 'record_batch',
                params: [{
                    quantity: product.sku[0].quantity,
                    sku: product.sku[0],
                    imageUrl: product.media[0].thumbnail,
                }],
                product: product,
                shop,
                commission: product.commission,
                royalty: product.sku[0].royalty,
                chain: selectedChain.current,
                wallets,
                stack: stacks,
            })
            await updateProductService({ productID: product._id, params: { publish_product: true } })
            await getShopSubscriptionDataService()
            showToast({ message: 'The product has been successfully recorded!', type: 'success' })
        }
        catch (error) {
            await updateProductService({ productID: product._id, params: { digitalDetail: { chain: null } } })
            showToast({ message: error.message || 'Failed to record the product.', type: 'error' })
        }
        finally {
            closeCircleModal()
            closeProductFormDrawer()
        }
    }

    const checkProductTypeLegalUsage = (selectedProductType: ProductType) => {
        const { errorMessage, key } = productTypeLegalUsageMap[selectedProductType]
        const legalUsage = shopLegalUsage.find(obj => obj.key === key)
        if (!(legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0))
            throw new Error(errorMessage)
    }

    return {
        handleSubmit,
        selectedChain: selectedChain.current,
        transactionHash: selectedChain.current,
        recordProduct
    }
}

export default useProductSubmission