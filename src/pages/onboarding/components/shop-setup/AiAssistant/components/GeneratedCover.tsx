import { Flex } from '@chakra-ui/react'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { ImageSlider } from './ImageSlider'

interface Props extends GenerateWithAiData {
    covers: string[]
    isLoading: boolean
    refetch: () => void
    selectedCover: string
    onCoverChange: (cover: string) => void
}

export default function GeneratedCover({ covers, isLoading, refetch, onCoverChange }: Props) {
    return (
        <GeneratedContentWrapper
            title='Cover Image'
            onRetry={refetch}
            isLoading={isLoading}
            flexProps={{
                px: { base: 4, md: 9, lg: "48px" }
            }}
        >
            <Flex alignItems="center" gap={4}>
                <ImageSlider images={covers} onChange={onCoverChange} isLoading={isLoading} />
            </Flex>
        </GeneratedContentWrapper>
    )
}
