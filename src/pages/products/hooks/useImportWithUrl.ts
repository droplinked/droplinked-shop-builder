import { UseDisclosureProps } from "@chakra-ui/react"
import useProductPageStore from "../stores/ProductPageStore"
import { useMutation, useQueryClient } from "react-query"
import { CrawlSelectedProducts, getProductsWithUrl } from "lib/apis/crawler/services"
import { useState } from "react"
import useAppToast from "hooks/toast/useToast"

interface Params {
    importProductModalController: UseDisclosureProps
    identifiedItemsModalController: UseDisclosureProps
}

export interface UseImportWithUrl {
    crawlProducts: () => void
    isCrawling: boolean
    fakeLoading: boolean
    crawlSelectedProducts: (selectedProducts: string[]) => void
    crawlingSelectedLoading: boolean
}

export const useImportWithUrl = (props: Params) => {
    const { updateProductPageState, targetShopUrl } = useProductPageStore()
    const [fakeLoading, setFakeLoading] = useState(false)
    const { showToast } = useAppToast()
    const queryClient = useQueryClient()

    const { importProductModalController, identifiedItemsModalController } = props

    const { mutateAsync: crawlProducts, isLoading: isCrawling } = useMutation({
        mutationFn: () => getProductsWithUrl(targetShopUrl),
        onMutate() {
            updateProductPageState("crawlerError", "")
        },
        onSuccess: (data) => {
            updateProductPageState("crawledProducts", data.data)
            setFakeLoading(true)
            setTimeout(() => {
                setFakeLoading(false)
                importProductModalController.onClose()
                identifiedItemsModalController.onOpen()
            }, 3000);
        },
        onError: (error: any) => {
            updateProductPageState("crawlerError", error.response.data.data.message || "An error occurred")
        }
    })

    const { mutateAsync: crawlSelectedProducts, isLoading: crawlingSelectedLoading } = useMutation({
        mutationFn: (selectedProducts: string[]) => CrawlSelectedProducts({ selectedUrls: selectedProducts, poolId: targetShopUrl }),
        onSuccess: () => {
            showToast({ message: "Products crawled successfully", type: "success" })
            identifiedItemsModalController.onClose()
            updateProductPageState("crawledProducts", [])
            updateProductPageState("targetShopUrl", "")
            queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] })
        },
        onError: (error: any) => {
            identifiedItemsModalController.onClose()
            importProductModalController.onOpen()
            updateProductPageState("crawlerError", error.response.data.data.message || "An error occurred")
        }
    })

    return {
        crawlProducts,
        isCrawling,
        fakeLoading,
        crawlSelectedProducts,
        crawlingSelectedLoading
    }
}