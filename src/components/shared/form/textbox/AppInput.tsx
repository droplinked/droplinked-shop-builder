import { Box, HStack, Input, InputProps, Text, VStack } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'

interface Iprops extends InputProps {
  error?: string
  label?: string
  name: string
}

function AppInput(props: Iprops) {
  const { error, name, label } = props
  const style: InputProps = {
    borderColor: "#141414",
    errorBorderColor: "red.200",
    backgroundColor: "#141414",
    padding: "15px",
    fontSize: "14px",
    color: "#FFF",
    _focus: {
      borderColor: "none"
    },
    _hover: {
      borderColor: "none"
    }
  }

  return (
    <VStack align={"stretch"} width="100%" spacing={1}>
      <FieldLabel isRequired={props.isRequired} label={label} />
      <Input
        style={{ boxShadow: "unset" }}
        isInvalid={error ? true : false}
        placeholder={capitalizeFirstLetter(name)}
        {...style}
        {...props}
      />
      <ErrorLabel message={error} />
    </VStack>
  )
}

export default AppInput