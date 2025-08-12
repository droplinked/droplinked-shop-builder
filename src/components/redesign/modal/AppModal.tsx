import { Modal, ModalContent, ModalContentProps, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

/**
 * A styled modal component with customizable content and overlay
 * 
 * @param {object} props - Component props
 * @param {Omit<ModalProps, "children">} props.modalRootProps - Props for the modal root component
 * @param {ModalContentProps} [props.modalContentProps] - Props for the modal content wrapper
 * @param {ReactNode} props.children - Modal content (typically ModalHeader, ModalBody, ModalFooter)
 * 
 * @returns {JSX.Element} Styled modal component
 */
interface Props extends PropsWithChildren {
    modalRootProps: Omit<ModalProps, "children">;
    modalContentProps?: ModalContentProps;
}

function AppModal({ modalRootProps, modalContentProps, children }: Props) {
    return (
        <Modal {...modalRootProps}>
            <ModalOverlay bg="rgba(0,0,0,.9)" />
            <ModalContent
                display="flex"
                flexDirection="column"
                gap={{ lg: 12, md: 8, base: 4 }}
                margin={4}
                box-shadow="0px 0px 20px 0px #00000033"
                borderRadius={24}
                paddingBlock={{ lg: 12, md: 8, base: 4 }}
                bg="neutral.gray.1000"
                overflow="hidden"
                sx={{
                    "header , footer , .chakra-modal__body": {
                        paddingBlock: 0,
                        paddingInline: { lg: 12, md: 8, base: 4 }
                    },
                    ".chakra-modal__body": { flex: 1, overflow: "auto" }
                }}
                {...modalContentProps}
            >
                {children}
            </ModalContent>
        </Modal>
    )
}

export default AppModal