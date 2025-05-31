import AppModal from 'components/redesign/modal/AppModal';
import React, { PropsWithChildren } from 'react';
import { ModalStep } from '../types/interfaces';

interface Props extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    currentStep: ModalStep;
}

function CheckoutModal({ isOpen, onClose, currentStep, children }: Props) {
    const isCloseable = !["FailedPayment", "SuccessfulPayment"].includes(currentStep)

    function closeModal() {
        if (!isCloseable) return
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