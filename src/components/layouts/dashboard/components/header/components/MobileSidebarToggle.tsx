import { IconButton } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

const MobileSidebarToggle = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <IconButton
      aria-label="Toggle Sidebar"
      icon={<AppIcons.SideBarExpand width="20px" height="20px" />}
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      _hover={{ backgroundColor: '#222' }}
      backgroundColor="neutral.gray.1000"
      color="white"
      border="1px solid #3C3C3C"
      position="absolute"
      top="16px"
      left="24px"
    />
  );
};

export default MobileSidebarToggle;
