import { Flex, FlexProps, Text } from '@chakra-ui/react'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React from 'react'

interface Props extends FlexProps {
    text: string
    linkText: string | React.ReactNode
    action: () => void
}

function AuthRedirectLink({ text, linkText, action, ...rest }: Props) {
    return (
        <Flex
            gap={2}
            {...rest}
        >
            <Text fontSize={14} color="text.white">
                {text}
            </Text>
            <InteractiveText onClick={action}>{linkText}</InteractiveText>
        </Flex>
    )
}

export default AuthRedirectLink 