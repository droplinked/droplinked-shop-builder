import { Box, Flex, Image, Text, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import useHookStore from 'functions/hooks/store/useHookStore'
import React from 'react'
import Typewriter from 'typewriter-effect'
import Droplinked from './parts/droplinked/Droplinked'

function Banner() {
    const { app: { shop } } = useHookStore();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box position="relative">
                <Image src="assets/images/homepage/droplinked1.svg" position="absolute" zIndex="1" top="-200px" width="100%" />
                <Flex height="100%" justifyContent="center" alignItems="center" position="relative" zIndex="2">
                    <VStack justifyContent="center" color="#FFF">
                        <Droplinked />
                        <Box textAlign="center" padding="0 20px"><AppTypography fontSize={{ base: "20px", sm: "25px", lg: "30px", xl: "50px" }} fontWeight='bold' whiteSpace={"nowrap"}>The Next Generation of Commerce</AppTypography></Box>
                        <Box padding="10px 0 30px 0">
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
                        </Box>
                        <Box>
                            <BasicButton onClick={onOpen} minWidth={{ base: "120px", sm: "160px" }} height={{ base: "32px", sm: "40px" }}>
                                <AppTypography fontSize={{ base: "12px", sm: "16px" }}>Start Selling</AppTypography>
                            </BasicButton>
                        </Box>
                    </VStack>
                </Flex>
            </Box>
            {isOpen && <AuthModal show={isOpen} type="SIGNUP" shopName={shop?.name} close={onClose} />}
        </>
    )
}

export default Banner