import { Flex, Grid, ModalBody } from '@chakra-ui/react'
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React from 'react'
import PaymentModalRightContent from './PaymentModalRightContent'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
}

export default function PaymentModal({ isOpen, onClose, onNextStep, onPrevStep }: Props) {
    //TODO: Complete this component if needed

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
                                <CreditcardLg color='#fff' />
                            </ModalHeaderIconWrapper>
                        }
                        title="Payment Information"
                        description="Enter your credit card information to finalize checkout."
                        descriptionProps={{ color: "#B1B1B1 !important" }}
                        modalHeaderProps={{
                            paddingBlock: "48px !important",
                            borderBottom: "1px solid #292929",
                        }}
                    />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        gap={6}
                        padding="48px !important"
                    >

                    </ModalBody>
                </Flex>

                <PaymentModalRightContent />

            </Grid>
        </AppModal>
    )
}
