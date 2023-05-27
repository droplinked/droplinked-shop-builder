import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import casper from "assest/icon/casper.svg";

function OrderDetailPayment() {

  return (
    <HStack spacing={4}>
      <Box><Text fontSize={{ base: "sm", sm: "md" }}>Payment with</Text></Box>
      <HStack>
        <Box><Image src={casper} /></Box>
        <Box><Text fontSize={{ base: "sm", sm: "larger" }} color={"#FF473E"}>Casper payment</Text></Box>
      </HStack>
    </HStack>
  )
}

export default OrderDetailPayment