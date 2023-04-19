import { Box, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import { ComponentTitle, ComponentWrapper } from 'pages/prodcut-pages/ProductPages-style'
import React from 'react'
import AddVariants from './parts/add'

function Variants() {
  return (
    <ComponentWrapper>
      <VStack width={"100%"} spacing={10} align={"stretch"}>
        <Box><ComponentTitle>Variants</ComponentTitle></Box>
        <Box><AddVariants /></Box>
      </VStack>
    </ComponentWrapper>
  )
}

export default Variants