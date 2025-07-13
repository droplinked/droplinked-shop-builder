import useAppToast from 'hooks/toast/useToast'
import { getShopExtractedData, startWebsiteCrawling } from 'services/crawler/services'
import { usePolling } from 'hooks/usePolling/usePolling'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from '../stores/useOnboardingStore'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export const useShopUrlProcessor = () => {
    const { hasPaidSubscription } = useAppStore()
    const { updateShopData } = useOnboardingStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('common')

    const polling = usePolling({
        onError: (error) => {
            showToast({ type: "error", message: t('onboarding.hooks.errors.failedToImportShopData') })
        },
        onTimeout: () => {
            showToast({ type: "error", message: t('onboarding.hooks.errors.importTimedOut') })
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

                showToast({ type: "success", message: t('onboarding.hooks.success.shopDataImported') })
                return true
            }

            return false
        } catch (error) {
            showToast({ type: "error", message: t('onboarding.hooks.errors.failedToImportShopData') })
            return false
        }
    }

    const processShopUrl = async (url: string): Promise<void> => {
        try {
            polling.startProcessing()
            const { data } = await startWebsiteCrawling({ websiteUrl: url, extractShopInfo: true })

            // Start polling for the extracted data
            polling.startPolling(() => pollShopExtractedData(data.poolId))

            showToast({ type: "info", message: t('onboarding.hooks.info.importStarted') })
        } catch (error) {
            showToast({ type: "error", message: t('onboarding.hooks.errors.failedToStartImport') })
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