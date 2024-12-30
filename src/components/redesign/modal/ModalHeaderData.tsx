import { Flex, ModalCloseButton, ModalHeader, ModalHeaderProps, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
    icon?: ReactNode;
    backgroundColor?: string;
    title: string;
    description: string;
    modalHeaderProps?: ModalHeaderProps
}

function ModalHeaderData({ icon, title, description, backgroundColor, modalHeaderProps, children }: Props) {
    return (
        <ModalHeader
            {...backgroundColor && { backgroundColor: backgroundColor }}
            {...modalHeaderProps}
            css={{ p: { color: 'white' } }}
        >
            <Flex justifyContent="space-between">
                {icon ? icon : <Text fontSize={24} fontWeight={700}>{title}</Text>}
                <ModalCloseButton position="static" color="white" />
            </Flex>
            {icon && <Text mt={6} fontSize={24} fontWeight={700}>{title}</Text>}
            <Text mt={2} fontSize={16}>{description}</Text>
            {children}
        </ModalHeader>
    )
}

export default ModalHeaderData