import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function NetworkLayers() {

    const data = [
        {
            image: '/assets/images/homepage/layers/Rectangle12.png',
            title: 'Simplified Storefront',
            description: 'No code tools to have your storefront with a few clicks'
        },
        {
            image: '/assets/images/homepage/layers/Rectangle93.png',
            title: 'Commercial API’s',
            description: 'Infinite modifiability with the power of white label APIs'
        },
        {
            image: '/assets/images/homepage/layers/Rectangled.png',
            title: 'Third-Party Service integrator',
            description: 'Tap into the power of the network by using or offering services to stores and communities'
        },
        {
            image: '/assets/images/homepage/layers/Rectangle91.png',
            title: 'Enable web3 functionality',
            description: 'Use the latest technologies within your existing stack such as token gating, NFT discounts and more with cross-chain capabilities'
        },
        {
            image: '/assets/images/homepage/layers/Rectangle923.png',
            title: 'The droplinked Smart Contract',
            description: 'Automate transparency, reliability and control of inventory on-chain with your community'
        },
    ]

    return (
        <Flex justifyContent="center">
            <VStack align="stretch" spacing="20px" width="80%">
                {data.map((el, key) => (
                    <Flex key={key} gap="15px">
                        <Box width="100px"><Image src={el.image} width="100%" /></Box>
                        <VStack width="100%" align="stretch">
                            <AppTypography fontSize={{ base: "12px", md: "16px" }} fontWeight='bold'>{el.title}</AppTypography>
                            <AppTypography fontSize={{ base: "12px", md: "16px" }} color="#666">{el.description}</AppTypography>
                        </VStack>
                    </Flex>
                ))}
            </VStack>
        </Flex>
    )
}

export default NetworkLayers