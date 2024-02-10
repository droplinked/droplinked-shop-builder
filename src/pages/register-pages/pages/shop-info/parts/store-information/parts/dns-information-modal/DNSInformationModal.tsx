import { Flex } from '@chakra-ui/layout';
import ClipboardText from 'components/common/clipboardText/ClipboardText';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    isOpen: boolean;
    close: Function;
}

function DNSInformationModal({ isOpen, close }: Props) {
    return (
        <AppModal open={isOpen} close={close} isCentered={true} contentProps={{ padding: 8 }}>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize={"16px"} fontWeight={600} color={"#FFFFFF"}>DNS Information</AppTypography>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize={"14px"} color="#C2C2C2">DNS 1</AppTypography>
                    <Flex alignItems={"center"} gap="16px">
                        <AppTypography fontSize={"14px"} fontWeight={500} color="#FFFFFF">195.148.148.148</AppTypography>
                        <ClipboardText text='195.148.148.148' />
                    </Flex>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default DNSInformationModal