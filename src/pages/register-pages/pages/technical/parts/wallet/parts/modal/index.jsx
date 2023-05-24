import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import walletModalClass from './model';
import { BlackBox } from 'pages/register-pages/RegisterPages-style';
import AppModal from 'common/modal/AppModal';
import AppTypography from 'common/typography/AppTypography';

function WalletModal({ open, close }) {
    return (
        <AppModal open={open} close={close}>
            <VStack color="#FFF" align="stretch" spacing={8}>
                <Box textAlign="center">
                    <AppTypography size='18px' weight='bolder'>Choose Your Wallet</AppTypography>
                </Box>
                <VStack align="stretch" spacing={4}>
                    {walletModalClass.listWallet().map((el, key) => (
                        <BlackBox padding={5} key={key} cursor="pointer" onClick={close}>
                            <HStack spacing={2}>
                                <Box>{el.icon}</Box>
                                <Box><Text fontSize='1xl'>{el.title}</Text></Box>
                            </HStack>
                        </BlackBox>
                    ))}
                </VStack>
            </VStack>
        </AppModal>
    )
}

export default WalletModal