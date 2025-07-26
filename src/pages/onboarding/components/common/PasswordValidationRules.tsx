import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { CheckMd } from 'assets/icons/Sign/Check/CheckMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { getPasswordRules } from 'pages/onboarding/utils/passwordRules'
import React from 'react'

interface PasswordRuleProps {
    isValid: boolean
    text: string
}

function PasswordRule({ isValid, text }: PasswordRuleProps) {
    return (
        <Flex alignItems="center" gap={1}>
            <CheckMd color={isValid ? "#2BCFA1" : "#7B7B7B"} />
            <Text
                fontSize={14}
                color={isValid ? "#2BCFA1" : "#7B7B7B"}
                textDecoration={isValid ? "line-through" : "none"}
            >
                {text}
            </Text>
        </Flex>
    )
}

export default function PasswordValidationRules({ password }: { password: string }) {
    const { t } = useLocaleResources('onboarding')
    const rules = getPasswordRules(t).map(rule => ({
        text: rule.text,
        isValid: typeof rule.regex === 'function' ? rule.regex(password) : rule.regex.test(password)
    }))

    return (
        <SimpleGrid columns={2} gap={2}>
            {rules.map((rule) => (
                <PasswordRule key={rule.text} text={rule.text} isValid={rule.isValid} />
            ))}
        </SimpleGrid>
    )
}