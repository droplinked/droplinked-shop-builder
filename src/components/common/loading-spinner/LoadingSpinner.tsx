import { Flex, FlexProps, Spinner } from "@chakra-ui/react"
import React from "react"

function LoadingSpinner({ ...flexProps }: FlexProps) {
    return (
        <Flex
            h="auto"
            justifyContent="center"
            alignItems="center"
            {...flexProps}
        >
            <Spinner size="xl" color="main.primary" />
        </Flex>
    )
}

export default LoadingSpinner