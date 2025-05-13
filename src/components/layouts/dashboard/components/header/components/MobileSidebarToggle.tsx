import { IconButton } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MobileSidebarToggle = ({ isSidebarOpen, setIsSidebarOpen, isDashboard }) => {
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    if (isDashboard === false) {
      navigate('/analytics/dashboard');
      return;
    }
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <IconButton
      aria-label="Toggle Sidebar"
      icon={<AppIcons.SideBarExpand width="20px" height="20px" />}
      onClick={handleSidebarToggle}
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
