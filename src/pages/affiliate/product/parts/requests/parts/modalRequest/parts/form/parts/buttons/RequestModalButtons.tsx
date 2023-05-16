import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext } from 'react'
import { ModalRequestContext } from '../../context'

function RequestModalButtons({ close }) {
  const { formik, loading } = useContext(ModalRequestContext)

  return (
    <HStack justifyContent={"space-between"}>
      <Box><BasicButton variant='outline' isDisabled={loading} onClick={close}>Cancel</BasicButton></Box>
      <Box><BasicButton isLoading={loading} onClick={() => formik.submitForm()}>send Request</BasicButton></Box>
    </HStack>
  )
}

export default RequestModalButtons