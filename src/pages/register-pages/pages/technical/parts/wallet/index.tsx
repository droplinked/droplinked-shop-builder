import { Box, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import classes from './style.module.scss'
import moreIcon from "assest/icon/more-icon.svg";
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppIcons from 'assest/icon/Appicons';
import AppCard from 'components/common/card/AppCard';
import { useQuery } from 'react-query';
import { supportedChainsService } from 'lib/apis/sku/services';
import useAppWeb3 from 'functions/hooks/web3/useWeb3';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import AppTypography from 'components/common/typography/AppTypography';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import ClipboardText from 'components/common/clipboardText/ClipboardText';

function Wallet() {
    const { data, isLoading } = useQuery({
        queryFn: supportedChainsService,
        queryKey: "supported_chains",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { getChain, login } = useAppWeb3()
    const { showToast } = useAppToast()

    const loginChain = useCallback(async (chain: string) => {
        try {
            await login(chain)
        } catch (error) {
            showToast('Failed login', 'warning')
        }
    }, [])

    return (
        <AppCard>
            <VStack spacing={3} align='stretch'>
                <Box><FieldLabel label='Connected Wallets' textProps={{ size: "18px", weight: "bolder" }} isRequired /></Box>
                <VStack align="stretch" spacing="8px">
                    {data?.data?.data ? data?.data?.data.map((el, key) => {
                        const isExist = getChain(el)
                        return (
                            <Flex backgroundColor="#141414" height="55px" padding="0 18px" key={key} alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                                <HStack alignItems="center">
                                    <IconBlockchain props={{ width: "18px", height: "18px" }} blockchain={el} />
                                    <AppTypography size="12px" color="lightGray">{capitalizeFirstLetter(el)}</AppTypography>
                                </HStack>
                                <Box>
                                    {isExist ? (
                                        <Flex gap="10px" alignItems="center">
                                            <AppTypography size="12px">{`${isExist?.address.substring(0, 6)}....${isExist?.address.substring(isExist?.address.length - 6)}`}</AppTypography>
                                            <ClipboardText props={{ width: "16px", height: "16px" }} text={isExist?.address} />
                                        </Flex>
                                    ) : (
                                        <BasicButton sizes='medium' onClick={() => loginChain(el)}>Connect</BasicButton>
                                    )}
                                </Box>
                            </Flex>
                        )
                    }) : null}
                </VStack>
            </VStack>
        </AppCard>
    )
}

export default Wallet