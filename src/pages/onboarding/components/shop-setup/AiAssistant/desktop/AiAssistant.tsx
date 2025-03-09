import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Button from 'components/redesign/button/Button'
import React, { useState } from 'react'
import PlansModal from './PlansModal'
import PaymentModal from './PaymentModal'
import BusinessModal from './BusinessModal'
import GenerationModal from './GenerationModal'

export interface GenerateWithAiData {
    businessDescribe: string
    businessCategory: string
    prompt: string
    enhancePrompt: boolean
}

export default function AiAssistant() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [step, setStep] = useState(3)
    const [generateWithAiData, setGenerateWithAiData] = useState<GenerateWithAiData>({
        businessDescribe: "",
        businessCategory: "",
        prompt: "",
        enhancePrompt: false,
    })

    const onNextStep = () => setStep(step + 1)
    const onPrevStep = () => setStep(step - 1)

    return (
        <Flex
            display={{ base: "none", lg: "flex" }}
            userSelect="none"
            position="fixed"
            bottom={5}
            right={5}
            background={`url(https://upload-file-droplinked.s3.amazonaws.com/3bfc19a5cdaba194e58ebe9ed3c682cb466e32f8001d5e829ddb3fbff71172a6.png)`}
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            width="245px"
            height="245px"
            borderRadius={16}
            paddingInline={4}
            paddingBlock={4}
            zIndex={9999}
            flexDirection="column"
            gap={3}
        >
            <Flex
                padding={3}
                justify="center"
                align="center"
                borderRadius={8}
                border="1px solid rgba(43, 207, 161, 0.10)"
                background="rgba(43, 207, 161, 0.10)"
                width="min-content"
            >
                <MagicwandLg color="#2BCFA1" />
            </Flex>

            <Box>
                <Text
                    color="#2BCFA1"
                    fontSize={16}
                    fontWeight={700}
                    marginBottom="2px"
                >
                    Generate with AI
                </Text>
                <Text
                    color="#fff"
                    fontSize={14}
                    fontWeight={400}
                >
                    Customize your shop with droplinked AI
                </Text>
            </Box>

            <Button
                marginTop="auto"
                background="rgba(43, 207, 161, 0.10)"
                color="#fff"
                border="none"
                fontSize={14}
                fontWeight={500}
                _hover={{ background: "rgba(43, 207, 161, 0.20)" }}
                onClick={onOpen}
            >
                Try AI Assistant
            </Button>

            {step === 0 &&
                <PlansModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                />
            }
            {step === 1 &&
                <PaymentModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                />
            }
            {step === 2 &&
                <BusinessModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                    generateWithAiData={generateWithAiData}
                    setGenerateWithAiData={(data) => setGenerateWithAiData(data)}
                />
            }
            {step === 3 &&
                <GenerationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                    generateWithAiData={generateWithAiData}
                    setGenerateWithAiData={(data) => setGenerateWithAiData(data)}
                />
            }
        </Flex>
    )
}
