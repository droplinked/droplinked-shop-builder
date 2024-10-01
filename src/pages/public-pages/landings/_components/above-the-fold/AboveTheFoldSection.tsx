import { Flex, Image } from "@chakra-ui/react"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import { IAboveTheFoldSection } from "../../types/interfaces"
import CustomHeading from "../heading/Heading"

export default function AboveTheFoldSection(props: IAboveTheFoldSection) {
  const { image } = props

  return (
    <Flex direction={{ base: "column", xl: "row" }} alignItems={"center"} gap={{ base: 14, xl: 20 }}>
      <Content {...props} />
      <Image
        src={image}
        width={{ base: "85%", md: "65%", xl: "45%" }}
        objectFit={"cover"}
        order={{ base: 1, xl: 2 }}
      />
    </Flex>
  )
}

function Content(props: IAboveTheFoldSection) {
  const { title, description, CTAButtonText, CTAButtonFunction } = props

  return (
    <Flex order={{ base: 2, xl: 1 }} direction={"column"} gap={{ base: 14, xl: 20 }}>
      <CustomHeading title={title} textAlign={{ base: "center", xl: "start" }} />
      <AppTypography textAlign={{ base: "center", xl: "start" }} fontSize={{ base: 20, xl: 24 }} color={"#fff"}>
        {description}
      </AppTypography>
      <BasicButton alignSelf={{ base: "center", xl: "start" }} onClick={CTAButtonFunction}>
        {CTAButtonText}
      </BasicButton>
    </Flex>
  )
}