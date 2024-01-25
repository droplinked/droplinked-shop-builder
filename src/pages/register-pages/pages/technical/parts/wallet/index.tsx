import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppCard from 'components/common/card/AppCard';
import ClipboardText from 'components/common/clipboardText/ClipboardText';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppTypography from 'components/common/typography/AppTypography';
import useStack from 'functions/hooks/stack/useStack';
import useHookStore from 'functions/hooks/store/useHookStore';
import useAppToast from 'functions/hooks/toast/useToast';
import useAppWeb3 from 'functions/hooks/web3/useWeb3';
import { supportedChainsService } from 'lib/apis/sku/services';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';

function Wallet() {
    const { data, isLoading } = useQuery({
        queryFn: supportedChainsService,
        queryKey: "supported_chains",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { getChain, login } = useAppWeb3()
    const { showToast } = useAppToast()
    const { app: { user: { wallets } } } = useHookStore()
    const stack = useStack()

    const loginChain = useCallback(async (chain: string) => {
        try {
            await login({ chain, wallets, stack })
        } catch (error) {
            showToast({ message: error || 'Failed login', type: 'warning' })
        }
    }, [wallets, stack.stxAddress])

    return (
        <AppCard>
            <VStack spacing={3} align='stretch'>
                <Box><FieldLabel label='Connected Wallets' textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired /></Box>
                <VStack align="stretch" spacing="8px">
                    {data?.data?.data ? data?.data?.data.map((el, key) => {
                        const isExist = getChain({ chain: el, wallets })
                        return (
                            <Flex backgroundColor="#141414" height="55px" padding="0 18px" key={key} alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                                <HStack alignItems="center">
                                    <BlockchainDisplay show='icon' props={{ width: "18px", height: "18px" }} blockchain={el} />
                                    <AppTypography fontSize="12px" color="lightGray"><BlockchainDisplay show='name' blockchain={el} /></AppTypography>
                                </HStack>
                                <Box>
                                    {isExist ? (
                                        <Flex gap="10px" alignItems="center">
                                            <AppTypography fontSize="12px">{`${isExist?.address.substring(0, 6)}....${isExist?.address.substring(isExist?.address.length - 6)}`}</AppTypography>
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