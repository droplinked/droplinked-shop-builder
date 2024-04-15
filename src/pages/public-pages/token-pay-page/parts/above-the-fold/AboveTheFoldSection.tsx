import { Flex, Image } from "@chakra-ui/react"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import CustomHeading from "../_components/Heading"

function AboveTheFoldSection() {
  return (
    <Flex minHeight={"100dvh"} justifyContent={"center"} alignItems={"center"} paddingTop={12}>
      <Flex direction={{ base: "column", xl: "row" }} alignItems={"center"} gap={{ base: 14, xl: 20 }}>
        <Flex direction={"column"} gap={{ base: 14, xl: 20 }} order={{ base: 2, xl: 1 }}>
          <CustomHeading title="Token Powered Commerce Driven by Your Community" textAlign={{ base: "center", lg: "start" }} />
          <AppTypography fontSize={{ base: 20, lg: 24 }} color={"#fff"} textAlign={{ base: "center", lg: "start" }}>
            Leverage Tokenpay with any erc20, brc20 and SPL tokens to unlock real utility for communities.
          </AppTypography>
          <BasicButton alignSelf={{ base: "center", lg: "start" }}>Get Started</BasicButton>
        </Flex>
        <Image
          src={"assets/images/tokenPayPage/token-pay-bear.png"}
          width={{ base: "328px", md: "448px" }}
          height={{ base: "354px", md: "474px" }}
          objectFit={"cover"}
          order={{ base: 1, xl: 2 }}
        />
      </Flex>
    </Flex>
  )
}

export default AboveTheFoldSection
