import { Box, Flex, Icon } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import { GlobeSm } from 'assets/icons/Sign/Globe/GlobeSm';
import { DiscordSm } from 'assets/icons/SocialMedia/Colored/Discord/DiscordSm';
import { FacebookSm } from 'assets/icons/SocialMedia/Colored/Facebook/FacebookSm';
import { InstagramSm } from 'assets/icons/SocialMedia/Colored/Instagram/InstagramSm';
import { LinkedinSm } from 'assets/icons/SocialMedia/Colored/LinkedIn/LinkedinSm';
import { Telegram1Sm } from 'assets/icons/SocialMedia/Colored/Telegram1/Telegram1Sm';
import { TiktoklightSm } from 'assets/icons/SocialMedia/Colored/TikTokLight/TiktoklightSm';
import { YoutubeSm } from 'assets/icons/SocialMedia/Colored/YouTube/YoutubeSm';
import { MessengerSm } from 'assets/icons/SocialMedia/Colored/Messenger/MessengerSm';
import { XSm } from 'assets/icons/SocialMedia/Colorless/X/XSm';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';

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
      { link: 'https://discord.gg/', key: 'discordURL', icon: DiscordSm },
      { link: 'https://instagram.com/', key: 'instagramURL', icon: InstagramSm },
      { link: 'https://facebook.com/', key: 'facebookURL', icon: FacebookSm },
      { link: 'mailto:', key: 'infoEmail', icon: AppIcons.Letter },
      { link: 'https://linkedin.com/', key: 'linkedinURL', icon: LinkedinSm },
      { link: 'https://tiktok.com/@', key: 'tiktokURL', icon: TiktoklightSm },
      { link: 'https://twitter.com/', key: 'twitterURL', icon: XSm },
      { link: 'http://', key: 'webURL', icon: GlobeSm },
      { link: 'https://youtube.com/@', key: 'youtubeURL', icon: YoutubeSm },
      { link: 'https://t.me/', key: 'telegramURL', icon: Telegram1Sm },
      { link: 'https://m.me/', key: 'messengerURL', icon: MessengerSm }
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
