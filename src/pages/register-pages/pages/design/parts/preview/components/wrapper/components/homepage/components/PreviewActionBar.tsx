import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react';
import PreviewTypo from '../../../../common/typo/PreviewTypo';

const PreviewActionBar = () => {
  const { state: { shop: { shopDesign: { backgroundBody, foreground } } } } = useContext(designContext);

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
      {/* Left Side: Filters and Search */}
      <Flex justifyContent="start" alignItems="center" >
        {/* Search Input */}
        <Box bg={backgroundBody}>
          <Flex direction="column" justify="start" align="start" gap={2} w="full">
            <Flex w="full" justify="start" align="start">
              <Flex grow={1} py="2" borderRadius="lg" border="1px solid" borderColor={foreground} align="center" gap={2}>
                {/* Icon Placeholder */}
                <Box w="16px" h="16px" ml={2} display="flex" justifyContent="center" alignItems="center">
                  <AppIcons.Search />
                </Box>
                {/* Search Input Field */}
                <PreviewTypo mr={6} flex={1} color={"text.subtextPlaceholder.dark"} fontSize="xs" fontWeight="normal" fontFamily="Inter" lineHeight="normal">
                  Search
                </PreviewTypo>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {/* Right Side: Sort Dropdown */}
      <Box>
        <Flex direction="column" justify="start" align="start" gap="8px" w="full">
          <Flex w="full" justify="start" align="start">
            <Flex grow={1} py="2" px="6px" bg={backgroundBody} borderRadius="md" border="1px solid" borderColor={foreground} align="center" gap="8px">
              {/* Sort Text */}
              <PreviewTypo flex={1} color={"text.subtextPlaceholder.dark"} fontSize="xs" fontWeight="normal" fontFamily="Inter" lineHeight="normal">
                Sort Products
              </PreviewTypo>
              {/* Icon Placeholder */}
              <AppIcons.SidebarChevrondown width="12px" height="12px" color={"text.subtextPlaceholder.dark"}></AppIcons.SidebarChevrondown>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PreviewActionBar;
