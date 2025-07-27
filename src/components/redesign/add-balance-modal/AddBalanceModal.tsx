import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import DroplinkedPaymentForm from 'components/redesign/payment/DroplinkedPaymentForm';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useState } from 'react';
import BalanceModalBody from './BalanceModalBody';

/**
 * AddBalanceModal Component - Modal for adding credit to account
 * 
 * Provides a two-step flow for adding balance: first selecting amount,
 * then completing payment via Stripe integration.
 * 
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Controls whether the modal is visible
 * @param {function} props.onClose - Callback function to close the modal
 * @param {function} props.handleRefetch - Callback to refresh data after successful payment
 */
interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleRefetch: () => void;
}

export default function AddBalanceModal({ isOpen, onClose, handleRefetch }: Props) {
    const [paymentData, setPaymentData] = useState({ clientSecret: null, amount: 0 })
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("common")

    const handleSetPayment = (clientSecret: string, amount: number) => setPaymentData({ clientSecret, amount })

    const handleCancelPayment = () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
    }

    const handleSuccessPayment = async () => {
        onClose()
        setPaymentData({ clientSecret: null, amount: null })
        showToast({ message: t("AddBalanceModal.paymentConfirmed"), type: 'success' });
        handleRefetch()
    }

    const handleError = (error: any) => {
        console.error("Payment failed:", error);
        showToast({ message: t("AddBalanceModal.paymentFailed"), type: 'error' });
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose: handleCancelPayment, isCentered: true, size: "lg" }} modalContentProps={{ gap: 0, paddingBlock: 0, paddingBottom: "48px" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
                title={t("AddBalanceModal.title")}
                icon={<AppIcons.HeaderCreditCard />}
                description={t("AddBalanceModal.description")}
            />
            {paymentData.clientSecret ? (
                <ModalBody px={{ base: 4, md: 8 }} py={4}>
                    <DroplinkedPaymentForm
                        intentType="payment"
                        clientSecret={paymentData.clientSecret}
                        onSuccess={handleSuccessPayment}
                        onError={handleError}
                        onCancel={handleCancelPayment}
                    />
                </ModalBody>
            ) : (
                <BalanceModalBody onClose={handleCancelPayment} handleSetPayment={handleSetPayment} />
            )}
        </AppModal>
    )
}
