import { MenuButton } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React from 'react';

const UserMenuButton = () => {
  return (
    <MenuButton
      cursor="pointer"
      display="flex"
      padding="10px"
      justifyContent="center"
      alignItems="center"
      gap="4px"
      borderRadius="8px"
      border="1px solid #3C3C3C"
      background="#1C1C1C"
      right={'16px'}
      _hover={{ backgroundColor: '#222' }}
    >
      <AppIcons.SidebarUser width="20px" height="20px" />
    </MenuButton>
  );
};

export default UserMenuButton;
