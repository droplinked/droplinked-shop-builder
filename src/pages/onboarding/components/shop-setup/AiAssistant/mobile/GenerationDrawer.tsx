import { Box, Flex, TabPanel, TabPanels, Tabs, Text, useMediaQuery } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Drawer from 'components/common/Drawer/Drawer'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import React from 'react'
import GeneratedContents from '../components/GeneratedContents'
import PromptInputs from '../components/PromptInputs'
import TabsList from './TabsList'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
}

export default function GenerationDrawer({ isOpen, onClose, onNextStep, generateWithAiData, setGenerateWithAiData }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { t } = useLocaleResources('onboarding')

    const title = t('common.ai.title')
    const description = t('common.ai.description')

    const handleChange = (key: string, value: string) => {
        setGenerateWithAiData({ ...generateWithAiData, [key]: value })
    }

    const tabs = [
        {
            title: "Prompt",
            content: <PromptInputs handleChange={handleChange} generateWithAiData={generateWithAiData} />
        },
        {
            title: "Result",
            content: <GeneratedContents generateWithAiData={generateWithAiData} />
        }
    ]

    return (
        <Tabs display="none" defaultIndex={1}>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                drawerHeaderStyle={{
                    padding: { base: "24px 24px 2px 24px", md: "48px 48px 2px 48px" }
                }}
                placement='bottom'
                drawerContentStyle={{
                    background: "#1C1C1C",
                    borderTopRadius: 16,
                    overflow: "hidden",
                    height: { base: "100dvh", md: "auto" }
                }}
                onClick={onNextStep}
                {...isSmallerThan768 && {
                    title,
                    description,
                    headerContent: <TabsList tabs={tabs} />
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
                        <Flex flexDirection="column" gap={4}>
                            <Flex flexDirection="column" gap={2}>
                                <Text fontSize={24} fontWeight={700} color="#fff">
                                    {title}
                                </Text>
                                <Text fontSize={14} color="#B1B1B1">
                                    {description}
                                </Text>
                            </Flex>
                            <TabsList tabs={tabs} />
                        </Flex>
                    )
                }}
            >
                <Flex flexDirection="column" gap={9} height="100%">
                    <TabPanels>
                        {tabs.map((tab, index) => (
                            <TabPanel
                                key={tab.title}
                                background="#1C1C1C"
                                {...index === 0 && { height: "100dvh" }}
                            >
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Flex>
            </Drawer>
        </Tabs>
    )
}
