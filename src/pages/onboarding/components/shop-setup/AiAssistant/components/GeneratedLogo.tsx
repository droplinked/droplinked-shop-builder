import { Avatar, Box, Flex } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import { generateLogos } from 'services/ai/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import { useQuery } from 'react-query'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import LogosSkeleton from './LogosSkeleton'

interface Props extends GenerateWithAiData {
    businessCategory: string
    businessDescribe: string
}

export default function GeneratedLogo({ businessCategory, businessDescribe }: Props) {
    const { showToast } = useAppToast()
    const { updateOnboardingState, storeSetup } = useOnboardingStore()

    const { isFetching, data: logos, refetch } = useQuery({
        queryFn: () => generateLogos({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateLogos"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.logos || []
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
        onSuccess(data) {
            handleClick(data?.[0])
        },
        refetchOnMount: false,
    })

    const selectedLogo = storeSetup.logo

    const handleClick = (url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, logo: url })
    }

    return (
        <GeneratedContentWrapper title='Logo' onRetry={refetch} isLoading={isFetching}>
            <Flex alignItems="center" gap={4}>
                {isFetching && <LogosSkeleton />}
                {!isFetching && logos?.map((logo, index) => {
                    return (
                        <Box
                            {...(selectedLogo === logo) && { border: "1px solid #2BCFA1" }}
                            borderRadius="full"
                            p={1}
                            cursor="pointer"
                        >
                            <Avatar
                                src={logo}
                                key={index}
                                onClick={() => handleClick(logo)}
                                width={{ base: "56px", md: "76px" }}
                                height={{ base: "56px", md: "76px" }}
                            />
                        </Box>
                    )
                })}
            </Flex>
        </GeneratedContentWrapper>
    )
}
