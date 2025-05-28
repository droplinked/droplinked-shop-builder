import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Drawer from 'components/common/Drawer/Drawer'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import Textarea from 'components/redesign/textarea/Textarea'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import BusinessCategory from '../components/BusinessCategory'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
}

export default function BusinessDrawer({ isOpen, onClose, onNextStep, generateWithAiData, setGenerateWithAiData }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { t } = useLocaleResources('onboarding')
    
    const title = t('common.ai.title')
    const description = t('common.ai.description')
    const isDisabled = !generateWithAiData.businessCategory || !generateWithAiData.businessDescribe

    const handleChange = (key: string, value: string) => {
        setGenerateWithAiData({ ...generateWithAiData, [key]: value })
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            drawerHeaderStyle={{
                padding: { base: 4, md: "48px" }
            }}
            placement='bottom'
            showSubmitButtons
            discardButtonText={t('common.buttons.discard')}
            saveButtonText={t('aiAssistant.businessModal.generateButton')}
            drawerFooterProps={{
                padding: { base: 4, md: "24px 48px" },
                background: "#1C1C1C",
                justifyContent: { base: "center", md: "space-between" },
                gap: 4,
                width: "100%",
            }}
            saveButtonProps={{
                width: { base: "100%", md: "auto" },
                isDisabled: isDisabled
            }}
            drawerContentStyle={{
                background: "#1C1C1C",
                borderTopRadius: 16,
                height: { base: "100dvh", md: "auto" }
            }}
            onClick={onNextStep}
            {...isSmallerThan768 && {
                title,
                description
            }}
            {...!isSmallerThan768 && {
                icon: (
                    <Box display={{ base: "none", md: "block" }}>
                        <ModalHeaderIconWrapper>
                            <MagicwandLg color='#fff' />
                        </ModalHeaderIconWrapper>
                    </Box>
                ),
                headerContent: (
                    <Flex flexDirection="column" gap={2}>
                        <Text fontSize={24} fontWeight={700} color="#fff">
                            {title}
                        </Text>
                        <Text fontSize={14} color="#B1B1B1">
                            {description}
                        </Text>
                    </Flex>
                )
            }}
        >
            <Flex p={{ base: 4, md: "48px" }} height="100%" flexDirection="column" gap={9} background="#1C1C1C">
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
            </Flex>
        </Drawer>
    )
}
