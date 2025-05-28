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
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
}

export default function BusinessModal({ isOpen, onClose, onNextStep, onPrevStep, generateWithAiData, setGenerateWithAiData }: Props) {
    const { t } = useLocaleResources('onboarding')
    
    const handleChange = (key: string, value: string) => {
        setGenerateWithAiData({ ...generateWithAiData, [key]: value })
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "2xl", isCentered: false }}
            modalContentProps={{ background: "#1C1C1C", paddingBlock: "0" }}
        >
            <Flex flexDirection="column">
                <ModalHeaderData
                    icon={
                        <ModalHeaderIconWrapper>
                            <MagicwandLg color='#fff' />
                        </ModalHeaderIconWrapper>
                    }
                    title={t('common.ai.title')}
                    description={t('common.ai.description')}
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
                        label={t('aiAssistant.businessModal.businessDescribe.label')}
                        isRequired={true}
                        placeholder={t('aiAssistant.businessModal.businessDescribe.placeholder')}
                        value={generateWithAiData.businessDescribe}
                        onChange={(e) => handleChange("businessDescribe", e.target.value)}
                    />

                    <BusinessCategory
                        generateWithAiData={generateWithAiData}
                        onChange={handleChange}
                    />
                </ModalBody>

                <BusinessModalFooter
                    onClose={onClose}
                    onNextStep={onNextStep}
                    generateWithAiData={generateWithAiData}
                />
            </Flex>
        </AppModal>
    )
}
