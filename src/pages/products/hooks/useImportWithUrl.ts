import { UseDisclosureProps } from "@chakra-ui/react"
import useProductPageStore from "../stores/ProductPageStore"
import { useMutation } from "react-query"
import { getProductsWithUrl } from "lib/apis/crawler/services"
import { useState } from "react"

interface Params {
    importProductModalController: UseDisclosureProps
    identifiedItemsModalController: UseDisclosureProps
}

export interface UseImportWithUrl {
    crawlProducts: () => void
    isCrawling: boolean
    fakeLoading: boolean
}

export const useImportWithUrl = (props: Params) => {
    const { updateProductPageState, targetShopUrl } = useProductPageStore()
    const [fakeLoading, setFakeLoading] = useState(false)
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

    return {
        crawlProducts,
        isCrawling,
        fakeLoading,
    }
}