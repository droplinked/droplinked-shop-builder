import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'

function GreetingBanner() {
    const { t } = useLocaleResources("dashboardPage")
    const { shop } = useAppStore()

    // Function to get the appropriate greeting based on the time of day
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) return t('GreetingBanner.goodMorning')
        else if (hour >= 12 && hour < 18) return t('GreetingBanner.goodAfternoon')
        else return t('GreetingBanner.goodNight')
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
                {t('GreetingBanner.welcomeMessage')}
            </Text>
        </Flex>
    )
}

export default GreetingBanner