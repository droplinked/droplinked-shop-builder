import { Box, Flex, HStack, Image } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../common/typo/PreviewTypo';
import previewHeaderModel from './model';

/**
 * Store header component showing logo and navigation icons
 */
function StoreHeader(): React.ReactElement {
  const { state: { shop: { headerIcon, shopDesign: { iconHeaderColor }, template_options }, device } } = useContext(designerContext);
  const { icons } = previewHeaderModel;
  const isDesktop = useMemo(() => device === 'desktop', [device]);

  return (
    <Flex
      width="100%"
      height="auto"
      display="flex"
      position="relative"
      justifyContent="space-between"
      alignItems="center"
      padding="8px"
      {...template_options?.['--dlk-hdr']?.['--dlk-hdr-container']}
    >
      <HStack>
        {!isDesktop && <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: 'HamburgerMenu', color: iconHeaderColor })}</Box>}

        <Box>
          {headerIcon ? (
            <Image height={isDesktop ? '25px' : '15px'} src={headerIcon} {...template_options?.['--dlk-hdr']?.['--dlk-hdr-logo']} />
          ) : (
            <Box width="50%">{icons({ icon: 'logo', color: '#FFF' })}</Box>
          )}
        </Box>

        {isDesktop && (
          <PreviewTypo ml={4} fontSize="12px">
            Blogs
          </PreviewTypo>
        )}
      </HStack>

      <HStack gap={isDesktop ? '8px' : '0'} {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-styles']}>
        <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: 'cart', color: iconHeaderColor })}</Box>

        {isDesktop && <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-profile']}>{icons({ icon: 'user', color: iconHeaderColor })}</Box>}
      </HStack>
    </Flex>
  );
}

export default StoreHeader;
