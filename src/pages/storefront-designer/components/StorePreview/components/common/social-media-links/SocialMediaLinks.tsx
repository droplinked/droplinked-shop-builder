import { Box, Flex, Icon } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppSocialMediaIcons from 'assets/icon/social/appSocialMediaIcons';
import React, { useContext, useMemo, useEffect } from 'react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';

interface SocialMediaLinksProps {
  shopURLs: any;
  foreground: string;
  textColorParagraphs: string;
  isDesktop: boolean;
}

const SocialMediaLinks = ({ shopURLs, foreground, textColorParagraphs, isDesktop }: SocialMediaLinksProps) => {
  // Get preview state from context
  const {
    state: { socialPreview }
  } = useContext(designerContext);

  // Wrap socialMediaLinks in its own useMemo hook
  const socialMediaLinks = useMemo(
    () => [
      { link: 'https://discord.gg/', key: 'discordURL', icon: AppSocialMediaIcons.Discord },
      { link: 'https://instagram.com/', key: 'instagramURL', icon: AppSocialMediaIcons.Instagram },
      { link: 'https://facebook.com/', key: 'facebookURL', icon: AppSocialMediaIcons.Facebook },
      { link: 'mailto:', key: 'infoEmail', icon: AppIcons.Letter },
      { link: 'https://linkedin.com/', key: 'linkedinURL', icon: AppSocialMediaIcons.LinkedIn },
      { link: 'https://tiktok.com/@', key: 'tiktokURL', icon: AppSocialMediaIcons.Tiktok },
      { link: 'https://twitter.com/', key: 'twitterURL', icon: AppSocialMediaIcons.X },
      { link: 'http://', key: 'webURL', icon: AppSocialMediaIcons.Globe },
      { link: 'https://youtube.com/@', key: 'youtubeURL', icon: AppSocialMediaIcons.Youtube },
      { link: 'https://t.me/', key: 'telegramURL', icon: AppSocialMediaIcons.Telegram },
      { link: 'https://m.me/', key: 'messengerURL', icon: AppSocialMediaIcons.Messenger }
    ],
    []
  );

  // Create a list of social media links to display
  const displayItems = useMemo(() => {
    const items: Map<string, { key: string; value: string; icon: any }> = new Map();

    // Important: Make sure we actually have shopURLs before proceeding
    if (!shopURLs) {
      return [];
    }

    // First add all existing saved social media links
    socialMediaLinks.forEach(({ key, icon }) => {
      // Check if the key exists in shopURLs directly
      const value = shopURLs[key];

      if (value && value.length > 0) {
        items.set(key, {
          key,
          value,
          icon
        });
      }
    });

    // If there's an active preview, always add or update it
    if (socialPreview?.showPreview && socialPreview.key) {
      const socialItem = socialMediaLinks.find((item) => item.key === socialPreview.key);
      if (socialItem) {
        items.set(socialPreview.key, {
          key: socialPreview.key,
          value: socialPreview.value || 'placeholder',
          icon: socialItem.icon
        });
      }
    }

    // Convert Map back to array and log for debugging
    const result = Array.from(items.values());
    return result;
  }, [shopURLs, socialPreview, socialMediaLinks]);

  // Return empty flex if no items to display
  if (!displayItems || displayItems.length === 0) {
    return <Flex display="none" />;
  }

  return (
    <Flex gap={2} flexWrap="wrap" alignItems="center" ml={isDesktop ? 'auto' : ''} mr={isDesktop ? '' : 'auto'} mt={isDesktop ? '0px' : '4px'}>
      {displayItems.map(({ key, icon }) => {
        const backgroundColor = foreground;
        // Add a subtle visual indication for items that are in preview state
        const isPreview = socialPreview?.showPreview && socialPreview.key === key;
        const opacity = isPreview && (!shopURLs || !shopURLs[key]) ? 0.85 : 1;

        return (
          <Box
            style={{
              borderRadius: '8px',
              padding: '8px',
              backgroundColor,
              opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s ease-in-out'
            }}
            key={key}
          >
            <Icon as={icon} w="16px" h="16px" color={textColorParagraphs} />
          </Box>
        );
      })}
    </Flex>
  );
};

export default SocialMediaLinks;
