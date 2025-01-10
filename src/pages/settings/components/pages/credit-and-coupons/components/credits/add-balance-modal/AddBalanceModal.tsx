import AppIcons from 'assest/icon/Appicons';
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React, { useState } from 'react';
import BalanceModalBody from './BalanceModalBody';
import StripeBody from './StripeBody';
import useAppToast from 'functions/hooks/toast/useToast';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleRefetchShop: () => void;
}

export default function AddBalanceModal({ isOpen, onClose, handleRefetchShop }: Props) {
    const [paymentData, setPaymentData] = useState({ clientSecret: null, amount: 0 })
    const { showToast } = useAppToast()
    const handleSetPayment = (clientSecret: string, amount: number) => {
        setPaymentData({ clientSecret, amount })
    }
    const handleCancelPayment = () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
    }
    const handleSuccessPayment = async () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
        showToast({ message: "Payment confirmed! Your credit has been updated successfully", type: 'success' });
        handleRefetchShop()
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose: handleCancelPayment, isCentered: true, size: "lg" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title='Add Credit'
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.HeaderCreditCard />
                    </ModalHeaderIconWrapper>
                }
                description='Top up the account balance to pay for digital coupons, offers and monthly plan services.'
            />
            {paymentData.clientSecret ?
                <StripeBody paymentData={paymentData} handleCancelPayment={handleCancelPayment} handleSuccessPayment={handleSuccessPayment} />
                :
                <BalanceModalBody onClose={handleCancelPayment} handleSetPayment={handleSetPayment} />
            }
        </AppModal>
    )
}
