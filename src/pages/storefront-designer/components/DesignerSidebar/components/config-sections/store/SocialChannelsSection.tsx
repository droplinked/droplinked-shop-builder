import React, { useCallback, useState, useContext } from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import AppSelectBox from 'components/common/form/select/AppSelectBox';
import { SocialInputs } from './SocialInputs';
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd';
import { designerContext } from 'pages/storefront-designer/context/designerContext';

export type SocialOption = {
  caption: string;
  value: string;
};

// Create the standard social options
const SOCIAL_OPTIONS: SocialOption[] = [
  { caption: '', value: '' },
  { caption: 'LinkedIn', value: 'linkedinURL' },
  { caption: 'Instagram', value: 'instagramURL' },
  { caption: 'Twitter', value: 'twitterURL' },
  { caption: 'Facebook', value: 'facebookURL' },
  { caption: 'Tiktok', value: 'tiktokURL' },
  { caption: 'Web', value: 'webURL' },
  { caption: 'Discord', value: 'discordURL' },
  { caption: 'Telegram', value: 'telegramURL' },
  { caption: 'Youtube', value: 'youtubeURL' },
  { caption: 'Messenger', value: 'messengerURL' }
];

/**
 * Component for managing social media channels
 */
const SocialChannelsSection: React.FC = () => {
  const [activeSocial, setActiveSocial] = useState<string>('');
  const { methods: { dispatch } } = useContext(designerContext);

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
