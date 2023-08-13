import { Box, BoxProps } from "@chakra-ui/react";
import React from 'react'

interface IProps {
  mini?: boolean
  boxProps?: BoxProps
  [prop: string]: any
}

function AppCard(props: IProps) {
  const { mini, boxProps } = props
  const styles = {
    width: "100%",
    maxWidth: boxProps?.maxWidth ? boxProps?.maxWidth : mini ? "1000px" : "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p: "36px 48px",
    color: "#FFF",
  }

  return (
    <Box {...styles} {...boxProps}>{props.children}</Box>
  )
}

export default AppCard