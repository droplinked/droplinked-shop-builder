import { Flex } from "@chakra-ui/react"
import React from "react"
import AboveTheFoldSection from "./parts/above-the-fold/AboveTheFoldSection"

function TokenPayPage() {
  return (
    <Flex
      direction="column"
      gap={10}
      padding={{ base: "10px 15px", sm: "20px 30px" }}
    >
      <AboveTheFoldSection />
    </Flex>
  )
}

export default TokenPayPage
