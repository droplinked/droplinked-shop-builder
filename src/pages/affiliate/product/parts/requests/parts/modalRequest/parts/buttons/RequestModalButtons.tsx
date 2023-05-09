import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext } from 'react'
import { ModalRequestContext } from '../../context'

function RequestModalButtons({close}) {
  const { formik } = useContext(ModalRequestContext)

  return (
    <HStack justifyContent={"space-between"}>
      <Box><BasicButton cancelType click={close}>Cancel</BasicButton></Box>
      <Box><BasicButton click={() => formik.submitForm()}>send Request</BasicButton></Box>
    </HStack>
  )
}

export default RequestModalButtons