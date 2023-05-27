import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface Iprops extends TextProps { }

function FieldLabelReuired(props: Iprops) {
  return (
    <Text fontSize={"medium"} color="#2EC99E" {...props}>*</Text>
  )
}

export default FieldLabelReuired