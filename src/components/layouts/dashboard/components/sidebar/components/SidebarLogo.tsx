import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

const SidebarLogo = () => {
  return (
    <Box padding="28px 16px 24px 16px">
      <Link to="/analytics">
        <Flex alignItems="center" gap="12px" cursor="pointer">
          <AppIcons.SidebarDroplinked width="32px" height="32px" />
          <Box display={{ base: 'none', lg: 'block' }}>
            <AppIcons.SidebarDroplinked1 height="24px" color='#2BCFA1' />
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default SidebarLogo;
