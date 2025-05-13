import { Box, Flex, Image, Link, List, ListItem, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';
import SocialMediaLinks from '../common/social-media-links/SocialMediaLinks';
import PreviewTypo from '../common/typo/PreviewTypo';
import PreviewFooterNavigation from './StoreFooterrNavigation';

/**
 * Store footer with logo, navigation links, and copyright information
 */
function StoreFooter(): React.ReactElement {
  const {
    state: {
      shop: designerShop,
      shop: {
        headerIcon,
        shopDesign: { foreground, textColorParagraphs },
        template_options
      },
      device
    }
  } = useContext(designerContext);

  const isDesktop = useMemo(() => device === 'desktop', [device]);
  const licenceLinks = ['Terms & Conditions', 'Returns & FAQ'];

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch">
      {/* Main footer content */}
      <Flex
        width="full"
        height="auto"
        display="flex"
        flexDirection={isDesktop ? 'row' : 'column'}
        justifyContent="space-between"
        alignItems="stretch"
        paddingTop="20px"
        paddingX="20px"
      >
        {/* Left Section - Logo & Social Media */}
        <Box width="auto" height="auto" flex={1} marginBottom={12} textAlign={isDesktop ? 'left' : 'center'}>
          <Image height="50px" maxWidth="100%" marginBottom={4} src={headerIcon} {...template_options?.['--dlk-ftr']?.['--dlk-ftr-logo']} />
          <SocialMediaLinks shopURLs={designerShop} foreground={foreground} textColorParagraphs={textColorParagraphs} isDesktop={isDesktop} />
        </Box>

        {/* Right Section - Footer Navigation */}
        <Flex
          width="auto"
          height="auto"
          display="flex"
          flexDirection="row-reverse"
          justifyContent={isDesktop ? 'flex-end' : 'center'}
          alignItems="stretch"
          flexWrap="wrap"
          gap="15px"
          rowGap="5px"
        >
          <PreviewFooterNavigation />
        </Flex>
      </Flex>

      {/* Footer bottom bar */}
      <Flex
        width="auto"
        height="auto"
        display="flex"
        flexDirection={isDesktop ? 'row' : 'column'}
        justifyContent="space-between"
        flexGrow={{ md: 1 }}
        paddingX={2}
        marginTop={isDesktop ? undefined : 4}
        backgroundColor={foreground}
      >
        {/* Powered by section */}
        <Flex height="auto" display="flex" alignItems="center" fontSize="xs" className="text.subtext.placeholder.dark">
          <PreviewTypo marginRight={2}>Powered by</PreviewTypo>
          <AppIcons.DroplinkedLogo width="64px" color={textColorParagraphs} />
        </Flex>

        {/* Licence links section */}
        <Box width="auto" height="auto" marginTop={{ base: 2, md: 0 }} fontSize="xs">
          <List display="flex" flexWrap="wrap" alignItems="center" spacing={1}>
            {licenceLinks.map((link, index) => (
              <ListItem key={index} display="flex" alignItems="center" marginRight={2}>
                <Link className="text.subtext.placeholder.dark">
                  <PreviewTypo>
                    {link}
                    {index !== licenceLinks.length - 1 && (
                      <PreviewTypo as="span" marginLeft={2}>
                        •
                      </PreviewTypo>
                    )}
                  </PreviewTypo>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </VStack>
  );
}

export default StoreFooter;
