import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DesignerHeader from './components/DesignerHeader/DesignerHeader';
import DesignerSidebar from './components/DesignerSidebar/DesignerSidebar';
import MobileMessage from './components/MobileMessage/MobileMessage';
import StorePreview from './components/StorePreview/StorePreview';
import { DesignerProvider } from './context/DesignerProvider';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

/**
 * Main storefront designer component with responsive layout
 */
function StorefrontDesigner(): React.ReactElement {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  const { isRTL } = useLocaleResources('storefront');

  // Display mobile notice for small screens
  if (isSmallScreen) {
    return (
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" py={8}>
        <MobileMessage />
      </Box>
    );
  }

  return (
    <DesignerProvider>
      <DesignerHeader />
      {/* Designer workspace with sidebar and preview area */}
      <Flex width="100%" maxW="1800px" height="auto" display="flex" position="relative" flex="1" mx="auto" px="36px" pt="24px" pb="36px">
        {/* Sticky sidebar */}
        <Box 
          position="sticky" 
          top="24px"
          alignSelf="flex-start"
          margin={isRTL ? "0 0 0 24px" : "0 24px 0 0"}
          flex="none"
        >
          <DesignerSidebar />
        </Box>

        {/* Store preview area */}
        <Box width="auto" height="auto" minHeight="100%" flex="1" overflow="visible">
          <StorePreview />
        </Box>
      </Flex>
    </DesignerProvider>
  );
}

export default StorefrontDesigner;
