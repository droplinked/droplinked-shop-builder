import AppTypography from 'components/common/typography/AppTypography';
import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion';
import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  itemId: string;
  defaultOpen?: boolean;
  isCollapsable?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, itemId, defaultOpen = false, isCollapsable = true }) => (
  <AppAccordionItem display="flex"  flexDirection="column" alignItems="flex-start" borderRadius="8px" itemId={itemId} defaultOpen={defaultOpen} isCollapsable={isCollapsable}>
    <AppAccordionTrigger background="#1C1C1C" py={2} px={3} borderRadius={4}>
      <AppTypography color="white" fontSize="base" >
        {title}
      </AppTypography>
      {isCollapsable && <AppAccordionChevron />}
    </AppAccordionTrigger>
    <AppAccordionPanel py={"16px"} px={"12px"}>{children}</AppAccordionPanel>
  </AppAccordionItem>
);

export default FilterSection;
