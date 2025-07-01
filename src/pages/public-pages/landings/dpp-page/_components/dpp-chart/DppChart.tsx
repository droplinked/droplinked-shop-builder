import { Flex } from "@chakra-ui/react";
import React from "react";
import { TFunction } from "i18next";

//Components
import AppTypography from "components/common/typography/AppTypography";
import SpectrumHeader from "pages/public-pages/landings/_components/spectrum-header/SpectrumHeader";
import SliceIndicator from "./slice-indicator/SliceIndicator";

interface DppChartProps {
  t: TFunction;
}

const DppChart = ({ t }: DppChartProps) => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={"20px"}>
        <SpectrumHeader>{t('dppChart.title')}</SpectrumHeader>
        <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>{t('dppChart.description')}</AppTypography>
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
        <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>{t('dppChart.subtitle')}</AppTypography>
      </Flex>
    </Flex>
  )
}

export default DppChart;