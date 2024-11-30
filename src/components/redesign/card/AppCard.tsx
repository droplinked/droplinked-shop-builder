import { background, Box, BoxProps } from "@chakra-ui/react";
import React from 'react'

interface IProps {
  mini?: boolean
  boxProps?: BoxProps
  [prop: string]: any
  isDisabled?: boolean
}

function AppCard(props: IProps) {
  const { mini, boxProps, isDisabled } = props
  const styles = {
    width: "100%",
    maxWidth: boxProps?.maxWidth ? boxProps?.maxWidth : mini ? "1000px" : "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    color: "#FFF",
    background: "#1C1C1C",
    cursor: isDisabled ? "not-allowed" : "default"
  }

  return (
    <Box {...styles} {...boxProps}>{props.children}</Box>
  )
}

export default AppCard