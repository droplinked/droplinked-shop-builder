import { Box, Flex, VStack } from '@chakra-ui/react'
import AppCard from 'common/card/AppCard'
import React from 'react'
import ShopsFilter from '../shops/parts/filter/ShopsFilter'
import RequestsList from './parts/list/RequestsList'

function Requests() {
  return (
    <AppCard>
        <VStack align={"stretch"} spacing={9}>
            <Box><ShopsFilter /></Box>
            <Box><RequestsList /></Box>
        </VStack>
    </AppCard>
  )
}

export default Requests