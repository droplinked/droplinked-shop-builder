import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, ModalProps, StyleProps } from '@chakra-ui/react'
import React from 'react'
import AppTypography from '../typography/AppTypography'

export interface IAppModal extends Omit<ModalProps, "isOpen" | "onClose">{
    open: boolean
    close: any
    contentProps?: StyleProps
    title?: string
    
}

function AppModal({open, close, contentProps, title, ...props}: IAppModal) {
    return (
        <Modal
            isOpen={open}
            onClose={close}
            motionPreset='slideInBottom'
            isCentered
            scrollBehavior="outside"
            size={props?.size || "lg"}
            {...props}
        >
            <ModalOverlay bg={"rgba(0,0,0,.9)"} />
            <ModalContent bg="#1c1c1c" padding={"45px 30px"} zIndex={10000} {...contentProps}>
                <ModalBody>
                    {title && <Flex justifyContent={"center"} marginBottom={5}><AppTypography fontSize="18px" fontWeight="bold" color={"#FFF"}>{title}</AppTypography></Flex>}
                    {props?.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AppModal