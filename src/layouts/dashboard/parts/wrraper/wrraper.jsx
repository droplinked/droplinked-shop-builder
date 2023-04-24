import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import React from 'react'

function LayoutWrapper({ children }) {

  return (
    <Box>{children}</Box>
  )
}

export default LayoutWrapper