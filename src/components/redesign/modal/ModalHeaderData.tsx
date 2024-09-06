import { Flex, ModalCloseButton } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    title: string;
    description: string;
}

function ModalHeaderData({ icon, title, description }: Props) {
    return (
        <>
            <Flex justifyContent={"space-between"}>
                {icon}
                <ModalCloseButton
                    width={"fit-content"}
                    height={"fit-content"}
                    position={"relative"}
                    color={"white"}
                />
            </Flex>
            <AppTypography mt={6} fontSize={24} fontWeight={700} color={"white"}>{title}</AppTypography>
            <AppTypography mt={2} fontSize={16} color={"white"}>{description}</AppTypography>
        </>
    )
}

export default ModalHeaderData