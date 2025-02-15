import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import DashboardLinkWrapper from '../../common/DashboardLinkWrapper';

const SidebarSubmenuTooltip = ({ title, items }) => {
  if (items.length === 0) return null;

  return (
    <Box position="relative" width="300px">
      {/* First SVG */}
      <Box position="absolute" top="36px" left="0">
        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.75 6.83494C0.0833318 7.79719 0.083336 10.2028 1.75 11.1651L10.75 16.3612C12.4167 17.3235 14.5 16.1207 14.5 14.1962V3.80385C14.5 1.87934 12.4167 0.676535 10.75 1.63878L1.75 6.83494Z"
            fill="#1C1C1C"
            stroke="#292929"
          />
        </svg>
      </Box>

      {/* Main Content Box */}
      <Flex position="absolute" top="0" left="12px" bg="#1b1b1b" borderRadius="lg" border="1px solid #282828" flexDirection="column" justifyContent="end" alignItems="center" overflow="hidden">
        {/* Header */}
        <Flex w="full" p="4" justifyContent="start" alignItems="center" gap="3">
          <Text flex="1" color="white" fontSize="sm" fontWeight="normal" lineHeight="tight">
            {title}
          </Text>
        </Flex>

        {/* Divider */}
        <Box w="full">
          <Divider borderColor="#282828" />
        </Box>

        {/* Content List */}
        <Flex w="full" px="5" py="4" flexDirection="column" justifyContent="center" alignItems="start" gap="3">
          {items.map((item, index) => (
            <Flex key={index} h="5" justifyContent="start" alignItems="center">
              <DashboardLinkWrapper key={item.listTitle} linkTo={item.linkTo} onClick={item.onClick}>
                <AppTypography color="#b1b1b1" fontSize="sm" fontWeight="normal" lineHeight="tight">
                  {item.listTitle}
                </AppTypography>
              </DashboardLinkWrapper>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Second SVG */}
      <Box position="absolute" top="36px" left="0">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 9.73205C-0.333332 8.96225 -0.333334 7.03775 0.999999 6.26795L10 1.0718C11.3333 0.301996 13 1.26425 13 2.80385V13.1962C13 14.7358 11.3333 15.698 10 14.9282L1 9.73205Z"
            fill="#1C1C1C"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default SidebarSubmenuTooltip;
