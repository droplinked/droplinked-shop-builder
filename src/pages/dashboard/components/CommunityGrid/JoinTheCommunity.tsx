import { GridItem, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function JoinTheCommunity() {
    return (
        <GridItem padding={{ base: 4, lg: 6 }}>
            <Heading mb={1} fontSize={20} fontWeight={700} color="white">
                Join the Community!
            </Heading>
            <Text color="#7B7B7B">
                Follow us across our channels to get the latest news and exclusive offers.
            </Text>
        </GridItem>
    )
}

export default JoinTheCommunity