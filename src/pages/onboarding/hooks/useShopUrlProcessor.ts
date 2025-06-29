import useAppToast from 'hooks/toast/useToast'
import { usePolling } from 'hooks/usePolling/usePolling'
import { getShopExtractedData, startWebsiteCrawling } from 'lib/apis/crawler/services'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from '../stores/useOnboardingStore'

export const useShopUrlProcessor = () => {
    const { hasPaidSubscription } = useAppStore()
    const { updateShopData } = useOnboardingStore()
    const { showToast } = useAppToast()

    const polling = usePolling({
        onError: (error) => {
            console.error('Error polling shop extracted data:', error)
            showToast({ type: "error", message: "Failed to import shop data" })
        },
        onTimeout: () => {
            showToast({ type: "error", message: "Import timed out. Please try again." })
        }
    })

    const pollShopExtractedData = async (poolId: string): Promise<boolean> => {
        try {
            const { data: shopExtractedData } = await getShopExtractedData(poolId)

            // Check if data is ready (ready is true, processing is false, and response has data field)
            if (shopExtractedData?.ready === true &&
                shopExtractedData?.processing === false &&
                shopExtractedData?.data) {

                // Stop polling
                polling.stopPolling()

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

    const processShopUrl = async (url: string): Promise<void> => {
        try {
            polling.startProcessing()
            const { data } = await startWebsiteCrawling({ websiteUrl: url, extractShopInfo: true })

            // Start polling for the extracted data
            polling.startPolling(() => pollShopExtractedData(data.poolId))

            showToast({ type: "info", message: "Import started. Please wait while we process your website..." })
        } catch (error) {
            showToast({ type: "error", message: "Failed to start import. Please try again." })
            polling.stopProcessing()
        }
    }

    return {
        // State
        isPolling: polling.isPolling,
        isProcessing: polling.isProcessing,
        isLoading: polling.isLoading,

        // Functions
        processShopUrl,
        stopPolling: polling.stopPolling,
        hasPaidSubscription
    }
} 