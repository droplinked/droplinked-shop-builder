import { Flex, ModalBody } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import Textarea from 'components/redesign/textarea/Textarea'
import React from 'react'
import BusinessCategory from '../components/BusinessCategory'
import BusinessModalFooter from './BusinessModalFooter'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
}

export default function BusinessModal({ isOpen, onClose, onNextStep, onPrevStep, generateWithAiData, setGenerateWithAiData }: Props) {
    const handleChange = (key: string, value: string) => {
        setGenerateWithAiData({ ...generateWithAiData, [key]: value })
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "2xl", isCentered: true }}
            modalContentProps={{ background: "#1C1C1C", paddingBlock: "0" }}
        >
            <Flex flexDirection="column">
                <ModalHeaderData
                    icon={
                        <ModalHeaderIconWrapper>
                            <MagicwandLg color='#fff' />
                        </ModalHeaderIconWrapper>
                    }
                    title="Use droplinked AI to create your shop"
                    description="Use the AI tools to streamline the creation of store assets."
                    descriptionProps={{ color: "#B1B1B1 !important" }}
                    modalHeaderProps={{
                        paddingBlock: "48px !important",
                        borderBottom: "1px solid #292929",
                        background: "#141414",
                    }}
                />
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap={9}
                    padding="48px !important"
                >
                    <Textarea
                        label='Describe Your Business'
                        isRequired={true}
                        placeholder='Please describe your shop to help our AI create a more accurate and efficient representation of your business.'
                    />

                    <BusinessCategory
                        generateWithAiData={generateWithAiData}
                        onChange={handleChange}
                    />
                </ModalBody>

                <BusinessModalFooter onClose={onClose} onNextStep={onNextStep} />
            </Flex>
        </AppModal>
    )
}
