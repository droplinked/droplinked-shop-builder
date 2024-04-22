import { Flex, Image } from "@chakra-ui/react"
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
      <Flex direction={"column"} gap={{ base: 14, xl: 20 }} order={{ base: 2, xl: 1 }}>
        <CustomHeading title={title} textAlign={{ base: "center", xl: "start" }} />
        <AppTypography fontSize={{ base: 20, lg: 24 }} color={"#fff"} textAlign={{ base: "center", xl: "start" }}>{description}</AppTypography>
        <BasicButton alignSelf={{ base: "center", xl: "start" }}>{CTAButtonText}</BasicButton>
      </Flex>
      <Image
        src={image}
        width={{ base: "328px", md: "448px" }}
        height={{ base: "354px", md: "474px" }}
        objectFit={"cover"}
        order={{ base: 1, xl: 2 }}
      />
    </Flex>
  )
}

export default AboveTheFoldSection
