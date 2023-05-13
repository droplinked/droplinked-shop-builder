import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

type size = "10px" | "12px" | "14px" | "16px" | "18px"
type weight = "normal" | "bold" | "bolder"

interface Iprops extends TextProps {
  children?: string
  size: size
  weight?: weight
}

function AppTypography(props: Iprops) {
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