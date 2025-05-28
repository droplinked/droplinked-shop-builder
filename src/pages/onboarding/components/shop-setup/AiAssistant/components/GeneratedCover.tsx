import { Flex } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import { generateHeroSection } from 'services/ai/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import { useQuery } from 'react-query'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { ImageSlider } from './ImageSlider'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props extends GenerateWithAiData {
    businessCategory: string
    businessDescribe: string
}

export default function GeneratedCover({ businessCategory, businessDescribe }: Props) {
    const { showToast } = useAppToast()
    const { updateOnboardingState, storeSetup } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const { isFetching, isLoading, data: covers, refetch } = useQuery({
        queryFn: () => generateHeroSection({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateHeroSection"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.heroSections || []
        },
        onSuccess(data) {
            handleChange(data?.[0])
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
        refetchOnMount: false,
    })

    const handleChange = (url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, hero_section: url })
    }

    return (
        <GeneratedContentWrapper title={t('aiAssistant.generationModal.covers.title')} onRetry={refetch} isLoading={isFetching}>
            <Flex alignItems="center" gap={4}>
                <ImageSlider images={covers ?? []} onChange={handleChange} isLoading={isFetching || isLoading} />
            </Flex>
        </GeneratedContentWrapper>
    )
}
