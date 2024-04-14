import React from "react"
import { Heading } from "@chakra-ui/react"

interface Props {
  title: string
}

function CustomHeading({ title }: Props) {
  return (
    <Heading
      margin={0}
      fontSize={48}
      fontWeight={700}
      background={
        "linear-gradient(90deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);"
      }
      backgroundClip={"text"}
    >
      {title}
    </Heading>
  )
}

export default CustomHeading
