import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    isOpen: boolean;
    close: Function;
}

function ConfirmationModal({ isOpen, close }: Props) {
    return (
        <AppModal open={isOpen} close={close} size="xl" isCentered={true} contentProps={{ padding: 8 }}>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize={"16px"} fontWeight={600} color={"#FFFFFF"}>Add custom URL</AppTypography>
                <AppTypography fontSize="14px" fontWeight={400} color={"#FFFFFF"}>
                    You are about to set Domain.com for your shop’s custom URL.
                    Be aware that you will have to contact support to make changes.
                    <br />
                    Do you want to proceed?
                </AppTypography>
                <Flex alignItems="center" gap="16px" justifyContent="flex-end">
                    <BasicButton sizes='medium' variant="outline" onClick={() => close()}>No</BasicButton>
                    <BasicButton sizes='medium' onClick={() => close()}>Yes, The entered URL is correct</BasicButton>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default ConfirmationModal