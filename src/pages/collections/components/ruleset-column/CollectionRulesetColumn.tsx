import React from 'react'
import { Flex } from '@chakra-ui/react';

//Icons
import AppIcons from 'assest/icon/Appicons';

//Components
import AppTypography from 'components/common/typography/AppTypography';

const CollectionRulesetColumn = ({ ruleset }) => {
  const isGated = ruleset?.type === "GATING";
  const rulesetsValue = ruleset ? isGated ? "Gating" : "Discount" : "-";

  return (
    <Flex alignItems={"flex-start"}>
      <Flex bgColor={"#2BCFA11A"} alignItems={"center"} padding={"6px 12px"} borderRadius={"27px"} gap={"8px"}>
        {isGated ? <AppIcons.GatingRuleset /> : <AppIcons.DiscountRuleset />}
        <AppTypography color={"#2BCFA1"} fontSize={"14px"}>{rulesetsValue}</AppTypography>
        {!isGated && <AppIcons.DotSpacer />}
        {!isGated && <AppTypography color={"#2BCFA1"}>{ruleset.discountPercentage}%</AppTypography>}
      </Flex>
    </Flex>
  )
}

export default CollectionRulesetColumn;