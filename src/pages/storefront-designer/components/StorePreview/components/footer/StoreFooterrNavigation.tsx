import { Box, Flex } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import PreviewTypo from '../common/typo/PreviewTypo';

export default function StoreFooterNavigation() {
  const { state: { shop: { shopDesign: { footerLinks} }, device } } = useContext(designerContext);;

  const isDesktop = () => device === 'desktop';

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
                {links.map(({ caption }, index) => (
                  <PreviewTypo
                    key={index}
                    display="flex"
                    alignItems="center"
                    fontSize="sm"
                    color="gray.300"
                    className="group"
                  >
                    {caption}
                  </PreviewTypo>
                ))}
              </Box>
            </Box>
          )
      )}
    </Flex>
  );
}
