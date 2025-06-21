import { Flex, Grid, ModalBody } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/AI/MagicWand/MagicwandLg'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import GeneratedContents from '../components/GeneratedContents'
import PromptInputs from '../components/PromptInputs'

interface Props {
    isOpen: boolean
    onClose: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
}

export default function GenerationModal({ isOpen, onClose, generateWithAiData, setGenerateWithAiData }: Props) {
    const handleChange = (key: string, value: string | boolean) => {
        setGenerateWithAiData({ ...generateWithAiData, [key]: value })
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "6xl", isCentered: false }}
            modalContentProps={{ background: "#1C1C1C", paddingBlock: "0" }}
        >
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
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
                        }}
                    />
                    <ModalBody padding="0px !important">
                        <PromptInputs
                            generateWithAiData={generateWithAiData}
                            handleChange={handleChange}
                        />
                    </ModalBody>
                </Flex>
                <GeneratedContents generateWithAiData={generateWithAiData} onClose={onClose} />
            </Grid>
        </AppModal>
    )
}
