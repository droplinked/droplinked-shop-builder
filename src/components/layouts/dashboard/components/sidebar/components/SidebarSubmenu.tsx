import { Box } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { AppAccordionPanel } from 'components/redesign/accordion/AppAccordion';
import React from 'react';
import DashboardLinkWrapper from '../../common/DashboardLinkWrapper';

const SidebarSubmenu = ({ list }) => {
  return (
    <AppAccordionPanel width="100%" padding="10px 0px 12px 20px" display={{ sm: 'block', md: 'none', lg: 'block' }}>
      <Box display="flex" flexDirection="column" justifyContent="center" gap="12px" padding="0px 20px" borderLeft="1px solid #3C3C3C" width="full">
        {list.map((listItem) => (
          <DashboardLinkWrapper key={listItem.listTitle} linkTo={listItem.linkTo}>
            <AppTypography fontSize="14px" fontWeight="400" fontFamily="Inter" color="#7B7B7B" _hover={{ color: 'white' }} whiteSpace={'nowrap'}>
              {listItem.listTitle}
            </AppTypography>
          </DashboardLinkWrapper>
        ))}
      </Box>
    </AppAccordionPanel>
  );
};

export default SidebarSubmenu;
