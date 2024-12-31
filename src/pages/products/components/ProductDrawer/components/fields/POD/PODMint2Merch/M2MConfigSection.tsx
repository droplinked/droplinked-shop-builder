import { Box, Flex, Text } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    title: string,
    rightElement?: React.ReactNode
}

const M2MConfigSection = ({ title, rightElement, children }: Props) => {
    return (
        <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
                <Text fontWeight={500} color="#FFF">{title}</Text>
                {rightElement && <Box flexShrink={0}>{rightElement}</Box>}
            </Flex>
            {children}
        </Flex>
    )
}

export default M2MConfigSection