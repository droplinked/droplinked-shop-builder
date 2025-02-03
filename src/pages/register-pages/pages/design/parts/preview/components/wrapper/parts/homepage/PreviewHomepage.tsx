import { Box, Flex } from '@chakra-ui/layout';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import PreviewActionBar from './components/PreviewActionBar';
import PreviewFilterPanel from './components/PreviewFillterPanel';
import PreviewProducts from './components/PreviewProducts';

function PreviewHomepage() {
  const { state: { shop: { template_options,shopDesign: { foreground }}, device}} = useContext(designContext);
  const isDesktop = useMemo(() => device === 'desktop', [device]);

  return (
    <>
      <Flex justifyContent="center" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-styles']} px={!isDesktop ? '32px' : null}>
        <Flex width={isDesktop ? '85%' : '100%'} gap={'20px'} alignItems="flex-start">
          {isDesktop && (
            <Box width="30%">
              <PreviewFilterPanel />
            </Box>
          )}

          <Box width={isDesktop ? '85%' : '100%'}>
            <Flex flexDirection={'column'} gap={'16px'} alignItems={'flex-start'} alignSelf={'stretch'}>
              {isDesktop && <PreviewActionBar />}
              <PreviewProducts />
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Box borderColor={foreground} borderWidth="1px" height="1px" mt={4} />
    </>
  );
}

export default PreviewHomepage;
