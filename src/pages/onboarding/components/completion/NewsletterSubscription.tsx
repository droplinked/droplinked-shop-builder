import { Box, Flex, Switch, Text } from '@chakra-ui/react'
import { LetterLg } from 'assets/icons/System/Letter/LetterLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { useState } from 'react'

function NewsletterSubscription() {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

    const handleToggle = () => setIsSubscribed((prev) => !prev)

    return (
        <Flex
            marginBottom={6}
            alignItems="center"
            gap={4}
            border="1px solid"
            borderColor="#292929"
            borderRadius={8}
            p={4}
        >
            <IconWrapper icon={<LetterLg color='#FFF' />} />

            <Box flex={1}>
                <Text color="white">Newsletter Subscription</Text>
                <Text fontSize={14} color="#B1B1B1">
                    Stay up to date on the latest features and offers
                </Text>
            </Box>

            <Switch
                isChecked={isSubscribed}
                onChange={handleToggle}
            />
        </Flex>
    )
}

export default NewsletterSubscription