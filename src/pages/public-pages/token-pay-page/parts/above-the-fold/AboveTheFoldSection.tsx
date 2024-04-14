import { Flex, Image } from "@chakra-ui/react"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import CustomHeading from "../_components/Heading"

function AboveTheFoldSection() {
  return (
    <Flex minHeight={"100dvh"} justifyContent={"center"} alignItems={"center"} paddingTop={{ base: "48px" }}>
      <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 14, lg: 20 }}>
        <Flex direction={"column"} gap={{ base: 14, lg: 20 }} order={{ base: 2, lg: 1 }}>
          <CustomHeading title="Token Powered Commerce Driven by Your Community" textAlign={{ base: "center", lg: "start" }} />
          <AppTypography fontSize={{ base: "20px", lg: "24px" }} color={"#fff"} textAlign={{ base: "center", lg: "start" }}>
            Leverage Tokenpay with any erc20, brc20 and SPL tokens to unlock real utility for communities.
          </AppTypography>
          <BasicButton alignSelf={{ base: "center", lg: "start" }}>Get Started</BasicButton>
        </Flex>
        <Image
          flexShrink={0}
          src={"assets/images/tokenPayPage/token-pay-bear.png"}
          width={{ base: "328px", md: "448px" }}
          height={{ base: "354px", md: "474px" }}
          objectFit={"cover"}
          order={{ base: 1, lg: 2 }}
        />
      </Flex>
    </Flex>
  )
}

export default AboveTheFoldSection
