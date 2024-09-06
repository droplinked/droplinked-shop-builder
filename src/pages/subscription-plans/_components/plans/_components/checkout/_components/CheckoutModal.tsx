import AppModal from 'components/redesign/modal/AppModal';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { PropsWithChildren } from 'react';
import { ModalStep } from '../types/interfaces';

interface Props extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    currentStep: ModalStep;
    isFromPlansPage: boolean;
}

function CheckoutModal({ isOpen, onClose, currentStep, children, isFromPlansPage }: Props) {
    const { logoutUser } = useProfile()
    const isCloseable = !["FailedPayment", "SuccessfulPayment"].includes(currentStep)

    function closeModal() {
        if (!isCloseable) return
        if (isFromPlansPage && isCloseable) logoutUser()
        onClose()
    }

    return (
        <AppModal
            modalRootProps={{
                isOpen,
                onClose: closeModal,
                closeOnEsc: isCloseable,
                closeOnOverlayClick: isCloseable,
                size: "2xl",
                isCentered: true
            }}
            modalContentProps={{
                width: { base: "90%", md: "600px" },
                height: { base: "85vh", md: "95vh" }
            }}
        >
            {children}
        </AppModal>
    )
}

export default CheckoutModal