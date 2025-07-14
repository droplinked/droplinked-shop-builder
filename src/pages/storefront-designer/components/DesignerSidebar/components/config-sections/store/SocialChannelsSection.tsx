import React, { useCallback, useState, useContext } from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import AppSelectBox from 'components/common/form/select/AppSelectBox';
import { SocialInputs } from './SocialInputs';
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localCommonEn from 'locales/common/en.json';
import localCommonAr from 'locales/common/ar.json';

export type SocialOption = {
  caption: string;
  value: string;
};

/**
 * Component for managing social media channels
 */
const SocialChannelsSection: React.FC = () => {
  const [activeSocial, setActiveSocial] = useState<string>('');
  const { methods: { dispatch } } = useContext(designerContext);
  const { t } = useLocaleResources('common', { en: localCommonEn, ar: localCommonAr });

  // Create the standard social options with translations
  const SOCIAL_OPTIONS: SocialOption[] = [
    { caption: '', value: '' },
    { caption: t('socialMedia.linkedin'), value: 'linkedinURL' },
    { caption: t('socialMedia.instagram'), value: 'instagramURL' },
    { caption: t('socialMedia.twitter'), value: 'twitterURL' },
    { caption: t('socialMedia.facebook'), value: 'facebookURL' },
    { caption: t('socialMedia.tiktok'), value: 'tiktokURL' },
    { caption: t('socialMedia.web'), value: 'webURL' },
    { caption: t('socialMedia.discord'), value: 'discordURL' },
    { caption: t('socialMedia.telegram'), value: 'telegramURL' },
    { caption: t('socialMedia.youtube'), value: 'youtubeURL' },
    { caption: t('socialMedia.messenger'), value: 'messengerURL' }
  ];

  const handleSocialChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      // Set the active social channel
      setActiveSocial(value);
      
      // When selecting a new social channel, create a temporary empty preview
      // This will display a new icon in the preview until the user inputs a value
      dispatch({
        type: 'updateState',
        params: {
          socialPreview: {
            key: value,
            value: '', // Empty default value
            showPreview: true
          }
        }
      });
    }
    e.target.value = '';
  }, [dispatch]);

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <SocialInputs activeSocialId={activeSocial} onUpdateActiveSocial={setActiveSocial} />
      <Box position="relative">
        {/* Hidden span that shows icon+text, positioned absolutely over the "New" option */}
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          width="100%" 
          height="100%" 
          pointerEvents="none" 
          zIndex="1"
          paddingLeft="10px"
          display="flex"
          alignItems="center"
        >
          <HStack spacing={2}>
            <PlusMd color="white" />
            <Text color="white">New</Text>
          </HStack>
        </Box>
        <AppSelectBox onChange={handleSocialChange} items={SOCIAL_OPTIONS} />
      </Box>
    </VStack>
  );
};

export default SocialChannelsSection;
