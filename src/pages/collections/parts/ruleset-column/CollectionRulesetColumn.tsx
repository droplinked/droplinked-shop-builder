import React from 'react'
import { Flex } from '@chakra-ui/react';

//Icons
import AppIcons from 'assest/icon/Appicons';

//Components
import AppTypography from 'components/common/typography/AppTypography';

const CollectionRulesetColumn = ({ruleset}) => {
  const isGated = ruleset?.gated;
  const rulesetsValue = ruleset ? isGated ? "Gated" : "Discount" : "-";

  return (
    <Flex gap={"8px"} alignItems={"center"} padding={"6px 12px"} borderRadius={"27px"} bgColor={"#292929"} width={"85%"}>
      {isGated ? <AppIcons.GatedIcon/> :<AppIcons.DiscountIcon/>}
      <AppTypography fontSize={"14px"}>{rulesetsValue}</AppTypography>
    </Flex>
  )
}

export default CollectionRulesetColumn;