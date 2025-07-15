import { Box, Flex } from '@chakra-ui/react';
import { Refresh2Sm } from 'assets/icons/Action/Refresh2/Refresh2Sm';
import { ChevrondownSm } from 'assets/icons/Navigation/ChevronDown/ChevrondownSm';
import { AppAccordion, AppAccordionItem, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import PreviewTypo from '../../common/typo/PreviewTypo';

const PreviewFilterPanel = () => {
  const { state: { shop: { shopDesign: { foreground, textColorParagraphs } }}} = useContext(designerContext);

  return (
    <Box position="sticky" top="8" w="100%" flexShrink={0} borderWidth="1px" borderRadius="lg" borderColor={foreground}>
      <Flex alignItems="center" justifyContent="space-between" gap={6} p={4} borderBottomWidth="1px" borderBottomColor={foreground}>
        <PreviewTypo fontSize="sm" fontWeight="bold">
          Filters
        </PreviewTypo>
        <Refresh2Sm color={textColorParagraphs} />
      </Flex>
      <AppAccordion multiCollapse={true} display={'flex'} flexDir={'column'} gap={'4px'} py={4} px={2}>
        {/* Type */}
        <AppAccordionItem display="flex" padding="2" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius={4} background={foreground} itemId="4">
          <AppAccordionTrigger>
            <PreviewTypo fontSize="12px" textAlign="left">
              Type
            </PreviewTypo>
            <ChevrondownSm width="16px" height="16px" color={textColorParagraphs}></ChevrondownSm>
          </AppAccordionTrigger>
        </AppAccordionItem>
        {/* Category */}
        <AppAccordionItem display="flex" padding="2" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius={4} background={foreground} itemId="1">
          <AppAccordionTrigger>
            <PreviewTypo fontSize="12px" textAlign="left">
              Collection
            </PreviewTypo>
            <ChevrondownSm width="16px" height="16px" color={textColorParagraphs}></ChevrondownSm>
          </AppAccordionTrigger>
        </AppAccordionItem>
        {/* Price */}
        <AppAccordionItem
          display="flex"
          padding="2"
          flexDirection="column"
          alignItems="flex-start"
          alignSelf="stretch"
          borderRadius={4}
          background={foreground}
          defaultOpen
          itemId="2"
        >
          <AppAccordionTrigger>
            <PreviewTypo fontSize="16px" textAlign="left">
              Price
            </PreviewTypo>
            <ChevrondownSm color={textColorParagraphs}></ChevrondownSm>
          </AppAccordionTrigger>
        </AppAccordionItem>
      </AppAccordion>
    </Box>
  );
};

export default PreviewFilterPanel;
