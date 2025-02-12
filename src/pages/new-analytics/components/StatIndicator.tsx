import { Circle, Flex, FlexProps, Text } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

interface StatIndicatorProps extends FlexProps, PropsWithChildren {
    percentage: number
}

function StatIndicator({ percentage, children, ...rest }: StatIndicatorProps) {
    return (
        <Flex alignItems="center" gap={2} {...rest}>
            <Text fontSize={14} color="#FFF">{percentage.toFixed(2)}%</Text>
            <Circle size={1} bgColor="#292929" />
            {children}
        </Flex>
    )
}

export default StatIndicator