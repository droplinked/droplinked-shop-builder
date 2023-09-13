import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function Community() {
    return (
        <Flex justifyContent="center" >
            <Flex width="95%" maxWidth="1200px" alignItems="center" gap="30px">
                <Box width="60%"><Image src='assets/images/homepage/ConnectionsAnimation.png' width="100%" /></Box>
                <VStack width="40%" align="stretch" marginTop="20px">
                    <Box><AppTypography size='34px' weight='bolder'>Community Driven Commerce</AppTypography></Box>
                    <Box><AppTypography size='20px' color="#888">Launch your drop on blockchain to gain proof of ownership and seamless transfer capabilities as a member of our decentralized community</AppTypography></Box>
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Community