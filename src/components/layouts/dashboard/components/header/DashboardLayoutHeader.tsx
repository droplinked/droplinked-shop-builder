import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import MobileSidebarToggle from './components/MobileSidebarToggle';
import UserMenu from './components/userMenu/UserMenu';
import Breadcrumb from './components/breadcrumb/Breadcrumb';


interface DashboardLayoutHeaderProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (isOpen: boolean) => void; 
  isDashboard?: boolean;
}

const DashboardLayoutHeader: React.FC<DashboardLayoutHeaderProps> = ({ isSidebarOpen = false, setIsSidebarOpen, isDashboard = true }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex position="sticky" top={0} width="full" justifyContent="space-between" alignItems="center" padding="16px 36px 16px 24px" borderBottom="1px solid" borderColor={"neutral.gray.800"} backgroundColor="#141414" zIndex={999}>
        <Flex alignItems="center" flex="1">
          {isMobile ? (
            <>
              <MobileSidebarToggle isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isDashboard={isDashboard}/>
              <Box position="absolute" left="50%" transform="translateX(-50%)">
                <AppIcons.SidebarDroplinked1 color="white" />
              </Box>
            </>
          ) : null}
          
          {/* Desktop Breadcrumb - left aligned */}
          {!isMobile && <Breadcrumb isDashboard={isDashboard} />}
        </Flex>
        
        <UserMenu />
      </Flex>
      
      {/* Mobile Breadcrumb - below header with border */}
      {isMobile && (
        <Flex 
          width="full" 
          padding="16px" 
          borderBottom="1px solid" 
          borderColor="neutral.gray.800" 
          backgroundColor="#141414"
        >
          <Breadcrumb isMobile={true} isDashboard={isDashboard} />
        </Flex>
      )}
    </>
  );
};

export default DashboardLayoutHeader;
