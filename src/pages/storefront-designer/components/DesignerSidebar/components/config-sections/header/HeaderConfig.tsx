import { Flex, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import ImageUploadSection from '../../common/ImageUploadSection';
import SectionItem from '../../common/SectionItem';
import IconColorSection from './IconColorSection';
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';
import { designerContext } from 'pages/storefront-designer/context/designerContext';

/**
 * Header configuration with logo, favicon, and icon color settings
 */
function HeaderConfig(): React.ReactElement {
  const { methods: { dispatch }, state: {shop: { shopDesign: { isLogoAsFavicon } } }} = useContext(designerContext);

  /**
   * Handle favicon toggle switch changes
   */
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isLogoAsFavicon = e.target.checked;
    dispatch({ type: 'updateShop', params: { shopDesign: { isLogoAsFavicon } } });
  };

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title="Logo">
        <Flex width="100%" height="auto" display="flex" flexDirection="column" gap="16px" alignItems="space-between" alignSelf="stretch">
          <ImageUploadSection fieldName="headerIcon" altText="headerIcon" />
          <Flex
            width="100%"
            height="auto"
            display="flex"
            alignItems="center"
            gap="12px"
            alignSelf="stretch"
            padding="12px"
            borderRadius="8px"
            border="1px solid"
            borderColor="neutral.gray.800"
            bg="neutral.gray.900"
          >
            <AppTypography fontSize="14px" fontWeight={400} color="white">
              Use as favicon on browser
            </AppTypography>
            <AppSwitch isChecked={isLogoAsFavicon} onChange={handleSwitchChange} />
          </Flex>
        </Flex>
      </SectionItem>

      <SectionItem title="Favicon">
        <ImageUploadSection fieldName="faviconURL" fieldPath="shopDesign.faviconURL" altText="Favicon" />
      </SectionItem>

      <SectionItem title="Icon Color on Navigation Bar">
        <IconColorSection />
      </SectionItem>
    </VStack>
  );
}

export default HeaderConfig;
