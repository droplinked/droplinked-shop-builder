import { Box, Flex, Text } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
    label: string
    rightElement?: ReactNode
}

function FormControl({ label, rightElement, children }: Props) {
    return (
        <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
                <Text fontWeight={500} color="#FFF">{label}</Text>
                {rightElement && <Box flexShrink={0}>{rightElement}</Box>}
            </Flex>
            {children}
        </Flex>
    )
}

export default FormControl