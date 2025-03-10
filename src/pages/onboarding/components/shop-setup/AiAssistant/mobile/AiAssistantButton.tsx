import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Button from 'components/redesign/button/Button'
import React, { useState } from 'react'
import PlansDrawer from './PlansDrawer'

export interface GenerateWithAiData {
    businessDescribe: string
    businessCategory: string
    prompt: string
    enhancePrompt: boolean
}

export default function AiAssistantButton() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [step, setStep] = useState(0)
    const [generateWithAiData, setGenerateWithAiData] = useState<GenerateWithAiData>({
        businessDescribe: "",
        businessCategory: "",
        prompt: "",
        enhancePrompt: false,
    })

    const onNextStep = () => setStep(step + 1)
    const onPrevStep = () => setStep(step - 1)

    return (
        <>
            <Button
                display={{ base: "flex", lg: "none" }}
                fontSize={14}
                fontWeight={500}
                iconSpacing={2}
                leftIcon={<MagicwandLg color="#2BCFA1" />}
                height="48px"
                paddingBlock="14px"
                paddingInline="14px"
                border="1px solid rgba(43, 207, 161, 0.10)"
                background="url(https://upload-file-droplinked.s3.amazonaws.com/3bfc19a5cdaba194e58ebe9ed3c682cb466e32f8001d5e829ddb3fbff71172a6.png)"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="cover"
                onClick={onOpen}
            >
                <Text color="#2BCFA1">
                    Generate with AI
                </Text>
            </Button>

            {
                step === 0 &&
                <PlansDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                />
            }
        </>
    )
}
