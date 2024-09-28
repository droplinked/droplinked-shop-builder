import { Heading, HeadingProps } from "@chakra-ui/react"
import React from "react"

interface Props extends HeadingProps {
  title: string
}

function CustomHeading({ title, ...props }: Props) {
  return (
    <Heading
      margin={0}
      fontSize={{ base: 36, lg: 48 }}
      fontWeight={700}
      background={
        "linear-gradient(92deg, #2BCFA1 0%, #C59CFF 47.99%, #9C4EFF 99.98%)"
      }
      backgroundClip={"text"}
      {...props}
    >
      {title}
    </Heading>
  )
}

export default CustomHeading
