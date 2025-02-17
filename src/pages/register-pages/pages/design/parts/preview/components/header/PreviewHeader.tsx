import { Box, Flex, HStack, Image } from '@chakra-ui/react';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import designPreviewContext from '../../context';
import PreviewActive from '../common/active/PreviewActive';
import PreviewTypo from '../common/typo/PreviewTypo';
import previewHeaderModel from './model';

function PreviewHeader() {
  const { state: { shop: { headerIcon, shopDesign: { iconHeaderColor, backgroundBody}, template_options }, device, optionSelected }} = useContext(designContext);
  const { icons } = previewHeaderModel;
  const { scrollRef } = useContext(designPreviewContext);

  const isDesktop = useMemo(() => device === 'desktop', [device]);

  return (
    <PreviewActive
      section="header"
      props={{
        ...(['header', 'theme'].includes(optionSelected) && { ref: scrollRef }),
        ...template_options?.['--dlk-hdr']?.['--dlk-hdr-styles'],
        justifyContent: 'center',
        display: 'flex',
        position: 'absolute',
        zIndex: '1',
        top: isDesktop ? '5px 0' : '10px 0',
        right: '0',
        left: '0',
        bg: backgroundBody || '#1e1e1e'
      }}
    >
      <Flex justifyContent="space-between" alignItems="center" {...template_options?.['--dlk-hdr']?.['--dlk-hdr-container']} width="85%" padding="8px 0">
        <HStack>
          {!isDesktop && <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: 'HamburgerMenu', color: iconHeaderColor })}</Box>}
          <Box>
            {headerIcon ? (
              <Image {...template_options?.['--dlk-hdr']?.['--dlk-hdr-logo']} height={isDesktop ? '25px' : '15px'} src={headerIcon} />
            ) : (
              <Box width="50%">{icons({ icon: 'logo', color: '#FFF' })}</Box>
            )}
          </Box>
          {isDesktop && <PreviewTypo ml={4} fontSize={"12px"}> Blogs</PreviewTypo>}
        </HStack>

        <HStack gap={isDesktop ? '8px' : '0'} {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-styles']}>
          <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: 'cart', color: iconHeaderColor })}</Box>
          {isDesktop && <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-profile']}>{icons({ icon: 'user', color: iconHeaderColor })}</Box>}
        </HStack>
      </Flex>
    </PreviewActive>
  );
}

export default PreviewHeader;
