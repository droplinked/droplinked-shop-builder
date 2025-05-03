import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import SidebarItem from './SidebarItem';

const SidebarGroup = ({ group, index }) => {
  return (
    <Box
      width={{ base: "232px", md: "min-content", lg: "232px" }}
      display={"flex"}
      flexDirection="column"
      gap={{ base: "8px", md: "unset", lg: "8px" }}
    >
      {/* Sidebar Group Title */}
      <Flex display={{ sm: 'flex', md: 'none', lg: 'flex' }} paddingLeft="12px" alignItems="center">
        <AppTypography color="text.subtext.placeholder.dark" fontFamily="Inter" fontSize="10px" fontWeight="400" lineHeight="16px" whiteSpace={'nowrap'}>
          {group.group}
        </AppTypography>
      </Flex>

      {index !== 0 &&
        <Flex display={{ sm: 'none', md: 'flex', lg: 'none' }} mb={6} alignItems="center">
          <Divider borderColor={"neutral.gray.800"} display="block" />
        </Flex>
      }

      {/* Sidebar Items */}
      {group.items?.map((item) => (
        <VStack key={item.title} gap={{ base: "8px", md: "4px", lg: "8px" }} width={{ base: "100%", md: "min-content", lg: "100%" }}>
          <SidebarItem item={item} />
        </VStack>
      ))}
    </Box>
  );
};

export default SidebarGroup;
