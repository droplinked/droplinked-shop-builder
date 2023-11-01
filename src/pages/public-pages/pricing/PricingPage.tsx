import { Image } from '@chakra-ui/image'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function PricingPage() {
    const itemsPlanA = [
        "Advanced token gating",
        "Collaborate with creators",
        "Brand revenue sharing",
        "Dedicated account managment",
        "%10 of profits earned from sales",
        "Sell both digital and physical goods",
        "Smart product listing technology",
        (
            <p>
                Limited token gating functionality
                <br />
                (discounts, loyalty programs, etc)
            </p>
        ),
    ]

    const itemsPlanB = [
        "White labeled customizable shopfront",
        "Collaborate with other shops and publishers",
        "Headless embeddable products and collections",
        "DIMST enterprise console access for on-chain inventory management",
        "Customize Your platform stack with web3 commerce infrastructure and on-chain attribution",
    ]

    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11C0 4.9054 4.9054 0 11 0C17.0946 0 22 5.05406 22 11.1487V22H11C4.9054 22 0 17.0946 0 11Z" fill="#2BCFA1" />
    </svg>

    return (
        <>
            <Flex justifyContent="center" position="relative">
                <Image src='/assets/images/homepage/ef1.png' position="absolute" top={{ base: "-100px", md: "-300px" }} right={{ base: "-200px", lg: "0" }} zIndex="0" />
                <Image src='/assets/images/homepage/ef2.png' width="800px" position="absolute" bottom="-300px" left="0" zIndex="0" />
                <Flex padding="150px 0 100px 0" position="relative" zIndex={1} flexDirection={{ base: "column", sm: "row" }} color="#C2C2C2" width="95%" gap={{ base: "20px", lg: "48px" }} maxWidth="1200px">

                    <VStack align="stretch" spacing={{ base: "10px", sm: "20px" }} width={{ base: "100%", sm: "50%" }} border="1px solid #6080CA" borderRadius="18px" padding={{ base: "30px 20px", md: "56px 48px" }}>
                        <AppTypography size={{ base: "18px", sm: "24px" }} weight='bolder' color="#FFF">Pro</AppTypography>
                        <Flex alignItems="center" gap="14px">
                            <AppTypography size={{ base: "28px", sm: "40px" }} weight='bolder' color="#FFF">$20</AppTypography>
                            <AppTypography size="16px">/ monthly</AppTypography>
                        </Flex>
                        <VStack align="stretch" spacing="24px" paddingTop={{ base: "0", sm: "40px" }}>
                            {itemsPlanA.map((el, key) => (
                                <Flex gap="12px" alignItems="center">
                                    <Box width="22px">{icon}</Box>
                                    <AppTypography key={key} size="14px">{el}</AppTypography>
                                </Flex>
                            ))}
                        </VStack>
                    </VStack>

                    <VStack align="stretch" spacing={{ base: "10px", sm: "20px" }} width={{ base: "100%", sm: "50%" }} border="1px solid #6080CA" borderRadius="18px" padding={{ base: "30px 20px", md: "56px 48px" }}>
                        <AppTypography size="24px" weight='bolder' color="#FFF">Enterprise</AppTypography>
                        <AppTypography size={{ base: "28px", sm: "40px" }} weight='bolder' color="#FFF">Custom</AppTypography>
                        <AppTypography size={{ base: "14px", sm: "16px" }} color="#FFF">Leverage the full power of droplinked (everything included in the Pro plan + the below)</AppTypography>
                        <VStack align="stretch" spacing="24px" paddingTop={{ base: "10px", sm: "40px" }}>
                            {itemsPlanB.map((el, key) => (
                                <Flex gap="12px" alignItems="center">
                                    <Box width="22px">{icon}</Box>
                                    <AppTypography key={key} size="14px">{el}</AppTypography>
                                </Flex>
                            ))}
                        </VStack>
                    </VStack>

                </Flex>
            </Flex>
        </>
    )
}

export default PricingPage