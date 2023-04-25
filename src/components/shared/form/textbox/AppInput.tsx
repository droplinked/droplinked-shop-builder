import { Input, InputProps, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface Iprops extends InputProps {
  error: string
  [propName:string]: any
}

function AppInput(props: Iprops) {

  const style: InputProps = {
    borderColor: "#141414",
    errorBorderColor:"red.300",
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
    <VStack align={"stretch"} spacing={0}>
      <Input
        isInvalid={props?.error ? true : false}
        {...style}
        {...props}
      />
      {props?.error && <Text position={"relative"} left={4} fontSize={"15px"} color='red.300'>{props.error}</Text>}
    </VStack>
  )
}

export default AppInput