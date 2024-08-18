import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
}

function CheckoutModalTemplate({ isOpen, onClose, children }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"} closeOnOverlayClick={false} closeOnEsc={false} isCentered>
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent
                height={"85dvh"}
                margin={{ base: 4 }}
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