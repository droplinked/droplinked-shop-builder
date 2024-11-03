import { Flex, ModalCloseButton, ModalHeader, ModalHeaderProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
    icon: ReactNode;
    title: string;
    description: string;
    modalHeaderProps?: ModalHeaderProps
}

function ModalHeaderData({ icon, title, description, modalHeaderProps, children }: Props) {
    return (
        <ModalHeader {...modalHeaderProps}>
            <Flex justifyContent="space-between">
                {icon}
                <ModalCloseButton width="fit-content" height="fit-content" position="relative" color="white" />
            </Flex>
            <AppTypography mt={6} fontSize={24} fontWeight={700} color="white">{title}</AppTypography>
            <AppTypography mt={2} fontSize={16} color="white">{description}</AppTypography>
            {children}
        </ModalHeader>
    )
}

export default ModalHeaderData