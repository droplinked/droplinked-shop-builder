import { Modal, ModalContent, ModalContentProps, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
    modalRootProps: Omit<ModalProps, "children">;
    modalContentProps?: ModalContentProps;
    children: ReactNode
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
                bg="#1C1C1C"
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