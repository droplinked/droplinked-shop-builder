import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import MobileSidebarToggle from './components/MobileSidebarToggle';
import UserMenu from './components/userMenu/UserMenu';

const DashboardLayoutHeader = ({ isSidebarOpen = false, setIsSidebarOpen = false , isDashboard= true }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex position="sticky" top={0} width="full" justifyContent="flex-end" alignItems="center" padding="16px 36px 16px 24px" borderBottom="1px solid #292929" backgroundColor="#141414" zIndex={999}>
      <UserMenu />
      {(isMobile && isDashboard )? (
        <>
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <AppIcons.SidebarDroplinked1 color="white" />
          </Box>
          <MobileSidebarToggle isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </>
      ) : null}
    </Flex>
  );
};

export default DashboardLayoutHeader;
