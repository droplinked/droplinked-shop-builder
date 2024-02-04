import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

type size = "10px" | "12px" | "14px" | "16px" | "18px" | "20px" | "22px" | "24px"
type weight = "normal" | "bold" | "bolder"

export interface IAppTypography extends TextProps {
  children?: any
  size: size
  weight?: weight
}

function AppTypography(props: IAppTypography) {
  const { children, size, weight } = props
  return (
    <Text
      fontSize={size}
      {...weight === "bolder" && { fontFamily: "aven" }}
      {...weight === "bold" && !props.fontWeight && { fontWeight: "bold" }}
      {...props}>
      {children}
    </Text>
  )
}

export default AppTypography