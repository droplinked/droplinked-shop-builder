import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'

function GreetingBanner() {
    const { shop } = useAppStore()

    // Function to get the appropriate greeting based on the time of day
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) return 'Good Morning'
        else if (hour >= 12 && hour < 18) return 'Good Afternoon'
        else return 'Good Night'
    }

    return (
        <Flex direction="column" gap={2}>
            <Heading
                as="h3"
                display="flex"
                alignItems="center"
                gap={2}
                fontSize={{ base: 24, xl: 28 }}
                fontWeight={400}
                color="text.white"
            >
                {getGreeting()},
                <Box as="span" fontWeight={700}>{shop.name}</Box>
                👋
            </Heading>
            <Text fontSize={{ base: 14, xl: 16 }} color="text.subtext.placeholder.light">
                Whether launching a first product or creating a storefront experience for customers, we've got all the tools you need.
            </Text>
        </Flex>
    )
}

export default GreetingBanner