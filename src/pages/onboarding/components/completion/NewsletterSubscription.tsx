import { Box, Flex, Hide, Show, Switch, Text } from '@chakra-ui/react'
import { LetterLg } from 'assets/icons/System/Letter/LetterLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'

export default function NewsletterSubscription() {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const { t } = useLocaleResources('onboarding')

    const handleToggle = () => setIsSubscribed((prev) => !prev)

    return (
        <Flex
            marginBottom={6}
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
            gap={3}
            border="1px solid"
            borderColor="#292929"
            borderRadius={8}
            padding={{ base: 3, md: 4 }}
        >
            <Flex
                width="100%"
                justifyContent={{ base: 'space-between', md: 'flex-start' }}
                alignItems="center"
                gap={4}
            >
                <IconWrapper icon={<LetterLg color="#FFF" />} />

                <Show above="md">
                    <SubscriptionInfo />
                </Show>

                <Switch isChecked={isSubscribed} onChange={handleToggle} />
            </Flex>

            <Hide above="md">
                <SubscriptionInfo />
            </Hide>
        </Flex>
    )
}

function SubscriptionInfo() {
    const { t } = useLocaleResources('onboarding')
    return (
        <Box flex={1}>
            <Text color="white">{t('completion.newsletter.title')}</Text>
            <Text fontSize={14} color="#B1B1B1">
                {t('completion.newsletter.description')}
            </Text>
        </Box>
    )
}