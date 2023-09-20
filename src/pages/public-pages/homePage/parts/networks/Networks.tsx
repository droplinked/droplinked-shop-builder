import { Box, Flex, Image, Show, VStack } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import NetworkLayers from './parts/layers/NetworkLayers'

function Networks() {
    return (
        <Flex justifyContent="center" alignItems="center" padding="50px 0">
            <VStack width="95%" justifyContent="center" color="#FFF">
                <Box><LandingTitle title='Decentralized Affiliate Network' /></Box>
                <Box padding="10px 0 30px 0"><LandingDescription text='peer-to-peer partnerships and smart contract revolutionizing affiliate marketing by providing autonomy and efficiency for everyone involved.' /></Box>
                <Flex width="95%" justifyContent="center" position="relative">
                    <Show above='lg'><Image src='assets/images/homepage/networks.png' width="100%" /></Show>
                    <Show below='lg'><NetworkLayers /></Show>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Networks