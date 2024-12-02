import { Flex, Image } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import Button from "components/redesign/button/Button"
import React from "react"
import { IAboveTheFoldSection } from "../../types/interfaces"
import SpectrumHeader from "../spectrum-header/SpectrumHeader"

export default function AboveTheFoldSection(props: IAboveTheFoldSection) {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems={{ base: "flex-start", lg: "center" }}
      gap={{ base: 12, lg: 9, xl: 6 }}
    >
      <Content {...props} />
      <Image
        src={props.image}
        width={{ base: "328px", md: "518px", lg: "504px", xl: "526px" }}
        objectFit="cover"
        order={{ base: 1, lg: 2 }}
        alignSelf={"center"}
      />
    </Flex>
  )
}

function Content({ title, description, CTAButtonText, CTAButtonFunction }: IAboveTheFoldSection) {
  return (
    <Flex
      order={{ base: 2, lg: 1 }}
      direction="column"
      alignItems="flex-start"
      gap={{ base: 6, lg: "64px", xl: "80px" }}
    >
      <SpectrumHeader as="h1" fontSize={{ base: 24, md: 28, lg: 36, xl: 40 }}>{title}</SpectrumHeader>
      <AppTypography fontSize={{ base: 16, xl: 18 }} color="#fff">{description}</AppTypography>
      <Button fontWeight={500} onClick={CTAButtonFunction}>
        {CTAButtonText}
      </Button>
    </Flex>
  )
}