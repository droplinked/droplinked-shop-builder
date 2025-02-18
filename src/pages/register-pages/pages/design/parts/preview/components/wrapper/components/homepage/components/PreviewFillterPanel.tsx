import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import { AppAccordion, AppAccordionItem, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react';
import PreviewTypo from '../../../../common/typo/PreviewTypo';

const PreviewFilterPanel = () => {
  const { state: {shop: { shopDesign: { foreground , textColorParagraphs } } }} = useContext(designContext);

  return (
    <Box position="sticky" top="8" w="100%" flexShrink={0} borderWidth="1px" borderRadius="lg" borderColor={foreground} >
      <Flex alignItems="center" justifyContent="space-between" gap={6} p={4} borderBottomWidth="1px" borderBottomColor={foreground}>
        <PreviewTypo fontSize="sm" fontWeight="bold">
          Filters
        </PreviewTypo>
         <AppIcons.Refresh width="12px" height="12px" color={textColorParagraphs}></AppIcons.Refresh>
      </Flex>
      <AppAccordion multiCollapse={true} display={'flex'} flexDir={'column'} gap={'4px'} py={4} px={2}>
        {/* Type */}
        <AppAccordionItem display="flex" padding="2" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius={4} background={foreground} itemId="4">
          <AppAccordionTrigger>
            <PreviewTypo  fontSize="12px" textAlign="left">
              Type
            </PreviewTypo>
             <AppIcons.SidebarChevrondown width="12px" height="12px" color={textColorParagraphs}></AppIcons.SidebarChevrondown>
          </AppAccordionTrigger>
        </AppAccordionItem>
        {/* Category */}
        <AppAccordionItem display="flex" padding="2" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius={4} background={foreground} itemId="1">
          <AppAccordionTrigger>
            <PreviewTypo  fontSize="12px" textAlign="left">
              Collection
            </PreviewTypo>
             <AppIcons.SidebarChevrondown width="12px" height="12px" color={textColorParagraphs}></AppIcons.SidebarChevrondown>
          </AppAccordionTrigger>
        </AppAccordionItem>
        {/* Price */}
        <AppAccordionItem display="flex" padding="2" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius={4} background={foreground} defaultOpen itemId="2">
          <AppAccordionTrigger>
            <PreviewTypo  fontSize="12px" textAlign="left">
              Price
            </PreviewTypo>
             <AppIcons.SidebarChevrondown width="12px" height="12px" color={textColorParagraphs}></AppIcons.SidebarChevrondown>
          </AppAccordionTrigger>
        </AppAccordionItem>
      </AppAccordion>
    </Box>
  );
};

export default PreviewFilterPanel;
