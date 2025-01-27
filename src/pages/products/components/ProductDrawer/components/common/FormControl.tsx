import { Box, Flex, Text } from '@chakra-ui/react'
import ErrorMessage from 'components/redesign/error-message/ErrorMessage'
import React, { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
    label: string
    rightElement?: ReactNode
    errorMessage?: string
}

function FormControl({ label, rightElement, errorMessage, children }: Props) {
    return (
        <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
                <Text fontWeight={500} color="#FFF">{label}</Text>
                {rightElement && <Box flexShrink={0}>{rightElement}</Box>}
            </Flex>

            {children}

            {errorMessage && <ErrorMessage mt={2}>{errorMessage}</ErrorMessage>}
        </Flex>
    )
}

export default FormControl