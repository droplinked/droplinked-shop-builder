import { Box, Flex } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';
import PreviewActionBar from './components/PreviewActionBar';
import PreviewFilterPanel from './components/PreviewFillterPanel';
import PreviewProducts from './components/PreviewProducts';

/**
 * Homepage component with product listings and filter options
 */
function PreviewHomepage(): React.ReactElement {
  const { state: { shop: {template_options, shopDesign: { foreground }}, device }} = useContext(designerContext);
  const isDesktop = useMemo(() => device === 'desktop', [device]);

  return (
    <>
      {/* Main content container */}
      <Flex width="100%" height="auto" display="flex" justifyContent="center" paddingX={!isDesktop ? '32px' : undefined} {...template_options?.['--dlk-wrp']?.['--dlk-wrp-styles']}>
        <Flex width={isDesktop ? '85%' : '100%'} height="auto" display="flex" alignItems="flex-start" gap="20px">
          {/* Sidebar filter panel - desktop only */}
          {isDesktop && (
            <Box width="30%" height="auto">
              <PreviewFilterPanel />
            </Box>
          )}

          {/* Products main content */}
          <Box width={isDesktop ? '85%' : '100%'} height="auto">
            <Flex width="auto" height="auto" display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" gap="16px">
              {/* Action bar with sorting - desktop only */}
              {isDesktop && <PreviewActionBar />}

              {/* Product grid */}
              <PreviewProducts />
            </Flex>
          </Box>
        </Flex>
      </Flex>

      {/* Divider line */}
      <Box width="100%" height="1px" borderColor={foreground} borderWidth="1px" marginTop={4} />
    </>
  );
}

export default PreviewHomepage;
