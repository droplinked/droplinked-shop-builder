import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import designPreviewContext from '../../../../context';
import PreviewActive from '../../../common/active/PreviewActive';
import SocialMediaLinks from '../../../common/social-media-links/SocialMediaLinks';
import PreviewTypo from '../../../common/typo/PreviewTypo';

function PreviewHiro() {
  const { shop } = useProfile();
  const {
    state: {
      shop: {
        logo,
        backgroundImage,
        backgroundText,
        shopDesign: { hiroTextColor, hiroLayout, textColorParagraphs, foreground, backgroundBody },
        template_options,
        fullWidthHero
      },
      device,
      optionSelected
    }
  } = useContext(designContext);
  const { scrollRef } = useContext(designPreviewContext);

  const isDesktop = useMemo(() => device === 'desktop', [device]);

  const text = useMemo(
    () => (
      <PreviewTypo fontSize={isDesktop ? '20px' : '14px'} fontWeight="bold" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-caption']} color={hiroTextColor}>
        {backgroundText}
      </PreviewTypo>
    ),
    [hiroTextColor, backgroundText, device, template_options]
  );

  const image = useMemo(
    () => backgroundImage && <AppImage objectFit="cover" width={fullWidthHero ? '100%' : 'auto'} height={isDesktop ? '200px' : '150px'} src={backgroundImage} />,
    [backgroundImage, fullWidthHero, isDesktop]
  );

  const style = useMemo(() => template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-styles'], [template_options]);

  const handleLayout = useMemo(() => {
    const layoutProps = {
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      ...style
    };

    switch (hiroLayout) {
      case 'right':
        return (
          <Flex {...layoutProps} flexDirection="row-reverse">
            {image}
            <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" left="7%" textAlign="left">
              {text}
            </Box>
          </Flex>
        );
      case 'left':
        return (
          <Flex {...layoutProps} alignItems="center">
            {image}
            <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" right="7%">
              {text}
            </Box>
          </Flex>
        );
      case 'center':
        return (
          <VStack {...layoutProps}>
            {image}
            <Box position="absolute" top="50%" left="50%" textAlign="center" width="80%" transform="translate(-50%, -50%)">
              {text}
            </Box>
          </VStack>
        );
      case 'right_text':
        return (
          <Box {...layoutProps}>
            {image}
            <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" right="7%" textAlign="right">
              {text}
            </Box>
          </Box>
        );
      case 'left_text':
        return (
          <Box {...layoutProps}>
            {image}
            <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" left="7%">
              {text}
            </Box>
          </Box>
        );
      case 'center_text':
        return (
          <Box {...layoutProps}>
            {image}
            <Box position="absolute" top="50%" left="50%" textAlign="center" width="80%" transform="translate(-50%, -50%)">
              {text}
            </Box>
          </Box>
        );
      default:
        return <span></span>;
    }
  }, [hiroLayout, image, text, style]);

  return (
    <PreviewActive
      section="hero"
      props={{
        ...(optionSelected === 'hero' && { ref: scrollRef }),
        minHeight: '100px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <VStack align="stretch" width="full">
        {handleLayout}    
      </VStack>
      <Flex direction={isDesktop ? 'row' : 'column'} alignItems={isDesktop ? 'center' : 'start'} width={"85%"} margin={'auto'} py={2}>
          {/* Shop logo */}
          <Box width="80px" height="80px" padding="10px" backgroundColor={backgroundBody} rounded="full" marginTop="-45px" zIndex={1}>
            <AppImage src={logo} rounded="full" />
          </Box>

          {/* Shop name */}
          <PreviewTypo fontSize="18px" textAlign="left" fontWeight="bold" color={textColorParagraphs || '#FFF'} wordBreak="break-word" marginLeft={isDesktop ? '12px' : ''}>
            {shop?.description}
          </PreviewTypo>

          {/* Social Media */}
          <SocialMediaLinks shopURLs={shop} foreground={foreground} textColorParagraphs={textColorParagraphs} isDesktop={isDesktop} />
        </Flex>
        <Box borderColor={foreground} borderWidth="1px" height="1px" mb={4} mt={2} />
    </PreviewActive>
  );
}

export default PreviewHiro;
