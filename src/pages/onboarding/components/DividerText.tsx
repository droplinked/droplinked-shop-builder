import { Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
    text: string
}

function DividerText({ text, ...rest }: Props) {
    return (
        <Flex width="100%" align="center" {...rest}>
            <Box flex="1" height="1px" bgColor="#292929" />
            <Text mx={4} fontSize={14} color="#7B7B7B">
                {text}
            </Text>
            <Box flex="1" height="1px" bgColor="#292929" />
        </Flex>
    )
}

export default DividerText
