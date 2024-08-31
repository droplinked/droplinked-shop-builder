import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { PropsWithChildren } from 'react';
import { ModalStep } from '../types/interfaces';

interface Props extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    currentStep: ModalStep;
    isFromPlansPage: boolean;
}

function CheckoutModalTemplate({ isOpen, onClose, currentStep, children, isFromPlansPage }: Props) {
    const { logoutUser } = useProfile()
    const isCloseable = !["FailedPayment", "SuccessfulPayment"].includes(currentStep)

    function closeModal() {
        if (!isCloseable) return
        if (isFromPlansPage && isCloseable) logoutUser()
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            size={"2xl"}
            closeOnOverlayClick={isCloseable}
            closeOnEsc={isCloseable}
            isCentered
        >
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent
                width={{ base: "90%", md: "600px" }}
                height={{ base: "85vh", md: "95vh" }}
                margin={{ base: 4, md: "auto" }}
                box-shadow={"0px 0px 20px 0px #00000033"}
                borderRadius={24}
                padding={0}
                bg={"#222222"}
                sx={{
                    "header": { padding: { lg: 12, md: 8, base: 4 } },
                    ".chakra-modal__body": { flex: 1, paddingInline: { lg: 12, md: 8, base: 4 }, overflow: "auto" },
                    "footer": { padding: { lg: 12, md: 8, base: 4 } }
                }}
            >
                {children}
            </ModalContent>
        </Modal>
    )
}

export default CheckoutModalTemplate