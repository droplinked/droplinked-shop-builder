import { UseDisclosureProps } from "@chakra-ui/react"
import { AxiosResponse } from "axios"
import useAppToast from "hooks/toast/useToast"
import { RecentCrawlerTasksResponse } from "services/crawler/interface"
import { CrawlSelectedProducts, getProductsWithPoolId, getRecentCrawlerTasks, startWebsiteCrawling } from "services/crawler/services"
import { UseMutateAsyncFunction, useMutation, useQuery, useQueryClient } from "react-query"
import useProductPageStore from "../stores/ProductPageStore"

interface Params {
    importProductModalController: UseDisclosureProps
    identifiedItemsModalController: UseDisclosureProps
}

export interface UseImportWithUrl {
    startCrawling: () => void
    crawlingLoading: boolean
    getProducts: UseMutateAsyncFunction<AxiosResponse<any, any>, any, string, unknown>
    getProductsLoading: boolean
    getRecentTasks: () => void
    recentTasksLoading: boolean
    recentTasks: RecentCrawlerTasksResponse[]
    crawlSelectedProducts: UseMutateAsyncFunction<AxiosResponse<any, any>, any, { selectedProducts: string[], shouldRecord: boolean }, unknown>
    crawlingSelectedLoading: boolean
}

export const useImportWithUrl = (props: Params) => {
    const { updateProductPageState, targetShopUrl, selectedPoolId } = useProductPageStore()
    const { showToast } = useAppToast()
    const queryClient = useQueryClient()

    const { importProductModalController, identifiedItemsModalController } = props

    const { mutateAsync: startCrawling, isLoading: crawlingLoading } = useMutation({
        mutationFn: () => startWebsiteCrawling({ websiteUrl: targetShopUrl }),
        onMutate() {
            updateProductPageState("crawlerError", "")
        },
        onSuccess: () => {
            updateProductPageState("targetShopUrl", "")
            getRecentTasks()
            showToast({
                message: "Crawl Task Started",
                description: "We are crawling products from the provided URL. Once the task status is set to Previews_ready, you can select the products you want to import.",
                type: "success",
                options: {
                    duration: 5000,
                }
            })
        },
        onError: (error: any) => {
            updateProductPageState("crawlerError", error.response.data.data.message || "An error occurred")
        }
    })

    const { data: recentTasks, isLoading: recentTasksLoading, refetch: getRecentTasks } = useQuery({
        queryKey: ['recentCrawlerTasks'],
        queryFn: () => getRecentCrawlerTasks(),
        enabled: importProductModalController.isOpen,
        refetchInterval: 10000,
        select(data) {
            return data.data
        },
        onError: (error: any) => {
            showToast({ message: error.response.data.data.message || "An error occurred", type: "error" })
        }
    })

    const { mutateAsync: getProducts, isLoading: getProductsLoading } = useMutation({
        mutationFn: (poolId: string) => getProductsWithPoolId(poolId),
        onSuccess: (data, poolId) => {
            updateProductPageState("crawledProducts", data.data)
            updateProductPageState("selectedPoolId", poolId)
            importProductModalController.onClose()
            identifiedItemsModalController.onOpen()
        },
        onError: (error: any) => {
            showToast({ message: error.response.data.data.message || "An error occurred", type: "error" })
        }
    })

    const { mutateAsync: crawlSelectedProducts, isLoading: crawlingSelectedLoading } = useMutation({
        mutationFn: ({ selectedProducts, shouldRecord }: { selectedProducts: string[], shouldRecord: boolean }) =>
            CrawlSelectedProducts({ selectedUrls: selectedProducts, poolId: selectedPoolId, shouldRecord }),
        onSuccess: () => {
            showToast({
                message: "Import task started",
                description: "We are importing selected products to your inventory. You can view ongoing tasks in the Import Products modal.",
                type: "success",
                options: {
                    duration: 5000,
                }
            })
            updateProductPageState("crawledProducts", [])
            updateProductPageState("selectedPoolId", "")
            identifiedItemsModalController.onClose()
            queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] })
        },
        onError: (error: any) => {
            identifiedItemsModalController.onClose()
            importProductModalController.onOpen()
            showToast({ message: error.response.data.data.message || "An error occurred", type: "error" })
        }
    })

    return {
        startCrawling,
        crawlingLoading,
        getProducts,
        getProductsLoading,
        getRecentTasks,
        recentTasksLoading,
        recentTasks,
        crawlSelectedProducts,
        crawlingSelectedLoading
    }
}