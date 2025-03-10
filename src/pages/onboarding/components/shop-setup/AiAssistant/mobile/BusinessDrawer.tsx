import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Drawer from 'components/common/Drawer/Drawer'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import Textarea from 'components/redesign/textarea/Textarea'
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
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const title = "Use droplinked AI to create your shop";
    const description = "Use the AI tools to streamline the creation of store assets.";

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
            discardButtonText='Discard'
            saveButtonText='Generate Shop Details with AI'
            drawerFooterProps={{
                padding: { base: 4, md: "24px 48px" },
                background: "#1C1C1C",
                justifyContent: { base: "center", md: "space-between" },
                gap: 4,
                width: "100%",
            }}
            saveButtonProps={{
                width: { base: "100%", md: "auto" }
            }}
            drawerContentStyle={{
                background: "#1C1C1C"
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
            <Flex p={{ base: 4, md: "48px" }} flexDirection="column" gap={9} background="#1C1C1C">
                <Textarea
                    label='Describe Your Business'
                    isRequired={true}
                    placeholder='Please describe your shop to help our AI create a more accurate and efficient representation of your business.'
                />
                <BusinessCategory
                    generateWithAiData={generateWithAiData}
                    onChange={handleChange}
                />
            </Flex>
        </Drawer>
    )
}
