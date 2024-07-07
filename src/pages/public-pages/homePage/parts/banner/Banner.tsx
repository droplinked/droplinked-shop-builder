import { Box, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import useHookStore from 'functions/hooks/store/useHookStore'
import React from 'react'
import Typewriter from 'typewriter-effect'
import { MODAL_TYPE } from '../../HomePage'
import Droplinked from './parts/droplinked/Droplinked'

function Banner() {
    const { app: { shop } } = useHookStore();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box height={"100dvh"} position="relative">
                <Flex height="100%" justifyContent="center" alignItems="center" position="relative" zIndex="2">
                    <VStack justifyContent="center" color="#fff">
                        <Droplinked />
                        <AppTypography textAlign={"center"} fontSize={{ base: "20px", sm: "24px", lg: "32px", xl: "48px" }} fontWeight='bold'>The Next Generation of Commerce</AppTypography>
                        <Text fontSize={{ base: "14px", sm: "24px", xl: "34px" }} display="flex">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Build a Customizable Store',
                                        'Sell Diverse Products',
                                        'Token Gating Collections',
                                        'Mint to Merch',
                                        'Decentralize Inventory',
                                        'Sales Tracking',
                                        'Transparent Co-selling',
                                        'Increase Earnings'
                                    ],
                                    cursor: '',
                                    autoStart: true,
                                    loop: true
                                }}
                            /> | On-Chain
                        </Text>
                        <BasicButton onClick={onOpen} minWidth={{ base: "120px", sm: "160px" }} height={{ base: "32px", sm: "40px" }}>
                            <AppTypography fontSize={{ base: "12px", sm: "16px" }} fontWeight={600}>Start Selling</AppTypography>
                        </BasicButton>
                    </VStack>
                </Flex>
            </Box>
            {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} shopName={shop?.name} close={onClose} />}
        </>
    )
}

export default Banner