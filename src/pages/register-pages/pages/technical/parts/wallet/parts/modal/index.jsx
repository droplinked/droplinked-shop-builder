import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import ModalWrapper from 'modals/modal-wrapper/ModalWrapper'
import React from 'react'
import walletModalClass from './model';
import { BlackBox } from 'pages/register-pages/RegisterPages-style';

function WalletModal({ open, close }) {
    return (
        <ModalWrapper show={open} close={close}>
            <VStack color="#FFF" align="stretch" spacing={8}>
                <Box textAlign="center">
                    <Text fontSize='2xl'><strong>Choose Your Wallet</strong></Text>
                </Box>
                <VStack align="stretch" spacing={4}>
                    {walletModalClass.listWallet().map((el, key) => (
                        <BlackBox padding={5} cursor="pointer" onClick={close}>
                            <HStack key={key} spacing={2}>
                                <Box><img src={el.icon} alt={el.title} /></Box>
                                <Box><Text fontSize='1xl'>{el.title}</Text></Box>
                            </HStack>
                        </BlackBox>
                    ))}
                </VStack>
            </VStack>
        </ModalWrapper>
    )
}

export default WalletModal