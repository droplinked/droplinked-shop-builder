import { Box, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React from 'react'
import ShopsFilter from './parts/filter/ShopsFilter'
import ShopsList from './parts/list/ShopsList'

function Shops() {
  return (
    <AppCard>
      <VStack align={"stretch"} spacing={7}>
        <Box><ShopsFilter /></Box>
        <Box><ShopsList /></Box>
      </VStack>
    </AppCard>
  )
}

export default Shops