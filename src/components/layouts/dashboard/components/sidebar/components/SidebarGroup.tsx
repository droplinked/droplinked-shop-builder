import { Box, Divider, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import SidebarItem from './SidebarItem';

const SidebarGroup = ({ group }) => {
  return (
    <Box width="232px" display="flex" flexDirection="column" gap="8px">
      {/* Sidebar Group Title */}
      <Flex height="16px" paddingLeft="12px" alignItems="center">
        <AppTypography color="#7B7B7B" fontFamily="Inter" fontSize="10px" fontWeight="400" lineHeight="16px" whiteSpace={'nowrap'} display={{ sm: 'block', md: 'none', lg: 'block' }}>
          {group.group}
        </AppTypography>
      </Flex>

      <Flex alignItems="center">
        <Divider borderColor={"#292929"} display={{ sm: 'none', md: 'block', lg: 'none' }}></Divider>
      </Flex>

      {/* Sidebar Items */}
      {group.items?.map((item) => (
        <SidebarItem key={item.title} item={item} />
      ))}
    </Box>
  );
};

export default SidebarGroup;
