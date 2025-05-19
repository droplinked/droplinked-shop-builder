import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useStack from 'hooks/stack/useStack'
import useAppToast from 'hooks/toast/useToast'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import useAppWeb3 from 'hooks/web3/useWeb3'
import { createProductService, updateProductService } from 'lib/apis/product/productServices'
import { getShopSubscriptionDataService } from 'lib/apis/subscription/subscriptionServices'
import useAppStore, { useLegalUsage } from 'stores/app/appStore'
import useGrowthHackStore from 'stores/growth-hack/useGrowthHackStore'
import { Product, ProductType } from 'pages/products/utils/types'
import { useRef } from 'react'
import { productTypeUsageLimits } from 'utils/constants'

interface Params {
    closeProductFormDrawer: () => void
    openDropModal: () => void
    openCircleModal: () => void
    closeCircleModal: () => void
}

const useProductSubmission = ({ closeProductFormDrawer, openDropModal, openCircleModal, closeCircleModal }: Params) => {
    const { growthHackData, fetchGrowthHackData } = useGrowthHackStore()
    const { showToast } = useAppToast()
    const { web3 } = useAppWeb3()
    const stack = useStack()
    const shopLegalUsage = useLegalUsage()
    const { user: { wallets }, shop } = useAppStore()
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { convertPrice } = useCurrencyConverter()

    // Refs for global state inside the hook
    const shouldOpenCircleModal = useRef(false)
    const selectedChain = useRef<string | null>(null)
    const savedProduct = useRef<Product | null>(null)
    const transactionHash = useRef<string | null>(null)

    const handleSubmit = async (values: Product) => {
        const { digitalDetail, publish_status } = values
        selectedChain.current = digitalDetail.chain
        const isSavingAsDraft = publish_status === 'DRAFTED'
        const shouldRecordProduct = selectedChain.current && !isSavingAsDraft

        try {
            const convertedValues = {
                ...values,
                sku: values.sku.map(sku => ({ ...sku, price: convertPrice({ amount: sku.price, toUSD: true }) }))
            }
            await saveProduct(convertedValues, shouldRecordProduct, isSavingAsDraft)

            if (shouldRecordProduct) {
                shouldOpenCircleModal.current = checkCircleModalCondition()
                shouldOpenCircleModal.current ? openCircleModal() : await handleDirectRecord()
            }
            else await handlePostSubmission(values)
        }
        catch (error) {
            handleError(error)
        }
    }

    const saveProduct = async (values: Product, shouldRecordProduct: boolean, isSavingAsDraft: boolean) => {
        const { _id, product_type } = values

        if (_id) {
            const response = await updateProductService({ productID: _id, params: values })
            savedProduct.current = formatProductResponse(response.data.data)
        }
        else {
            checkProductTypeLegalUsage(product_type)
            const response = await createProductService({
                ...values,
                publish_product: shouldRecordProduct ? false : !isSavingAsDraft
            })
            savedProduct.current = formatProductResponse(response.data.data)
        }
    }

    const handleDirectRecord = async () => {
        await recordProduct()
    }

    const checkCircleModalCondition = () => {
        const result =
            !shop.deployedContracts?.some(contract => contract.type === selectedChain.current) &&
            ["ETH", "POLYGON", "SOLANA"].includes(selectedChain.current) &&
            shop.circleWallets?.some(cw => cw.chain === selectedChain.current)

        return result
    }

    const recordProduct = async () => {
        const product = savedProduct.current

        try {
            const params = generateRecordParams(product)
            transactionHash.current = await web3({
                method: 'record_batch',
                params,
                product,
                shop,
                commission: product.commission,
                royalty: product.sku[0].royalty,
                chain: selectedChain.current,
                wallets,
                stack
            })

            const response = await updateProductService({ productID: product._id, params: { publish_product: true } })
            savedProduct.current = response.data.data
            await getShopSubscriptionDataService()
            showToast({ message: 'The product has been successfully recorded!', type: 'success' })
            openDropModal()
        }
        catch (error) {
            await updateProductService({ productID: product._id, params: { digitalDetail: { chain: null } } })
            showToast({ message: error.message || 'Failed to record the product.', type: 'error' })
        }
        finally {
            if (shouldOpenCircleModal.current) closeCircleModal()
        }
    }

    const handlePostSubmission = async (values: Product) => {
        if (
            !growthHackData?.list?.createFirstProduct ||
            (!growthHackData?.list?.joinAffiliateMarket && values.commission)
        ) {
            await fetchGrowthHackData()
        }
        showToast({ message: "The product has been saved successfully!", type: "success" })
        closeProductFormDrawer()
        invalidateProductsQuery()
    }

    const generateRecordParams = (product: Product) => {
        const { product_type, sku, media } = product

        const quantity = product_type === "DIGITAL"
            ? sku[0].quantity
            : product_type === "PRINT_ON_DEMAND"
                ? "1000000"
                : sku.reduce((sum, sku) => sum + sku.quantity, 0).toString()

        return sku.map(s => ({
            quantity,
            sku: s,
            imageUrl: (media.find(m => m.isMain || m.isMain === "true") ?? product.media[0]).thumbnail
        }))
    }

    const formatProductResponse = (data: any) => {
        const { skuIDs, ...rest } = data
        return { ...rest, sku: skuIDs }
    }

    const checkProductTypeLegalUsage = (productType: ProductType) => {
        const { errorMessage, key } = productTypeUsageLimits[productType]
        const legalUsage = shopLegalUsage.find(obj => obj.key === key)
        if (!(legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0)) {
            throw new Error(errorMessage)
        }
    }

    const handleError = (error: any) => {
        const errorMessage = error?.response?.data?.data?.message || error?.message || "An unexpected error occurred."
        showToast({ message: errorMessage, type: "error" })
    }

    return {
        handleSubmit,
        recordProduct,
        savedProduct: savedProduct.current,
        selectedChain: selectedChain.current,
        transactionHash: transactionHash.current
    }
}

export default useProductSubmission