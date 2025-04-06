import { Flex } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { ImageSlider } from './ImageSlider'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import { useQuery } from 'react-query'
import { generateHeroSection } from 'lib/apis/ai/services'
import useAppToast from 'hooks/toast/useToast'

interface Props extends GenerateWithAiData {
    businessCategory: string
    businessDescribe: string
}

export default function GeneratedCover({ businessCategory, businessDescribe }: Props) {
    const { showToast } = useAppToast()
    const { updateOnboardingState, storeSetup } = useOnboardingStore()

    const { isFetching, data: covers, refetch } = useQuery({
        queryFn: () => generateHeroSection({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateHeroSection"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.heroSections || []
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
    })

    const handleChange = (url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, hero_section: url })
    }

    useEffect(() => {
        handleChange(covers?.[0])
    }, [])

    return (
        <GeneratedContentWrapper title='Cover Image' onRetry={refetch} isLoading={isFetching}>
            <Flex alignItems="center" gap={4}>
                <ImageSlider images={covers ?? []} onChange={handleChange} isLoading={isFetching} />
            </Flex>
        </GeneratedContentWrapper>
    )
}
