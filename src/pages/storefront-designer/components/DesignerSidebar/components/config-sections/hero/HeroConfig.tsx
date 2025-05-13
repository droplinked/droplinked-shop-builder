import React from 'react';
import { VStack } from '@chakra-ui/react';
import SectionItem from '../../common/SectionItem';
import ImageUploadSection from '../../common/ImageUploadSection';
import CoverImageSection from './CoverImageSection';

/**
 * Hero section configuration with cover and custom image options
 */
function HeroConfig(): React.ReactElement {
  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title="Cover Image">
        <CoverImageSection />
      </SectionItem>

      <SectionItem title="Custom Image">
        <ImageUploadSection fieldName="backgroundImage" altText="backgroundImage" />
      </SectionItem>
    </VStack>
  );
}

export default HeroConfig;
