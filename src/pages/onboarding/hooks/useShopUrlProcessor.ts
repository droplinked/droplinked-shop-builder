import useAppToast from 'hooks/toast/useToast'
import { getShopExtractedData, startWebsiteCrawling } from 'lib/apis/crawler/services'
import { useEffect, useRef, useState } from 'react'
import useOnboardingStore from '../stores/useOnboardingStore'

export const useShopUrlProcessor = () => {
    const { updateShopData } = useOnboardingStore()
    const { showToast } = useAppToast()
    const [isPolling, setIsPolling] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
                pollingIntervalRef.current = null
            }
            setIsPolling(false)
            setIsProcessing(false)
        }
    }, [])

    const pollShopExtractedData = async (poolId: string): Promise<boolean> => {
        try {
            const { data: shopExtractedData } = await getShopExtractedData(poolId)

            // Check if data is ready (ready is true, processing is false, and response has data field)
            if (shopExtractedData?.ready === true &&
                shopExtractedData?.processing === false &&
                shopExtractedData?.data) {

                // Stop polling
                stopPolling()

                // Update shop data
                updateShopData('name', shopExtractedData.data?.shopName)
                updateShopData('logo', shopExtractedData.data?.logo)
                updateShopData('hero_section', shopExtractedData.data?.banner)
                updateShopData('description', shopExtractedData.data?.description)

                showToast({ type: "success", message: "Shop data imported successfully!" })
                return true
            }

            return false
        } catch (error) {
            console.error('Error polling shop extracted data:', error)
            return false
        }
    }

    const startPolling = (poolId: string) => {
        setIsPolling(true)

        // Poll every 5 seconds
        pollingIntervalRef.current = setInterval(async () => {
            const isReady = await pollShopExtractedData(poolId)
            if (isReady) {
                // Polling will be stopped in pollShopExtractedData
                return
            }
        }, 5000) // 5 seconds interval
    }

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
        }
        setIsPolling(false)
        setIsProcessing(false)
    }

    const processShopUrl = async (url: string): Promise<void> => {
        try {
            setIsProcessing(true)
            const { data } = await startWebsiteCrawling({ websiteUrl: url, extractShopInfo: true })

            // Start polling for the extracted data
            startPolling(data.poolId)

            showToast({ type: "info", message: "Import started. Please wait while we process your website..." })
        } catch (error) {
            showToast({ type: "error", message: "Failed to start import. Please try again." })
            setIsProcessing(false)
        }
    }

    return {
        // State
        isPolling,
        isProcessing,
        isLoading: isProcessing || isPolling,

        // Functions
        processShopUrl,
        stopPolling
    }
} 