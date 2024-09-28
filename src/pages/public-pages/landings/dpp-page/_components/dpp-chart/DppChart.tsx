import React from "react";
import { Flex } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import SliceIndicator from "./slice-indicator/SliceIndicator";
import CustomHeading from "pages/public-pages/landings/_components/heading/Heading";

const DppChart = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
        <CustomHeading title="Transparency with Enhanced Sustainability " textAlign={"center"} />
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