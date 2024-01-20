import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useContext } from 'react'
import { ModalRequestContext } from '../../context'

function RequestModalButtons({ close }) {
  const { formik, loading } = useContext(ModalRequestContext)

  return (
    <HStack justifyContent={"space-between"}>
      <Box><BasicButton variant='outline' onClick={close}>Cancel</BasicButton></Box>
      <Box><BasicButton isLoading={loading} onClick={() => formik.submitForm()}>Send Request</BasicButton></Box>
    </HStack>
  )
}

export default RequestModalButtons