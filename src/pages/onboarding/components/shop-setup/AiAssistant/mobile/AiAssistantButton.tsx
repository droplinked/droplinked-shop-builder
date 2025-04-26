import { Text, useDisclosure } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import AppButton from 'components/redesign/button/AppButton'
import PaymentModal from 'pages/onboarding/components/common/payment-modal/PaymentModal'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React, { useState } from 'react'
import BusinessDrawer from './BusinessDrawer'
import GenerationDrawer from './GenerationDrawer'
import PlansDrawer from './PlansDrawer'

export default function AiAssistantButton() {
    const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })
    const [step, setStep] = useState(2)
    const [generateWithAiData, setGenerateWithAiData] = useState<GenerateWithAiData>({
        businessDescribe: "",
        businessCategory: "",
    })

    const onNextStep = () => setStep(step + 1)
    const onPrevStep = () => setStep(step - 1)

    return (
        <>
         {/* TODO: Check with the design */}
            <AppButton
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
            </AppButton>

            {step === 0 &&
                <PlansDrawer
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
                    plan='BUSINESS'
                    clientSecret={''}    
                />
            }
            {step === 2 &&
                <BusinessDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    generateWithAiData={generateWithAiData}
                    setGenerateWithAiData={(data) => setGenerateWithAiData(data)}
                />
            }
            {step === 3 &&
                <GenerationDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onNextStep={onNextStep}
                    generateWithAiData={generateWithAiData}
                    setGenerateWithAiData={(data) => setGenerateWithAiData(data)}
                />
            }
        </>
    )
}
