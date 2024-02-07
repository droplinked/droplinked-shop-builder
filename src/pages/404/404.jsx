import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()
  const { shop } = useProfile()
  const { shopNavigate } = useCustomNavigate()

  useEffect(() => {
    if (shop && location.pathname.search(shop?.name + '/c') >= 0) shopNavigate('products')
  }, [location, shop])


  return (
    <Flex justifyContent={"center"} padding={"80px 0"}>
      <HStack maxWidth={"1000px"} width="95%" spacing={55}>
        <Box w={"40%"}>
          <Image src="/assets/images/404.svg" width={{ xs: "80%", sm: "50%" }} alt="droplinked" />
        </Box>
        <VStack align="stretch" color={"#FFF"} spacing={0}>
          <Box><Text fontSize={"100px"} color={"#2EC99E"} fontFamily="aven" fontWeight={"bold"}>404</Text></Box>
          <Box><Text fontSize={"3xl"} fontFamily="aven" fontWeight={"bold"}>Oops!</Text></Box>
          <Box><Text fontSize={"2xl"} fontFamily="aven" fontWeight={"bold"}>Page Not Found</Text></Box>
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