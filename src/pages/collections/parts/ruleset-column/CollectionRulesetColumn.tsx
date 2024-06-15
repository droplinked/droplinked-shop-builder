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
    <Flex alignItems={"flex-start"}>
      <Flex bgColor={"#292929"} alignItems={"center"} padding={"6px 12px"} borderRadius={"27px"} gap={"8px"}>
        {isGated ? <AppIcons.GatedIcon/> : <AppIcons.DiscountIcon/>}
        <AppTypography fontSize={"14px"}>{rulesetsValue}</AppTypography>
      </Flex>
    </Flex>
  )
}

export default CollectionRulesetColumn;