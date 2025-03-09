import { Box, Flex, ModalBody, Text } from '@chakra-ui/react'
import React from 'react'
import Textarea from 'components/redesign/textarea/Textarea'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import { GenerateWithAiData } from './AiAssistant'

interface Props {
    generateWithAiData: GenerateWithAiData
    handleChange: (key: string, value: string | boolean) => void
}

export default function GenerationModalBody({ generateWithAiData, handleChange }: Props) {
    const getCheckboxStyles = (isSelected: boolean) => ({
        __css: {
            span: {
                borderRadius: "6px",
                ...(isSelected && {
                    background: "#2BCFA1 !important",
                    borderColor: "#2BCFA1 !important"
                })
            }
        }
    })

    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={6}
            padding={"48px !important"}
        >
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
                    <Checkbox
                        isChecked={generateWithAiData.enhancePrompt}
                        {...getCheckboxStyles(generateWithAiData.enhancePrompt)}
                    />
                </Box>
                <Text color="#FFF" fontSize={16} fontWeight={400}>
                    Enhance prompt with AI
                </Text>
            </Flex>
        </ModalBody>
    )
}
