import { Flex, ModalCloseButton, ModalHeader, ModalHeaderProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { ReactNode } from 'react';

interface Props {
    icon?: ReactNode;
    backgroundColor?: string;
    title: string;
    description: string;
    modalHeaderProps?: ModalHeaderProps
}

function ModalHeaderData({ icon, title, description, backgroundColor }: Props) {
    return (
        <ModalHeader {...backgroundColor && { backgroundColor: backgroundColor }}>
            <Flex justifyContent={"space-between"}>
                {icon ? icon : <AppTypography fontSize={24} fontWeight={700} color={"white"}>{title}</AppTypography>}
                <ModalCloseButton
                    width={"fit-content"}
                    height={"fit-content"}
                    position={"relative"}
                    color={"white"}
                />
            </Flex>
            {icon && <AppTypography mt={6} fontSize={24} fontWeight={700} color={"white"}>{title}</AppTypography>}
            <AppTypography mt={2} fontSize={16} color={"white"}>{description}</AppTypography>
        </ModalHeader>
    )
}

export default ModalHeaderData