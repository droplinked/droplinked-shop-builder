import AppIcons from 'assets/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useState } from 'react';
import BalanceModalBody from './BalanceModalBody';
import StripeBody from './StripeBody';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleRefetch: () => void;
}

export default function AddBalanceModal({ isOpen, onClose, handleRefetch }: Props) {
    const [paymentData, setPaymentData] = useState({ clientSecret: null, amount: 0 })
    const { showToast } = useAppToast()

    const handleSetPayment = (clientSecret: string, amount: number) => setPaymentData({ clientSecret, amount })

    const handleCancelPayment = () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
    }

    const handleSuccessPayment = async () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
        showToast({ message: "Payment confirmed! Your credit has been updated successfully", type: 'success' });
        handleRefetch()
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose: handleCancelPayment, isCentered: true, size: "lg" }} modalContentProps={{ gap: 0, paddingBlock: 0, paddingBottom: "48px" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
                descriptionProps={{
                    color: "#B1B1B1 !important"
                }}
                title='Add Credit'
                icon={<AppIcons.HeaderCreditCard />}
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
