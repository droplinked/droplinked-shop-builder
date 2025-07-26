import React from 'react'
import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { Discount2Sm } from 'assets/icons/Finance/Discount2/Discount2Sm'
import { RulesetSm } from 'assets/icons/System/Ruleset/RulesetSm'

const RulesetBadge = ({ isGated, ruleset, displayText }) => (
  <Flex 
    bgColor="#2BCFA11A" 
    alignItems="center" 
    padding="6px 12px" 
    borderRadius="27px" 
    gap="8px"
  >
    {isGated ? <RulesetSm color="#2BCFA1" /> : <Discount2Sm color="#2BCFA1" />}
    <DotSeparatedList dotColor="#2BCEA133">
      <AppTypography color="text.primary" fontSize="14px">
        {displayText}
      </AppTypography>
      {!isGated && (
        <AppTypography color="#2BCFA1">
          {ruleset.discountPercentage}%
        </AppTypography>
      )}
    </DotSeparatedList>
  </Flex>
);

const CollectionRulesetColumn = ({ ruleset }) => {
  const { t } = useLocaleResources("collections");
  
  if (!ruleset) {
    return (
      <Flex alignItems="flex-start">
        <AppTypography>-</AppTypography>
      </Flex>
    );
  }

  const isGated = ruleset.type === "GATING";
  const displayText = isGated ? t("CollectionRulesetColumn.gating") : t("CollectionRulesetColumn.discount");

  return (
    <Flex alignItems="flex-start">
      <RulesetBadge 
        isGated={isGated}
        ruleset={ruleset}
        displayText={displayText}
      />
    </Flex>
  );
};

export default CollectionRulesetColumn;