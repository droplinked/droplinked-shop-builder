import { Flex, Image } from "@chakra-ui/react"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import CustomHeading from "../_components/Heading"

function AboveTheFoldSection() {
  return (
    <Flex height={"100dvh"} justifyContent={"center"} alignItems={"center"}>
      <Flex alignItems={"center"} gap={20}>
        <Flex direction={"column"} gap={20}>
          <Flex direction={"column"}>
            <CustomHeading title="Token Powered Commerce"></CustomHeading>
            <CustomHeading title="Driven by Your Community"></CustomHeading>
          </Flex>
          <AppTypography fontSize={24} color={"#fff"}>
            Leverage Tokenpay with any erc20, brc20 and SPL tokens to unlock
            real utility for communities.
          </AppTypography>
          <BasicButton alignSelf={"start"}>Get Started</BasicButton>
        </Flex>
        <Image
          flexShrink={0}
          src={"assets/images/token-pay-bear.png"}
          width={"448px"}
          height={"474px"}
        />
      </Flex>
    </Flex>
  )
}

export default AboveTheFoldSection
