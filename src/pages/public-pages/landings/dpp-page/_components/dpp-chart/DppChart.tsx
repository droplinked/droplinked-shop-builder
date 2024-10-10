import { Flex } from "@chakra-ui/react";
import React from "react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import SpectrumHeader from "pages/public-pages/landings/_components/spectrum-header/SpectrumHeader";
import SliceIndicator from "./slice-indicator/SliceIndicator";

const DppChart = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
        <SpectrumHeader>Transparency with Enhanced Sustainability</SpectrumHeader>
        <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>The Digital Product Passport (DPP), proposed by the EU, supports circularity and sustainability in line with the EU's Circular Economy Action Plan and the European Green Deal, targeting Europe's climate neutrality by 2050.</AppTypography>
      </Flex>

      <Flex flexDirection={"column"} alignItems={"center"} width={"100%"}>
        <SliceIndicator
          slices={[
            {
              active: true
            },
            {
              active: false,
            },
            {
              active: true
            },
            {
              active: true,
            },
            {
              active: true
            },
          ]}
        />
        <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>Less than 10% of material used are currently fed back to the cycle </AppTypography>
      </Flex>
    </Flex>
  )
}

export default DppChart;