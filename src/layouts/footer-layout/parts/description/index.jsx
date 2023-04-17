import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import droplinkFull from "assest/image/droplinkFull.svg";

function Description() {
  return (
    <VStack align="stretch" spacing={5} marginTop={2}>
      <HStack>
        <Box><Image src={droplinkFull} /></Box>
      </HStack>
      <Box>
        <Text fontSize={{ sm: "sm", md: "md" }}>
          Decentralized Registration Of Products
          <br />
          Drop your product and dive into your business
          <br />
          without any doubt
        </Text>
      </Box>
      <Box>
        <a href='mailto:Support@droplinked.com'>
          <Text fontSize={{ sm: "sm", md: "md" }} color={"#FFF"}>Support@droplinked.com</Text>
        </a>
      </Box>
    </VStack>
  )
}

export default Description