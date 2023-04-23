import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function AppModal({ open, close, children, contentProps, ...params }) {
    return (
        <Modal
            isOpen={open}
            onClose={close}
            motionPreset='slideInBottom'
            isCentered
            scrollBehavior="inside"
            {...params}
        >
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent bg="#222" padding={"20px 0"} {...contentProps}>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AppModal