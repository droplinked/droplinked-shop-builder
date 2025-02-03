import { Image } from '@chakra-ui/image';
import { Box, Flex, Link, List, ListItem, VStack } from '@chakra-ui/layout';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import designPreviewContext from '../../context';
import PreviewActive from '../common/active/PreviewActive';
import PreviewTypo from '../common/typo/PreviewTypo';
import SocialMediaLinks from '../common/social-media-links/SocialMediaLinks';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import PreviewFooterNavigation from './PreviewFooterNavigation';

function PreviewFooter() {
  const { shop } = useProfile();
  const {
    state: {
      shop: {
        headerIcon,
        shopDesign: { foreground, textColorParagraphs },
        template_options
      },
      device,
      optionSelected
    }
  } = useContext(designContext);
  const { scrollRef } = useContext(designPreviewContext);

  const isDesktop = useMemo(() => device === 'desktop', [device]);

  const licenceLinks = ['Terms & Conditions', 'Returns & FAQ'];

  return (
    <PreviewActive
      section="footer"
      props={{
        ...(optionSelected === 'footer' && { ref: scrollRef }),
        section: 'footer',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0',
        ...template_options?.['--dlk-ftr']?.['--dlk-ftr-styles']
      }}
    >
      <VStack align="stretch" width="100%">
        <Flex flexDirection={isDesktop ? 'row' : 'column'} justifyContent="space-between" alignItems="stretch" w="full" pt={'20px'} px={"20px"}>
          {/* Left Section - Logo & Social Media */}
          <Box mb={12} flex={1} textAlign={isDesktop ? 'left' : 'center'}>
            <Image maxWidth="100%" height="50px" mb={4} {...template_options?.['--dlk-ftr']?.['--dlk-ftr-logo']} src={headerIcon} />
            <SocialMediaLinks shopURLs={shop} foreground={foreground} textColorParagraphs={textColorParagraphs} isDesktop={isDesktop} />
          </Box>

          {/* Right Section - Footer Navigation */}
          <Flex flexDirection="row-reverse" justifyContent={isDesktop ? 'flex-end' : 'center'} align="stretch" flexWrap="wrap" gap="15px" rowGap="5px">
            <PreviewFooterNavigation />
          </Flex>
        </Flex>

        <Flex direction={isDesktop ? 'row' : 'column'} justify="space-between" flexGrow={{ md: 1 }} px={2} mt={isDesktop ? null : 4} bg={foreground}>
          {/* Powered by section */}
          <Flex align="center" fontSize="xs" className={'#7b7b7b'}>
            <PreviewTypo>Powered by</PreviewTypo>
            {/* <Box as={AppIcons.DroplinkedLogo} ml={2} h={5} className={logoColor} /> */}
          </Flex>

          {/* Licence links section */}
          <Box mt={{ base: 2, md: 0 }} fontSize="xs">
            <List display="flex" flexWrap="wrap" alignItems="center" spacing={1}>
              {licenceLinks.map((link, index) => (
                <ListItem key={index} mr={2} display="flex" alignItems="center">
                  <Link className={'#7b7b7b'}>
                    <PreviewTypo>
                      {link}
                      {index !== licenceLinks.length - 1 && (
                        <PreviewTypo as="span" ml={2}>
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
    </PreviewActive>
  );
}

export default PreviewFooter;
