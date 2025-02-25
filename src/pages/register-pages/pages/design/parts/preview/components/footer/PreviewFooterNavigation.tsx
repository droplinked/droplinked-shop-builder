import { Box, Flex, Link } from '@chakra-ui/react';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import AppIcons from 'assets/icon/Appicons';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../common/typo/PreviewTypo';

export default function PreviewFooterNavigation() {
  const { state: { shop: { shopDesign: { footerLinks, textColorParagraphs } }, device } } = useContext(designContext);

  const isDesktop = useMemo(() => device === 'desktop', [device]);

  return (
    <Flex direction={isDesktop ? 'row' : 'column'} gap={4} w="full">
      {[
        { title: 'Site', links: [{ caption: 'Home' }, { caption: 'Blogs' }] },
        { title: 'Links', links: footerLinks }
      ].map(
        ({ title, links }, idx) =>
          links.length > 0 && (
            <Box key={idx} mb={{ base: 4, md: 0 }} w={{ base: 'full', md: 'auto' }}>
              <PreviewTypo fontSize="sm" mb={2}>
                {title}
              </PreviewTypo>
              <Box as="ul">
                {links.map(({ caption, link }, index) => (
                  <Link
                    key={index}
                    href={title === 'Links' ? link : undefined}
                    display="flex"
                    alignItems="center"
                    fontSize="sm"
                    color="gray.300"
                    _hover={{ color: textColorParagraphs }}
                    className="group"
                  >
                    {caption}
                    <Box
                      ml={1}
                      boxSize={4}
                      alignContent={'center'}
                      transform="translateX(-4px)"
                      opacity={0}
                      transition="transform 0.2s ease-out, opacity 0.2s ease-out"
                      _groupHover={{ transform: 'translateX(0)', opacity: 1 }}
                    >
                      <AppIcons.ArrowRight height={'12px'} width="12px" />
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          )
      )}
    </Flex>
  );
}
