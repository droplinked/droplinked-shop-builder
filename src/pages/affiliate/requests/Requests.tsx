import { Box, Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React from 'react'
import RequestsList from './parts/list/RequestsList'

function Requests() {
  return (
    <AppCard>
        <VStack align={"stretch"} spacing={9}>
            <Box><RequestsList /></Box>
        </VStack>
    </AppCard>
  )
}

export default Requests