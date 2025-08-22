import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { usePolling } from 'hooks/usePolling/usePolling'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { generateDomains, generateHeroSection, generateLogos, generateShopNames, getAiImageStatus } from 'services/ai/services'
import useOnboardingStore from '../stores/useOnboardingStore'
import { GenerationState } from '../types/aiAssistant'

export const useAiGeneratedContent = () => {
    // Use refs to track generation state to avoid race conditions
    const logoState = useRef<GenerationState>({ completedResults: [], finishedRequests: 0, totalRequests: 3 })
    const coverState = useRef<GenerationState>({ completedResults: [], finishedRequests: 0, totalRequests: 3 })

    // Create 3 separate polling instances for logos
    const logoPolling1 = usePolling({ maxAttempts: 120 }) // 10 minutes max
    const logoPolling2 = usePolling({ maxAttempts: 120 })
    const logoPolling3 = usePolling({ maxAttempts: 120 })

    // Create 3 separate polling instances for covers
    const coverPolling1 = usePolling({ maxAttempts: 120 })
    const coverPolling2 = usePolling({ maxAttempts: 120 })
    const coverPolling3 = usePolling({ maxAttempts: 120 })

    const { showToast } = useAppToast()
    const { shopSetupUI, aiGeneratedContent, updateAiContent, updateAiLoadingState } = useOnboardingStore()
    const { businessCategory, businessDescription } = shopSetupUI
    const { t } = useLocaleResources('onboarding')

    // Helper function to reset state and stop all polling for a specific type
    const resetAndStopPolling = (type: 'logos' | 'covers') => {
        if (type === 'logos') {
            logoState.current = { completedResults: [], finishedRequests: 0, totalRequests: 3 }
            logoPolling1.stopPolling()
            logoPolling2.stopPolling()
            logoPolling3.stopPolling()
        } else {
            coverState.current = { completedResults: [], finishedRequests: 0, totalRequests: 3 }
            coverPolling1.stopPolling()
            coverPolling2.stopPolling()
            coverPolling3.stopPolling()
        }
    }

    // Helper function to handle completion of all requests
    const handleAllRequestsCompleted = (type: 'logos' | 'covers', state: GenerationState) => {
        const hasResults = state.completedResults.length > 0
        const successKey = type === 'logos' ? 'logosGenerated' : 'coversGenerated'
        const errorKey = type === 'logos' ? 'allLogoGenerationFailed' : 'allCoverGenerationFailed'

        if (hasResults) {
            updateAiContent(type, state.completedResults.slice(0, 3))
            showToast({ type: "success", message: t(`useAiGeneratedContent.success.${successKey}`) })
        } else {
            showToast({ type: "error", message: t(`useAiGeneratedContent.errors.${errorKey}`) })
        }

        updateAiLoadingState(type, false)
        resetAndStopPolling(type)
    }

    // Helper function to create polling logic for image generation
    const createPollingHandler = (type: 'logos' | 'covers', stateRef: React.MutableRefObject<GenerationState>) => {
        return async (requestId: string) => {
            try {
                const response = await getAiImageStatus(requestId)
                const statusData = response.data

                if (statusData.status === "SUCCESS") {
                    // Add result and increment finished count
                    stateRef.current.completedResults.push(statusData.result)
                    stateRef.current.finishedRequests++

                    // Check if all requests are finished
                    if (stateRef.current.finishedRequests >= stateRef.current.totalRequests) {
                        handleAllRequestsCompleted(type, stateRef.current)
                    }

                    return true // Stop this specific polling instance
                }

                if (statusData.status === "PENDING") {
                    return false // Continue polling
                }

                if (statusData.status === "FAILURE") {
                    // Just increment finished count for failed request
                    stateRef.current.finishedRequests++

                    // Check if all requests are finished
                    if (stateRef.current.finishedRequests >= stateRef.current.totalRequests) {
                        handleAllRequestsCompleted(type, stateRef.current)
                    }

                    return true // Stop this specific polling instance
                }

                // Handle any other unexpected status
                console.error(`Unexpected status for ${type} request ${requestId}:`, statusData.status)
                stateRef.current.finishedRequests++

                if (stateRef.current.finishedRequests >= stateRef.current.totalRequests) {
                    handleAllRequestsCompleted(type, stateRef.current)
                }

                return true // Stop this specific polling instance
            } catch (error) {
                console.error(`Error checking ${type} status:`, error)
                // Don't increment finished count on network errors, just continue polling
                return false
            }
        }
    }

    const { mutate: generateLogosMutation } = useMutation(
        async () => {
            // Generate 3 logo requests simultaneously
            const logoPromises = Array(3).fill(null).map(() =>
                generateLogos({ category: businessCategory, prompt: businessDescription })
            )

            const responses = await Promise.all(logoPromises)
            const requestIds = responses.map(response => response.data?.requestId).filter(Boolean)

            return requestIds
        },
        {
            onMutate: () => {
                updateAiLoadingState('logos', true)
                resetAndStopPolling('logos')
            },
            onSuccess(requestIds) {
                if (requestIds.length > 0) {
                    const pollingInstances = [logoPolling1, logoPolling2, logoPolling3]
                    const logoPollingHandler = createPollingHandler('logos', logoState)

                    // Start polling for each logo request separately
                    requestIds.forEach((requestId, index) => {
                        const pollingInstance = pollingInstances[index]
                        if (pollingInstance) {
                            pollingInstance.startPolling(() => logoPollingHandler(requestId))
                        }
                    })
                } else {
                    showToast({ message: t('useAiGeneratedContent.errors.failedToGetLogoRequestIds'), type: "error" })
                    updateAiLoadingState('logos', false)
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('useAiGeneratedContent.errors.failedToGenerateLogos'), type: "error" })
                updateAiLoadingState('logos', false)
                resetAndStopPolling('logos')
            }
        }
    )

    const { mutate: generateCoversMutation } = useMutation(
        async () => {
            // Generate 3 cover requests simultaneously
            const coverPromises = Array(3).fill(null).map(() =>
                generateHeroSection({ category: businessCategory, prompt: businessDescription })
            )

            const responses = await Promise.all(coverPromises)
            const requestIds = responses.map(response => response.data?.requestId).filter(Boolean)

            return requestIds
        },
        {
            onMutate: () => {
                updateAiLoadingState('covers', true)
                resetAndStopPolling('covers')
            },
            onSuccess(requestIds) {
                if (requestIds.length > 0) {
                    const pollingInstances = [coverPolling1, coverPolling2, coverPolling3]
                    const coverPollingHandler = createPollingHandler('covers', coverState)

                    // Start polling for each cover request separately
                    requestIds.forEach((requestId, index) => {
                        const pollingInstance = pollingInstances[index]
                        if (pollingInstance) {
                            pollingInstance.startPolling(() => coverPollingHandler(requestId))
                        }
                    })
                } else {
                    showToast({ message: t('useAiGeneratedContent.errors.failedToGetCoverRequestIds'), type: "error" })
                    updateAiLoadingState('covers', false)
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('useAiGeneratedContent.errors.failedToGenerateCovers'), type: "error" })
                updateAiLoadingState('covers', false)
                resetAndStopPolling('covers')
            }
        }
    )

    const { mutate: generateUrlsMutation } = useMutation(
        () => generateDomains({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('urls', true)
            },
            onSuccess(data) {
                updateAiContent('urls', data.data?.domains || [])
                updateAiLoadingState('urls', false)
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('useAiGeneratedContent.errors.failedToGenerateUrls'), type: "error" })
                updateAiLoadingState('urls', false)
            }
        }
    )

    const { mutate: generateNamesMutation } = useMutation(
        () => generateShopNames({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('names', true)
            },
            onSuccess(data) {
                updateAiContent('names', data.data?.shopNames || [])
                updateAiLoadingState('names', false)
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('useAiGeneratedContent.errors.failedToGenerateNames'), type: "error" })
                updateAiLoadingState('names', false)
            }
        }
    )

    const generateContent = (type: 'logos' | 'covers' | 'urls' | 'names') => {
        if (!businessCategory || !businessDescription) {
            showToast({ message: t('useAiGeneratedContent.warnings.fillBusinessInfoFirst'), type: "warning" })
            return
        }

        switch (type) {
            case 'logos':
                generateLogosMutation()
                break
            case 'covers':
                generateCoversMutation()
                break
            case 'urls':
                generateUrlsMutation()
                break
            case 'names':
                generateNamesMutation()
                break
        }
    }

    const generateAllContent = () => {
        if (!businessCategory || !businessDescription) {
            showToast({ message: t('useAiGeneratedContent.warnings.fillBusinessInfoFirst'), type: "warning" })
            return
        }

        generateLogosMutation()
        generateCoversMutation()
        generateUrlsMutation()
        generateNamesMutation()
    }

    return {
        isLoading: aiGeneratedContent.isLoading,
        logos: aiGeneratedContent.logos,
        covers: aiGeneratedContent.covers,
        urls: aiGeneratedContent.urls,
        names: aiGeneratedContent.names,
        generateContent,
        generateAllContent,
        businessCategory,
        businessDescription
    }
} 