import { Box, Flex, Grid, ModalBody } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { useState } from 'react'
import PlanList from '../components/PlanList'
import PlansModalFooter from './PlansModalFooter'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
}

export default function PlansModal({ isOpen, onClose, onNextStep }: Props) {
    const [selectedPlan, setSelectedPlan] = useState("")
    const { t } = useLocaleResources('onboarding')

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "6xl", isCentered: true }}
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
                        title={t('common.ai.title')}
                        description={t('aiAssistant.plansModal.description')}
                        descriptionProps={{ color: "#B1B1B1 !important" }}
                        modalHeaderProps={{
                            paddingBlock: "48px !important",
                            borderBottom: "1px solid #292929",
                        }}
                    />
                    <ModalBody
                        padding="0px !important"
                    >
                        <PlanList
                            selectedPlan={selectedPlan}
                            setSelectedPlan={(selectedPlan) => setSelectedPlan(selectedPlan)}
                        />
                    </ModalBody>
                    <PlansModalFooter onNextStep={onNextStep} onClose={onClose} selectedPlan={selectedPlan} />
                </Flex>

                <Box
                    background="url(https://upload-file-droplinked.s3.amazonaws.com/c70ef55941bba2eff8331f1989513c821a616ae33b9d66e8f3350fff7a2abf57.png)"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    height="800px"
                    borderLeft="1px solid #292929"
                />

            </Grid>
        </AppModal>
    )
}
