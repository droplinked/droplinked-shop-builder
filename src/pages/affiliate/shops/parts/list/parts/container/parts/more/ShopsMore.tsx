import { Box, Text, VStack } from '@chakra-ui/react'
import { useProfile } from 'hooks/useProfile/useProfile'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopsContainerContext } from '../../context'

function ShopsMore() {
  const { shop } = useProfile()
  const shopsContext = useContext(shopsContainerContext)

  return (
    <Link to={`/${shop.name}/c/affiliate/shops/${shopsContext.shop?.name}`}>
      <VStack backgroundColor={"#000"} borderRadius="8px" alignItems={"center"} position="relative" justifyContent="center" height="100%">
        <VStack height={"fit-content"} color="#808080">
          <Box><Text fontSize={"4xl"}>+4</Text></Box>
          <Box position={"absolute"} bottom={5} width="100px" textAlign={"center"}><Text>see more products</Text></Box>
        </VStack>
      </VStack>
    </Link>
  )
}

export default ShopsMore