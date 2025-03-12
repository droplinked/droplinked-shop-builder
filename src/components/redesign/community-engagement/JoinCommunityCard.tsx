import { GridItem, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function JoinCommunityCard() {
    return (
        <GridItem padding={{ base: 4, lg: 6 }}>
            <Heading mb={1} fontSize={20} fontWeight={700} color="white">
                Join the Community!
            </Heading>
            <Text color="text.subtextPlaceholder.dark">
                Follow us across our channels to get the latest news and exclusive offers.
            </Text>
        </GridItem>
    )
}

export default JoinCommunityCard