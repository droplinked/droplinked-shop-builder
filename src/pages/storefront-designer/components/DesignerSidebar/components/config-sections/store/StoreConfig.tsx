import React from 'react';
import { VStack } from '@chakra-ui/react';
import SectionItem from '../../common/SectionItem';
import SocialChannelsSection from './SocialChannelsSection';
import ImageUploadSection from '../../common/ImageUploadSection';

/**
 * Store configuration with profile image and social channels
 */
function StoreConfig(): React.ReactElement {
  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title="Profile Image">
        <ImageUploadSection fieldName="logo" altText="Logo" />
      </SectionItem>

      <SectionItem title="Social Channels">
        <SocialChannelsSection />
      </SectionItem>
    </VStack>
  );
}

export default StoreConfig;
