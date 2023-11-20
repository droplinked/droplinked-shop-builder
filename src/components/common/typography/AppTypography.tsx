import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

export interface IAppTypography extends TextProps {
  children?: any
}

function AppTypography(props: IAppTypography) {
  const { children } = props
  return (
    <Text
      fontWeight={props.fontWeight || "normal"}
      fontSize={props.fontSize || "12px"}
      {...props}>
      {children}
    </Text>
  )
}

export default AppTypography