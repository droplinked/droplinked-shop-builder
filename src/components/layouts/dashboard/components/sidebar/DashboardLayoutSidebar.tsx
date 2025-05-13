import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { AppAccordion } from 'components/redesign/accordion/AppAccordion';
import React from 'react';
import { SIDEBAR_CONSTANTS } from '../../constants';
import DashboardLayoutSidebarGrowthHack from './components/GrowthHack/DashboardLayoutSidebarGrowthHack';
import SidebarGroup from './components/SidebarGroup';
import SidebarLogo from './components/SidebarLogo';

const DashboardLayoutSidebar = ({ isSidebarOpen }) => {
  const sidebarWidth = useBreakpointValue({ base: '72px', lg: '270px' });
  const sidebarMobileWidth = isSidebarOpen ? '270px' : '0';
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile && !isSidebarOpen) return null;

  return (
    <Flex
      width={isMobile ? sidebarMobileWidth : sidebarWidth}
      height="100vh"
      flexDirection="column"
      alignItems="flex-start"
      position="sticky"
      top={isMobile ? '56px' : 0}
      transition="width 0.3s ease-in-out"
      bg="#141414"
      borderRight={isMobile ? 'none' : '1px solid '}
      borderColor={'neutral.gray.800'}
    >
      {!isMobile && <SidebarLogo />}

      <AppAccordion
        multiCollapse={false}
        display="flex"
        width="full"
        padding="36px 12px"
        flexDirection="column"
        alignItems="flex-start"
        gap="24px"
        flex="1"
        overflow="hidden"
        _hover={{ overflow: 'auto' }}
        _focusWithin={{ overflow: 'auto' }}
      >
        {SIDEBAR_CONSTANTS?.map((sidebarGroup, index) => (
          <SidebarGroup key={sidebarGroup.group} group={sidebarGroup} index={index} />
        ))}
        <DashboardLayoutSidebarGrowthHack />
      </AppAccordion>
    </Flex>
  );
};

export default DashboardLayoutSidebar;
