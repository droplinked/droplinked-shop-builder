import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import React from 'react'

function AppCard({ children, mini }) {
  const styles = {
    w: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p: "36px 48px",
    ...mini && { maxWidth: "1000px" }
  }

  return (
    <Box {...styles}>{children}</Box>
  )
}

export default AppCard