import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import React from 'react'

interface IProps {
  mini?: boolean
  [prop: string]: any
}

function AppCard(props: IProps) {
  const { mini } = props
  const styles = {
    width: "100%",
    maxWidth: props?.maxWidth ? props?.maxWidth : mini ? "1000px" : "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p: "36px 48px",
    color: "#FFF",
  }

  return (
    <Box {...styles}>{props.children}</Box>
  )
}

export default AppCard