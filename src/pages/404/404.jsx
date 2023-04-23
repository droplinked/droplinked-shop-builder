import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

function NotFound() {
  return (
    <Flex justifyContent={"center"}>
        <Image src="/assets/images/404-error-not-found-page-lost.png" width={{xs:"80%", sm:"50%"}} alt="droplinked" />
    </Flex>
  )
}

export default NotFound