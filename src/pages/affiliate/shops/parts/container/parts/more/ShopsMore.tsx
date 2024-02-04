import { Box, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopsContainerContext } from '../../context'

function ShopsMore() {
  const shopsContext = useContext(shopsContainerContext)
  const { shopRoute } = useCustomNavigate();

  return (
    <Link to={`${shopRoute}/affiliate/shops/${shopsContext.shop?.name}`}>
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