import useAppToast from 'hooks/toast/useToast'
import { usePolling } from 'hooks/usePolling/usePolling'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { generateDomains, generateHeroSection, generateLogos, generateShopNames, getAiImageStatus } from 'services/ai/services'
import useOnboardingStore from '../stores/useOnboardingStore'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export const useAiGeneratedContent = () => {
    // State to track completed generations
    const [completedLogos, setCompletedLogos] = useState<string[]>([])
    const [completedCovers, setCompletedCovers] = useState<string[]>([])
    const [finishedLogoRequests, setFinishedLogoRequests] = useState<number>(0)
    const [finishedCoverRequests, setFinishedCoverRequests] = useState<number>(0)

    // Create 3 separate polling instances for logos
    const logoPolling1 = usePolling()
    const logoPolling2 = usePolling()
    const logoPolling3 = usePolling()

    // Create 3 separate polling instances for covers
    const coverPolling1 = usePolling()
    const coverPolling2 = usePolling()
    const coverPolling3 = usePolling()

    const { showToast } = useAppToast()
    const { shopSetupUI, aiGeneratedContent, updateAiContent, updateAiLoadingState } = useOnboardingStore()
    const { businessCategory, businessDescription } = shopSetupUI
    const { t } = useLocaleResources('common')

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
                setCompletedLogos([])
                setFinishedLogoRequests(0)
            },
            onSuccess(requestIds) {
                if (requestIds.length > 0) {
                    // Start polling for each logo request separately
                    requestIds.forEach((requestId, index) => {
                        const pollingInstance = [logoPolling1, logoPolling2, logoPolling3][index]

                        pollingInstance.startPolling(async () => {
                            try {
                                const response = await getAiImageStatus(requestId)
                                const statusData = response.data

                                if (statusData.status === "SUCCESS") {
                                    // Add this logo to completed list and increment finished count
                                    setCompletedLogos(prev => {
                                        const newLogos = [...prev, statusData.result]
                                        return newLogos
                                    })

                                    setFinishedLogoRequests(prev => {
                                        const newFinished = prev + 1

                                        // Check if all 3 requests are finished or we have enough logos
                                        if (newFinished >= 3) {
                                            setCompletedLogos(currentLogos => {
                                                if (currentLogos.length > 0) {
                                                    updateAiContent('logos', currentLogos.slice(0, 3))
                                                    showToast({ type: "success", message: t('onboarding.hooks.success.logosGenerated') })
                                                } else {
                                                    showToast({ type: "error", message: t('onboarding.hooks.errors.allLogoGenerationFailed') })
                                                }
                                                updateAiLoadingState('logos', false)

                                                // Stop all logo polling
                                                logoPolling1.stopPolling()
                                                logoPolling2.stopPolling()
                                                logoPolling3.stopPolling()

                                                return currentLogos
                                            })
                                        }

                                        return newFinished
                                    })

                                    return true // Stop this specific polling instance
                                }

                                if (statusData.status === "PENDING") {
                                    return false // Continue polling
                                }

                                if (statusData.status === "FAILURE") {
                                    // Increment finished count for failed request
                                    setFinishedLogoRequests(prev => {
                                        const newFinished = prev + 1

                                        // Check if all 3 requests are finished
                                        if (newFinished >= 3) {
                                            setCompletedLogos(currentLogos => {
                                                if (currentLogos.length > 0) {
                                                    updateAiContent('logos', currentLogos.slice(0, 3))
                                                    showToast({ type: "success", message: t('onboarding.hooks.success.logosGenerated') })
                                                } else {
                                                    showToast({ type: "error", message: t('onboarding.hooks.errors.allLogoGenerationFailed') })
                                                }
                                                updateAiLoadingState('logos', false)

                                                // Stop all logo polling
                                                logoPolling1.stopPolling()
                                                logoPolling2.stopPolling()
                                                logoPolling3.stopPolling()

                                                return currentLogos
                                            })
                                        }

                                        return newFinished
                                    })

                                    return true // Stop this specific polling instance, ignore the failure
                                }

                                // Handle any other unexpected status
                                console.error(`Unexpected status for logo request ${requestId}:`, statusData.status)
                                return true // Stop this specific polling instance
                            } catch (error) {
                                console.error('Error checking logo status:', error)
                                return false
                            }
                        })
                    })
                } else {
                    showToast({ message: t('onboarding.hooks.errors.failedToGetLogoRequestIds'), type: "error" })
                    updateAiLoadingState('logos', false)
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('onboarding.hooks.errors.failedToGenerateLogos'), type: "error" })
                updateAiLoadingState('logos', false)
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
                setCompletedCovers([])
                setFinishedCoverRequests(0)
            },
            onSuccess(requestIds) {
                if (requestIds.length > 0) {
                    // Start polling for each cover request separately
                    requestIds.forEach((requestId, index) => {
                        const pollingInstance = [coverPolling1, coverPolling2, coverPolling3][index]

                        pollingInstance.startPolling(async () => {
                            try {
                                const response = await getAiImageStatus(requestId)
                                const statusData = response.data

                                if (statusData.status === "SUCCESS") {
                                    // Add this cover to completed list and increment finished count
                                    setCompletedCovers(prev => {
                                        const newCovers = [...prev, statusData.result]
                                        return newCovers
                                    })

                                    setFinishedCoverRequests(prev => {
                                        const newFinished = prev + 1

                                        // Check if all 3 requests are finished or we have enough covers
                                        if (newFinished >= 3) {
                                            setCompletedCovers(currentCovers => {
                                                if (currentCovers.length > 0) {
                                                    updateAiContent('covers', currentCovers.slice(0, 3))
                                                    showToast({ type: "success", message: t('onboarding.hooks.success.coversGenerated') })
                                                } else {
                                                    showToast({ type: "error", message: t('onboarding.hooks.errors.allCoverGenerationFailed') })
                                                }
                                                updateAiLoadingState('covers', false)

                                                // Stop all cover polling
                                                coverPolling1.stopPolling()
                                                coverPolling2.stopPolling()
                                                coverPolling3.stopPolling()

                                                return currentCovers
                                            })
                                        }

                                        return newFinished
                                    })

                                    return true // Stop this specific polling instance
                                }

                                if (statusData.status === "PENDING") {
                                    return false // Continue polling
                                }

                                if (statusData.status === "FAILURE") {
                                    // Increment finished count for failed request
                                    setFinishedCoverRequests(prev => {
                                        const newFinished = prev + 1

                                        // Check if all 3 requests are finished
                                        if (newFinished >= 3) {
                                            setCompletedCovers(currentCovers => {
                                                if (currentCovers.length > 0) {
                                                    updateAiContent('covers', currentCovers.slice(0, 3))
                                                    showToast({ type: "success", message: t('onboarding.hooks.success.coversGenerated') })
                                                } else {
                                                    showToast({ type: "error", message: t('onboarding.hooks.errors.allCoverGenerationFailed') })
                                                }
                                                updateAiLoadingState('covers', false)

                                                // Stop all cover polling
                                                coverPolling1.stopPolling()
                                                coverPolling2.stopPolling()
                                                coverPolling3.stopPolling()

                                                return currentCovers
                                            })
                                        }

                                        return newFinished
                                    })

                                    return true // Stop this specific polling instance, ignore the failure
                                }

                                // Handle any other unexpected status
                                console.error(`Unexpected status for cover request ${requestId}:`, statusData.status)
                                return true // Stop this specific polling instance
                            } catch (error) {
                                console.error('Error checking cover status:', error)
                                return false
                            }
                        })
                    })
                } else {
                    showToast({ message: t('onboarding.hooks.errors.failedToGetCoverRequestIds'), type: "error" })
                    updateAiLoadingState('covers', false)
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || t('onboarding.hooks.errors.failedToGenerateCovers'), type: "error" })
                updateAiLoadingState('covers', false)
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
                showToast({ message: err.response?.data?.data?.message || t('onboarding.hooks.errors.failedToGenerateUrls'), type: "error" })
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
                showToast({ message: err.response?.data?.data?.message || t('onboarding.hooks.errors.failedToGenerateNames'), type: "error" })
                updateAiLoadingState('names', false)
            }
        }
    )

    const generateContent = (type: 'logos' | 'covers' | 'urls' | 'names') => {
        if (!businessCategory || !businessDescription) {
            showToast({ message: t('onboarding.hooks.warnings.fillBusinessInfoFirst'), type: "warning" })
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
            showToast({ message: t('onboarding.hooks.warnings.fillBusinessInfoFirst'), type: "warning" })
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