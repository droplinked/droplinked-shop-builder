import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, StyleProps } from '@chakra-ui/react'
import React from 'react'
import AppTypography from '../typography/AppTypography'

export interface IAppModal {
    open: boolean
    close: any
    contentProps?: StyleProps
    title?: string
    [props: string]: any
}

function AppModal(props: IAppModal) {
    const { open, close, contentProps, title } = props
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
            <ModalContent bg="#1c1c1c" padding={"45px 30px"} {...contentProps}>
                <ModalBody>
                    {title && <Flex justifyContent={"center"} marginBottom={5}><AppTypography size="18px" weight="bolder" color={"#FFF"}>{title}</AppTypography></Flex>}
                    {props?.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AppModal