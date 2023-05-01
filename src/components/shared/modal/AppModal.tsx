import { Modal, ModalBody, ModalContent, ModalOverlay, StyleProps } from '@chakra-ui/react'
import React from 'react'

export interface IAppModal {
    open: boolean
    close: any
    contentProps?: StyleProps
    [props: string]: any
}

function AppModal(props: IAppModal) {
    const { open, close, contentProps } = props
    return (
        <Modal
            isOpen={open}
            onClose={close}
            motionPreset='slideInBottom'
            isCentered
            scrollBehavior="outside"
            {...props}
        >
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent bg="#1c1c1c" padding={"20px 0"} {...contentProps}>
                <ModalBody>
                    {props?.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AppModal