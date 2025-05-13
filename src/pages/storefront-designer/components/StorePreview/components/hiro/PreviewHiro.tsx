import { Box, Flex } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import { useProfile } from 'hooks/useProfile/useProfile';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import SocialMediaLinks from '../common/social-media-links/SocialMediaLinks';
import PreviewTypo from '../common/typo/PreviewTypo';

/**
 * Hero banner component with background image, logo and shop information
 */
function PreviewHiro(): React.ReactElement {
  const { shop } = useProfile();
  const {
    state: {
      shop: designerShop,
      shop: { logo, backgroundImage, shopDesign: { textColorParagraphs, foreground, backgroundBody } },
      device
    }
  } = useContext(designerContext);

  const isDesktop = device === 'desktop';

  /**
   * Get responsive image height based on device type
   */
  const getImageHeight = (): string => {
    switch (device) {
      case 'desktop':
        return '400px';
      case 'tablet':
        return '250px';
      case 'mobile':
        return '200px';
      default:
        return '400px';
    }
  };

  return (
    <>
      <AppImage width="100%" height={getImageHeight()} objectFit="cover" src={backgroundImage} />

      <Flex width="85%" height="auto" display="flex" flexDirection={isDesktop ? 'row' : 'column'} alignItems={isDesktop ? 'center' : 'start'} margin="auto" paddingY={2}>
        {/* Shop logo */}
        <Box
          width={isDesktop ? '136px' : '88px'}
          height={isDesktop ? '136px' : '88px'}
          position="relative"
          zIndex={1}
          padding="4px"
          marginTop={isDesktop ? '-78px' : '-45px'}
          backgroundColor={backgroundBody}
          borderRadius="full"
        >
          <AppImage src={logo} rounded="full" />
        </Box>

        {/* Shop name */}
        <PreviewTypo fontSize="18px" fontWeight="bold" color={textColorParagraphs || '#FFF'} textAlign="left" wordBreak="break-word" marginLeft={isDesktop ? '12px' : ''}>
          {shop?.description}
        </PreviewTypo>

        {/* Social Media */}
        <SocialMediaLinks shopURLs={designerShop} foreground={foreground} textColorParagraphs={textColorParagraphs} isDesktop={isDesktop} />
      </Flex>

      <Box width="100%" height="1px" borderColor={foreground} borderWidth="1px" marginTop={2} marginBottom={4} />
    </>
  );
}

export default PreviewHiro;
