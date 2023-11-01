import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'

function AboutUs() {

    const data = [
        {
            title: "On- Chain Registration",
            description: "Streamlining cross-chain goods registration with customizable parameters and rules on your chosen blockchain.",
            borderColor: "#944BFB"
        },
        {
            title: "trustless settlement",
            description: "Establishing Immutable asset splits for stakeholders, ensuring transparent, secure transactions.",
            borderColor: "#7A66E2"
        },
        {
            title: "authenticated distribution",
            description: "Authorizing affiliates, partners, and properties for transparent cross-chain activity with versatile headless infrastructure.",
            borderColor: "#6080CA"
        },
        {
            title: "Collaboration Rewards",
            description: "Enhancing transparency, rewards, profitability, and intermediaries, ensuring fair revenues and efficiency.",
            borderColor: "#469AB1"
        }
    ]

    return (
        <>
            <Flex justifyContent="center" position="relative" padding={{ base: "110px 0", lg: "180px 0" }}>
                <Image src='/assets/images/homepage/ef1.png' position="absolute" top={{ base: "-100px", md: "-300px" }} right={{ base: "-200px", lg: "0" }} zIndex="0" />
                <Image src='/assets/images/homepage/ef2.png' width="800px" position="absolute" bottom="-300px" left="0" zIndex="0" />
                <VStack width="92%" maxWidth="1300px" align="stretch" position="relative" spacing={{ base: "15px", lg: "45px" }}>
                    <Box><AppTypography color="#FFF" size={{ base: "24px", sm: "32px" }} weight='bolder'>Why droplinked?</AppTypography></Box>
                    <VStack color="#C3C3C3" align="stretch">
                        <Box><AppTypography size={{ base: "16px", lg: "20px" }}>Droplinked is a cutting-edge decentralized commerce platform that allows individuals to create their own store and trade various products and services using non-fungible tokens (NFTs). With a strong foundation in decentralized inventory management and sales protocols, ensuring unparalleled transparency and immutability.</AppTypography></Box>
                        <Box><AppTypography size={{ base: "16px", lg: "20px" }}>The platform offers users the convenience of selling different types of products, including print-on-demand, digital, and physical goods and event tickets seamlessly. It provides a versatile experience for creators and entrepreneurs to showcase their offerings to a global audience.</AppTypography></Box>
                        <Box><AppTypography size={{ base: "16px", lg: "20px" }}>One standout feature of droplinked is its blockchain-based partnership terms. This innovative system allows trusted third parties to access the decentralized product listings and co-sell them. The partnership model prioritizes security, transparency, and operational efficiency.</AppTypography></Box>
                        <Box><AppTypography size={{ base: "16px", lg: "20px" }}>Droplinked represents a significant shift in decentralized commerce, enabling individuals to explore new opportunities, overcome geographical limitations, and engage in secure and efficient transactions. Its forward-thinking approach and advanced features position droplinked at the forefront of digital entrepreneurship and global trade.</AppTypography></Box>
                    </VStack>
                    <Flex flexWrap="wrap" justifyContent="space-between" color="#FFF">
                        {data.map((el, key) => (
                            <VStack width={{ base: "48%", md: "23%" }} marginBottom="20px" align="stretch" key={key} padding={{ base: "20px", sm: "40px 20px 90px 20px", xl: "40px 30px 90px 30px" }} border={`1px solid ${el.borderColor}`} borderRadius="18px" spacing="20px">
                                <AppTypography size={{ base: "18px", lg: "24px" }} weight='bolder'>{el.title}</AppTypography>
                                <AppTypography size="14px">{el.description}</AppTypography>
                            </VStack>
                        ))}
                    </Flex>
                </VStack>
            </Flex>
        </>
    )
}

export default AboutUs