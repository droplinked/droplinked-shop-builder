import { Heading, HeadingProps } from "@chakra-ui/react"
import React from "react"

interface Props extends HeadingProps { }

function SpectrumHeader({ children, ...props }: Props) {
  return (
    <Heading
      width="fit-content"
      margin={0}
      fontSize={{ base: 36, lg: 48 }}
      fontWeight={700}
      color="white"
      // background="linear-gradient(92deg, #2BCFA1 0%, #C59CFF 47.99%, #9C4EFF 99.98%)"
      // backgroundClip="text"
      {...props}
    >
      {children}
    </Heading>
  )
}

export default SpectrumHeader