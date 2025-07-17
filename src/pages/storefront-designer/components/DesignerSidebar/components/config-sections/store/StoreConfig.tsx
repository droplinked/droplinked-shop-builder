import React from 'react';
import { VStack } from '@chakra-ui/react';
import SectionItem from '../../common/SectionItem';
import SocialChannelsSection from './SocialChannelsSection';
import ImageUploadSection from '../../common/ImageUploadSection';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/storefront-designer/en.json';
import localAr from 'locales/storefront-designer/ar.json';

/**
 * Store configuration with profile image and social channels
 */
function StoreConfig(): React.ReactElement {
  const { t } = useLocaleResources('storefront-designer', { en: localEn, ar: localAr });

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title={t('DesignerSidebar.storeConfig.profileImage.title')}>
        <ImageUploadSection fieldName="logo" altText="Logo" />
      </SectionItem>

      <SectionItem title={t('DesignerSidebar.storeConfig.socialChannels.title')}>
        <SocialChannelsSection />
      </SectionItem>
    </VStack>
  );
}

export default StoreConfig;
