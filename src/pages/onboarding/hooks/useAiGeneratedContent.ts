import useAppToast from 'hooks/toast/useToast'
import { generateDomains, generateHeroSection, generateLogos, generateShopNames } from 'lib/apis/ai/services'
import { useMutation } from 'react-query'
import useOnboardingStore from '../stores/useOnboardingStore'

export const useAiGeneratedContent = () => {
    const { showToast } = useAppToast()
    const {
        shopSetupUI,
        aiGeneratedContent,
        updateAiContent,
        updateAiLoadingState
    } = useOnboardingStore()

    const { businessCategory, businessDescription } = shopSetupUI

    const { mutate: generateLogosMutation } = useMutation(
        () => generateLogos({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('logos', true)
            },
            onSuccess(data) {
                updateAiContent('logos', data.data?.logos || [])
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate logos', type: "error" })
            },
            onSettled: () => {
                updateAiLoadingState('logos', false)
            }
        }
    )

    const { mutate: generateCoversMutation } = useMutation(
        () => generateHeroSection({ category: businessCategory, prompt: businessDescription }),
        {
            onMutate: () => {
                updateAiLoadingState('covers', true)
            },
            onSuccess(data) {
                updateAiContent('covers', data.data?.heroSections || [])
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate covers', type: "error" })
            },
            onSettled: () => {
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
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate URLs', type: "error" })
            },
            onSettled: () => {
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
            },
            onError(err: any) {
                showToast({ message: err.response?.data?.data?.message || 'Failed to generate names', type: "error" })
            },
            onSettled: () => {
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
        // Loading states
        isLoading: aiGeneratedContent.isLoading,

        // Generated content
        logos: aiGeneratedContent.logos,
        covers: aiGeneratedContent.covers,
        urls: aiGeneratedContent.urls,
        names: aiGeneratedContent.names,

        // Generation functions
        generateContent,
        generateAllContent,

        // Business info
        businessCategory,
        businessDescription
    }
}
