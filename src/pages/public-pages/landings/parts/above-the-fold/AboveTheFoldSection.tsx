import { Box, Flex, Image } from "@chakra-ui/react"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import CustomHeading from "../heading/Heading"

interface Props {
  image: string;
  title: string;
  description: string;
  CTAButtonText: string;
  CTAButtonFunction?: () => void
}

function AboveTheFoldSection({ image, title, description, CTAButtonText, CTAButtonFunction }: Props) {
  return (
    <Flex direction={{ base: "column", xl: "row" }} alignItems={"center"} gap={{ base: 14, xl: 20 }}>
      <Flex order={{ base: 2, xl: 1 }} direction={"column"} gap={{ base: 14, xl: 20 }}>
        <CustomHeading title={title} textAlign={{ base: "center", xl: "start" }} />
        <AppTypography fontSize={{ base: 20, xl: 24 }} color={"#fff"} textAlign={{ base: "center", xl: "start" }}>{description}</AppTypography>
        <BasicButton alignSelf={{ base: "center", xl: "start" }}>{CTAButtonText}</BasicButton>
      </Flex>
      <Image
        order={{ base: 1, xl: 2 }}
        width={{ base: "85%", md: "65%", xl: "45%" }}
        src={image}
        objectFit={"cover"}
      />
    </Flex>
  )
}

export default AboveTheFoldSection
