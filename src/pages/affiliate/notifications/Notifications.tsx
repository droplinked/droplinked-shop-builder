import { Box, Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React from 'react'
import NotificationsList from './parts/list/NotificationsList'

function Notifications() {
  return (
    <AppCard>
        <VStack align={"stretch"} spacing={9}>
            <Box><NotificationsList /></Box>
        </VStack>
    </AppCard>
  )
}

export default Notifications