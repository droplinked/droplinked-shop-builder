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
        "linear-gradient(90deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);"
      }
      backgroundClip={"text"}
      {...props}
    >
      {title}
    </Heading>
  )
}

export default CustomHeading
