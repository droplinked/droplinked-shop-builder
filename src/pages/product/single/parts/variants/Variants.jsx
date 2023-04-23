import { Box, VStack } from '@chakra-ui/react'
import { ComponentTitle, ComponentWrapper } from 'pages/prodcut-pages/ProductPages-style'
import React, { useContext } from 'react'
import AddVariants from './parts/add'
import SkuTable from './parts/table/SkuTable'
import { productContext } from '../../context'

function Variants() {
  const { state: { sku } } = useContext(productContext)

  return (
    <ComponentWrapper>
      <VStack width={"100%"} spacing={10} align={"stretch"}>
        <Box><ComponentTitle>Variants</ComponentTitle></Box>
        {sku.length && <Box><SkuTable sku={sku} /></Box>}
        <Box><AddVariants /></Box>
      </VStack>
    </ComponentWrapper>
  )
}

export default Variants