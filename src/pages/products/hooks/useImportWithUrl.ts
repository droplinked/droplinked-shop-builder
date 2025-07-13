import { UseDisclosureProps } from "@chakra-ui/react"
import { AxiosResponse } from "axios"
import useAppToast from "hooks/toast/useToast"
import { RecentCrawlerTasksResponse } from "services/crawler/interface"
import { CrawlSelectedProducts, getProductsWithPoolId, getRecentCrawlerTasks, startWebsiteCrawling } from "services/crawler/services"
import { UseMutateAsyncFunction, useMutation, useQuery, useQueryClient } from "react-query"
import useProductPageStore from "../stores/ProductPageStore"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

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
    const { t } = useLocaleResources('common')

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
                message: t('products.hooks.success.crawlTaskStarted'),
                description: t('products.hooks.success.crawlTaskDescription'),
                type: "success",
                options: {
                    duration: 5000,
                }
            })
        },
        onError: (error: any) => {
            updateProductPageState("crawlerError", error.response.data.data.message || t('products.hooks.errors.anErrorOccurred'))
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
            showToast({ message: error.response.data.data.message || t('products.hooks.errors.anErrorOccurred'), type: "error" })
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
            showToast({ message: error.response.data.data.message || t('products.hooks.errors.anErrorOccurred'), type: "error" })
        }
    })

    const { mutateAsync: crawlSelectedProducts, isLoading: crawlingSelectedLoading } = useMutation({
        mutationFn: ({ selectedProducts, shouldRecord }: { selectedProducts: string[], shouldRecord: boolean }) =>
            CrawlSelectedProducts({ selectedUrls: selectedProducts, poolId: selectedPoolId, shouldRecord }),
        onSuccess: () => {
            showToast({
                message: t('products.hooks.success.importTaskStarted'),
                description: t('products.hooks.success.importTaskDescription'),
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
            showToast({ message: error.response.data.data.message || t('products.hooks.errors.anErrorOccurred'), type: "error" })
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