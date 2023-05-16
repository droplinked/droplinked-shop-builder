import { Box, Flex, Text } from '@chakra-ui/react'
import AppInput from 'components/shared/form/textbox/AppInput'
import React, { useContext } from 'react'
import { ModalRequestContext } from '../../context'

function RequestQuantity() {
  const { formik } = useContext(ModalRequestContext)
  return (
    <Flex alignItems={"baseline"} gap={5}>
      <Box><Text fontFamily={"aven"}>Quantity</Text></Box>
      <Box width={"100%"}>
        <AppInput
          error={formik.errors.quantity}
          onChange={(e) => formik.setFieldValue("quantity", e.target.value)}
          name="quantity"
        />
      </Box>
    </Flex>
  )
}

export default RequestQuantity