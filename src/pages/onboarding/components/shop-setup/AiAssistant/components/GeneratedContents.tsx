import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import GeneratedLogo from '../components/GeneratedLogo'
import GeneratedCover from '../components/GeneratedCover'
import GeneratedUrls from '../components/GeneratedUrls'
import GeneratedNames from '../components/GeneratedNames'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'

export default function GeneratedContents({ generateWithAiData }: { generateWithAiData: GenerateWithAiData }) {
    const { businessCategory, businessDescribe } = generateWithAiData

    return (
        <Box
            backgroundColor={{ base: "transparent", lg: "#141414" }}
            height="100%"
            borderLeft={{ base: "none", lg: "1px solid #292929" }}
            p={{ base: 4, md: 9, lg: "48px" }}
            overflow={{ base: "hidden", lg: "auto" }}
        >
            <Flex flexDirection="column" gap={9}>
                <GeneratedLogo businessCategory={businessCategory} businessDescribe={businessDescribe} />
                <GeneratedCover businessCategory={businessCategory} businessDescribe={businessDescribe} />
                <GeneratedUrls businessCategory={businessCategory} businessDescribe={businessDescribe} />
                <GeneratedNames businessCategory={businessCategory} businessDescribe={businessDescribe} />
            </Flex>
        </Box>
    )
}
