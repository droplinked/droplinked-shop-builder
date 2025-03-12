import { Box, Flex } from '@chakra-ui/react'
import Checkbox from 'components/redesign/checkbox/Checkbox'
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
                value={generateWithAiData.prompt}
                onChange={(e) => handleChange("prompt", e.target.value)}
            />

            <Flex
                gap={3}
                alignItems="center"
                onClick={() => handleChange("enhancePrompt", !generateWithAiData.enhancePrompt)}
                cursor="pointer"
            >
                <Box>
                    <Checkbox color="#FFF" fontSize={16} fontWeight={400}>
                        Enhance prompt with AI
                    </Checkbox>
                </Box>
            </Flex>
        </Flex>
    )
}
