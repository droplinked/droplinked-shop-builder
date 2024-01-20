import { Box, Text, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
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
          <Box><AppTypography fontSize='24px'>+4</AppTypography></Box>
          <Box position={"absolute"} bottom={5} width="100px" textAlign={"center"}><AppTypography fontSize='14px'>see more products</AppTypography></Box>
        </VStack>
      </VStack>
    </Link>
  )
}

export default ShopsMore