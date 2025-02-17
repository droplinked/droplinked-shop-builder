import { Box, Flex, Icon } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppSocialMediaIcons from 'assest/icon/social/appSocialMediaIcons';
import React from 'react';

const SocialMediaLinks = ({ shopURLs, foreground, textColorParagraphs, isDesktop }) => {
  const socialMediaLinks = [
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
  ];

  return (
    <Flex gap={2} alignItems="center" ml={isDesktop ? 'auto' : ''} mr={isDesktop ? '' : 'auto'} mt={isDesktop ? '0px' : '4px'}>
      {socialMediaLinks
        .filter(({ key }) => !!shopURLs[key])
        .map(({ link, key, icon }) => {
          const url = shopURLs[key];
          if (!url) return null;
          const backgroundColor = foreground;

          return (
            <Box style={{ borderRadius: '8px', padding: '8px', backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={key}>
              <Icon as={icon} w="16px" h="16px" color={textColorParagraphs} />
            </Box>
          );
        })}
    </Flex>
  );
};

export default SocialMediaLinks;
