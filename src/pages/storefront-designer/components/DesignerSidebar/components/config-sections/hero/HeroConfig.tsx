import React from 'react';
import { VStack } from '@chakra-ui/react';
import SectionItem from '../../common/SectionItem';
import ImageUploadSection from '../../common/ImageUploadSection';
import CoverImageSection from './CoverImageSection';
import useLocaleResources from '../../../../../../../hooks/useLocaleResources/useLocaleResources';
import localEn from '../../../../../../../locales/storefront/en.json';
import localAr from '../../../../../../../locales/storefront/ar.json';

/**
 * Hero section configuration with cover and custom image options
 */
function HeroConfig(): React.ReactElement {
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title={t('designerSidebar.heroConfig.coverImage.title')}>
        <CoverImageSection />
      </SectionItem>

      <SectionItem title={t('designerSidebar.heroConfig.customImage.title')}>
        <ImageUploadSection fieldName="backgroundImage" altText="backgroundImage" />
      </SectionItem>
    </VStack>
  );
}

export default HeroConfig;
