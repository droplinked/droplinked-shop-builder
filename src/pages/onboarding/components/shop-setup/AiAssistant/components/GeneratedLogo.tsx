import { Avatar, Box, Flex } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import LogosSkeleton from './LogosSkeleton'

interface Props extends GenerateWithAiData {
    logos: string[]
    isLoading: boolean
    refetch: () => void
    selectedLogo: string
    onLogoChange: (logo: string) => void
}

export default function GeneratedLogo({ logos, isLoading, refetch, selectedLogo, onLogoChange }: Props) {
    const { t } = useLocaleResources('onboarding')
    
    return (
        <GeneratedContentWrapper
            title={t('aiAssistant.generationModal.logos.title')}
            onRetry={refetch}
            isLoading={isLoading}
            flexProps={{
                px: { base: 4, md: 9, lg: "48px" },
                pt: { base: 4, md: 9, lg: "48px" }
            }}
        >
            <Flex alignItems="center" gap={4}>
                {isLoading && <LogosSkeleton />}
                {!isLoading && logos?.map((logo, index) => {
                    return (
                        <Box
                            key={index}
                            {...(selectedLogo === logo) && { border: "1px solid #2BCFA1" }}
                            borderRadius="full"
                            p={1}
                            cursor="pointer"
                        >
                            <Avatar
                                src={logo}
                                onClick={() => onLogoChange(logo)}
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
