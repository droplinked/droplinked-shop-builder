import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Flex justifyContent={"center"} padding={"80px 0"}>
      <HStack maxWidth={"1000px"} width="95%" spacing={55}>
        <Box w={"40%"}>
          <Image src="/assets/images/404.svg" width={{ xs: "80%", sm: "50%" }} alt="droplinked" />
        </Box>
        <VStack align="stretch" color={"#FFF"} spacing={0}>
          <Box><Text fontSize={"100px"} color={"#2EC99E"}><strong>404</strong></Text></Box>
          <Box><Text fontSize={"3xl"}>Oops!</Text></Box>
          <Box><Text fontSize={"2xl"}>Page Not Found</Text></Box>
          <Box paddingTop={6}>
            Sorry, the page you are looking for doesn't exist or has been removed. Please recheck the URL or return to the home page.
          </Box>
          <Box paddingTop={8}><Link to="/"><BasicButton width="auto">back to home page</BasicButton></Link></Box>
        </VStack>
      </HStack>
    </Flex>
  )
}

export default NotFound