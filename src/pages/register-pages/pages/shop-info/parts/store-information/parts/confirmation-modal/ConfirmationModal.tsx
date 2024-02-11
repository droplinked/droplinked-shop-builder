import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { generateShopCustomURLService } from 'lib/apis/shop/shopServices';
import React from 'react';
import { useMutation } from 'react-query';

interface Props {
    isOpen: boolean;
    close: Function;
    enteredURL: string;
    refetch: Function;
}

function ConfirmationModal({ isOpen, close, enteredURL, refetch }: Props) {
    const { isLoading, mutateAsync } = useMutation((params: { domain: string }) => generateShopCustomURLService(params))
    const { showToast } = useAppToast()

    const generateShopCustomURL = async () => {
        try {
            await mutateAsync({ domain: enteredURL })
            showToast({ message: "The entered URL has been set as your shop’s custom URL", type: "success" })
            await refetch()
            close()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <AppModal open={isOpen} close={close} size="xl" isCentered={true} contentProps={{ padding: 8 }}>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize={"16px"} fontWeight={600} color={"#FFFFFF"}>Add custom URL</AppTypography>
                <AppTypography fontSize="14px" fontWeight={400} color={"#FFFFFF"}>
                    You are about to set <Box as='span' fontWeight={600}>{enteredURL}</Box> for your shop’s custom URL.
                    Be aware that you will have to contact support to make changes.
                    <br />
                    Do you want to proceed?
                </AppTypography>
                <Flex alignItems="center" gap="16px" justifyContent="flex-end">
                    <BasicButton sizes='medium' variant="outline" onClick={() => close()}>No</BasicButton>
                    <BasicButton sizes='medium' isLoading={isLoading} isDisabled={isLoading} onClick={generateShopCustomURL}>
                        Yes, The entered URL is correct
                    </BasicButton>
                </Flex>
            </Flex>
        </AppModal >
    )
}

export default ConfirmationModal