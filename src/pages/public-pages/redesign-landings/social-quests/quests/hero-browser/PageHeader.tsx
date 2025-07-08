import { Flex, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import useAppStore from 'stores/app/appStore';

export default function PageHeader() {
    const { isLoggedIn } = useAppStore();
    const description = isLoggedIn ? 'Complete Everything Below to Unlock Level 1 Membership' : 'Register to qualify';

    return (
        <Flex justifyContent="space-between" alignItems="start" padding={6}>
            <Flex flexDirection="column" gap={1}>
                <Text fontSize={18} fontWeight={500} color="text.white">Hi There 👋</Text>
                <Text fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>
            </Flex>
            <AppButton>
                {isLoggedIn ? 'Activate Account' : 'Get Started'}
            </AppButton>
        </Flex>
    )
}
