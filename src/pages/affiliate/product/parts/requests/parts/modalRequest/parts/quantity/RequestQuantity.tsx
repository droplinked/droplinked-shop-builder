import { Box, Flex, Text } from '@chakra-ui/react'
import AppInput from 'components/shared/form/textbox/AppInput'
import React from 'react'

function RequestQuantity() {
  return (
    <Flex alignItems={"center"} gap={5}>
        <Box><Text fontFamily={"aven"}>Quantity</Text></Box>
        <Box width={"100%"}><AppInput name="quantity" /></Box>
    </Flex>
  )
}

export default RequestQuantity