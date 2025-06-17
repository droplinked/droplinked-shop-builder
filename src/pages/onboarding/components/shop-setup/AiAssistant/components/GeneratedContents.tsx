import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import GeneratedLogo from '../components/GeneratedLogo'
import GeneratedCover from '../components/GeneratedCover'
import GeneratedUrls from '../components/GeneratedUrls'
import GeneratedNames from '../components/GeneratedNames'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import GenerationFooterButtons from './GenerationFooterButtons'
import { useAiGeneratedContent } from 'pages/onboarding/hooks/useAiGeneratedContent'

interface Props {
    generateWithAiData: GenerateWithAiData
    onClose: () => void
}

export default function GeneratedContents({ generateWithAiData, onClose }: Props) {
    const { businessCategory, businessDescribe } = generateWithAiData
    const { logos, covers, urls, names, commitChanges } = useAiGeneratedContent(businessCategory, businessDescribe)
    const isLoading = logos.isLoading || covers.isLoading || urls.isLoading || names.isLoading

    const handleDone = () => {
        commitChanges();
        onClose();
    }

    return (
        <Box
            backgroundColor={{ base: "transparent", lg: "#141414" }}
            height="100%"
            borderLeft={{ base: "none", lg: "1px solid #292929" }}
            overflow={{ base: "hidden", lg: "auto" }}
        >
            <Flex flexDirection="column" gap={9}>
                <GeneratedLogo
                    logos={logos.data}
                    isLoading={logos.isLoading}
                    refetch={logos.refetch}
                    selectedLogo={logos.selectedLogo}
                    onLogoChange={logos.handleChange}
                />
                <GeneratedCover
                    covers={covers.data}
                    isLoading={covers.isLoading}
                    refetch={covers.refetch}
                    selectedCover={covers.selectedCover}
                    onCoverChange={covers.handleChange}
                />
                <GeneratedUrls
                    urls={urls.data}
                    isLoading={urls.isLoading}
                    refetch={urls.refetch}
                    selectedUrl={urls.selectedUrl}
                    onUrlChange={urls.handleChange}
                />
                <GeneratedNames
                    names={names.data}
                    isLoading={names.isLoading}
                    refetch={names.refetch}
                    selectedName={names.selectedName}
                    onNameChange={names.handleChange}
                />
                <GenerationFooterButtons onClose={onClose} onDone={handleDone} isLoading={isLoading} />
            </Flex>
        </Box>
    )
}
