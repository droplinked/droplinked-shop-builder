import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React from 'react'

function RequestModalButtons({close}) {
  return (
    <HStack justifyContent={"space-between"}>
      <Box><BasicButton cancelType click={close}>Cancel</BasicButton></Box>
      <Box><BasicButton>send Request</BasicButton></Box>
    </HStack>
  )
}

export default RequestModalButtons