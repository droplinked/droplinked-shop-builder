import { Flex, FlexProps, Spinner } from "@chakra-ui/react"
import React from "react"

interface Props extends FlexProps { }

function LoadingComponent({ ...flexProps }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="auto"
      {...flexProps}
    >
      <Spinner size="xl" color="primary" />
    </Flex>
  )
}

export default LoadingComponent