import { Flex } from '@chakra-ui/react'
import Textarea from 'components/redesign/textarea/Textarea'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'

interface Props {
    generateWithAiData: GenerateWithAiData
    handleChange: (key: string, value: string | boolean) => void
}

export default function PromptInputs({ generateWithAiData, handleChange }: Props) {
    return (
        <Flex padding={{ base: 4, md: "36px", lg: "48px" }} flexDirection="column" gap={6}>
            <Textarea
                label='Prompt'
                placeholder='Please describe your shop to help our AI create a more accurate and efficient representation of your business.'
                isRequired={true}
                value={generateWithAiData.businessDescribe}
                onChange={(e) => handleChange("businessDescribe", e.target.value)}
            />
        </Flex>
    )
}
