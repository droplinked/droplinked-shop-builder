import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

export interface IAppTypography extends TextProps {
  children?: any
  price?: boolean
}

function AppTypography({children, price = false, ...props}: IAppTypography) {
  return (
    <Text
      margin={0}
      fontWeight={props.fontWeight || "normal"}
      fontSize={props.fontSize || "12px"}
      {...props}>
      {price ? <>$ {children} USD</> :  children }
    </Text>
  )
}

export default AppTypography