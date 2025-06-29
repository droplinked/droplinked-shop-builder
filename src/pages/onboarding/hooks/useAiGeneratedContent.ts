import useAppToast from 'hooks/toast/useToast'
import { usePolling } from 'hooks/usePolling/usePolling'
import { generateDomains, generateHeroSection, generateLogos, generateShopNames, getAiImageStatus } from 'lib/apis/ai/services'
import { useMutation } from 'react-query'
import useOnboardingStore from '../stores/useOnboardingStore'

export const useAiGeneratedContent = () => {
    const { showToast } = useAppToast()
    const { shopSetupUI, aiGeneratedContent, updateAiContent, updateAiLoadingState } = useOnboardingStore()

    const { businessCategory, businessDescription } = shopSetupUI

    // Create polling instances for logos and hero sections only
    const logosPolling = usePolling({
        onError: (error) => {
            console.error('Error polling logos:', error)
            updateAiLoadingState('logos', false)
        },
        onTimeout: () => {
            showToast({ message: 'Logo generation timed out. Please try again.', type: "error" })
            updateAiLoadingState('logos', false)
        }
    })

    const coversPolling = usePolling({
        onError: (error) => {
            console.error('Error polling covers:', error)
            updateAiLoadingState('covers', false)
        },
        onTimeout: () => {
            showToast({ message: 'Cover generation timed out. Please try again.', type: "error" })
            updateAiLoadingState('covers', false)
        }
    })

    const { mutate: generateLogosMutation } = useMutation(
        () => generateLogos({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('logos', true)
                logosPolling.startProcessing()
            },
            onSuccess(data) {
                const requestId = data.data?.requestId
                if (requestId) {
                    logosPolling.startPolling(async () => {
                        try {
                            const response = await getAiImageStatus(requestId)
                            const statusData = response.data

                            if (statusData.status === "SUCCESS") {
                                // Parse the result string to get the image URLs
                                const imageUrls = statusData.result.split(',').map(url => url.trim()).filter(url => url)
                                updateAiContent('logos', imageUrls)
                                updateAiLoadingState('logos', false)
                                logosPolling.stopProcessing()
                                showToast({ type: "success", message: "Logos generated successfully!" })
                                return true
                            }

                            if (statusData.status === "PENDING") {
                                return false // Continue polling
                            }

                            // Handle any other status as error
                            showToast({ message: 'Logo generation failed', type: "error" })
                            updateAiLoadingState('logos', false)
                            logosPolling.stopProcessing()
                            return true
                        } catch (error) {
                            console.error('Error checking logo status:', error)
                            return false
                        }
                    })
                } else {
                    showToast({ message: 'Failed to get request ID for logo generation', type: "error" })
                    updateAiLoadingState('logos', false)
                    logosPolling.stopProcessing()
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate logos', type: "error" })
                updateAiLoadingState('logos', false)
                logosPolling.stopProcessing()
            }
        }
    )

    const { mutate: generateCoversMutation } = useMutation(
        () => generateHeroSection({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('covers', true)
                coversPolling.startProcessing()
            },
            onSuccess(data) {
                const requestId = data.data?.requestId
                if (requestId) {
                    coversPolling.startPolling(async () => {
                        try {
                            const response = await getAiImageStatus(requestId)
                            const statusData = response.data

                            if (statusData.status === "SUCCESS") {
                                // Parse the result string to get the image URLs
                                const imageUrls = statusData.result.split(',').map(url => url.trim()).filter(url => url)
                                updateAiContent('covers', imageUrls)
                                updateAiLoadingState('covers', false)
                                coversPolling.stopProcessing()
                                showToast({ type: "success", message: "Covers generated successfully!" })
                                return true
                            }

                            if (statusData.status === "PENDING") {
                                return false // Continue polling
                            }

                            // Handle any other status as error
                            showToast({ message: 'Cover generation failed', type: "error" })
                            updateAiLoadingState('covers', false)
                            coversPolling.stopProcessing()
                            return true
                        } catch (error) {
                            console.error('Error checking cover status:', error)
                            return false
                        }
                    })
                } else {
                    showToast({ message: 'Failed to get request ID for cover generation', type: "error" })
                    updateAiLoadingState('covers', false)
                    coversPolling.stopProcessing()
                }
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate covers', type: "error" })
                updateAiLoadingState('covers', false)
                coversPolling.stopProcessing()
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
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate URLs', type: "error" })
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
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate names', type: "error" })
                updateAiLoadingState('names', false)
            }
        }
    )

    const generateContent = (type: 'logos' | 'covers' | 'urls' | 'names') => {
        if (!businessCategory || !businessDescription) {
            showToast({ message: 'Please fill in business category and description first', type: "warning" })
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
            showToast({ message: 'Please fill in business category and description first', type: "warning" })
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