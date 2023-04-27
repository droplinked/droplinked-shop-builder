import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function AppModal({ open, close, children, contentProps, ...params }) {
    return (
        <Modal
            isOpen={open}
            onClose={close}
            motionPreset='slideInBottom'
            isCentered
            scrollBehavior="outside"
            {...params}
        >
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent bg="#1c1c1c" padding={"20px 0"} {...contentProps}>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AppModal