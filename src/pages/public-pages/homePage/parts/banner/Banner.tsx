import { Flex, Heading, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import Droplinked from './parts/droplinked/Droplinked'

function Banner() {
    const navigate = useNavigate()

    const handleStartSelling = () => navigate("/onboarding?entry=signup")

    function renderTypewriterContent() {
        const typewriterOptions = {
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
        }

        return (
            <AppTypography fontSize={{ base: "10px", sm: "20px", xl: "34px" }} display="flex">
                <Typewriter options={typewriterOptions} /> | Onchain
            </AppTypography>
        )
    }

    return (
        <Flex
            height="100dvh"
            justifyContent="center"
            alignItems="center"
            position="relative"
            zIndex="2"
        >
            <VStack justifyContent="center" color="#fff" spacing={4}>
                <Droplinked />

                <Heading
                    as="h2"
                    textAlign="center"
                    fontSize={{ base: "20px", sm: "24px", lg: "32px", xl: "48px" }}
                >
                    The Next Generation of Commerce
                </Heading>

                {renderTypewriterContent()}

                <BasicButton
                    minWidth={{ base: "120px", sm: "160px" }}
                    height={{ base: "32px", sm: "40px" }}
                    fontSize={{ base: "12px", sm: "16px" }}
                    fontWeight={600}
                    onClick={handleStartSelling}
                >
                    Start Selling
                </BasicButton>
            </VStack>
        </Flex>
    )
}

export default Banner