import React from 'react';
import {
  HStack,
  Button,
  Icon
} from '@chakra-ui/react';
import { LinkSm } from 'assets/icons/Action/Link/LinkSm';
import { XMd } from 'assets/icons/SocialMedia/Colorless/X/XMd';
import { LinkedinMd } from 'assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinMd';
import { InstagramMd } from 'assets/icons/SocialMedia/Colorless/Instagram/InstagramMd';
import { TelegramMd } from 'assets/icons/SocialMedia/Colorless/Telegram/TelegramMd';
import { DiscordMd } from 'assets/icons/SocialMedia/Colorless/Discord/DiscordMd';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  onShare?: (platform: string) => void;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url = window.location.href,
  title = document.title,
  onShare
}) => {
  const socialPlatforms = [
    { name: 'Link', icon: LinkSm },
    { name: 'X', icon: XMd },
    { name: 'LinkedIn', icon: LinkedinMd },
    { name: 'Instagram', icon: InstagramMd },
    { name: 'Telegram', icon: TelegramMd },
    { name: 'Discord', icon: DiscordMd }
  ];

  const handleShare = (platform: string) => {
    if (onShare) {
      onShare(platform);
      return;
    }

    // Default sharing behavior
    const shareUrls = {
      X: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Discord: `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=bot`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    } else if (platform === 'Link') {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <HStack spacing={2} justify="flex-start" align="center">
      {socialPlatforms.map((platform) => (
        <Button
          key={platform.name}
          size="40px"
          variant="outline"
          borderColor='neutral.gray.800'
          borderRadius="lg"
          padding="10px"
          bg="transparent"
          _hover={{ bg: 'neutral.gray.800' }}
          onClick={() => handleShare(platform.name)}
        >
          <Icon
            as={platform.icon}
            color="#7B7B7B"
          />
        </Button>
      ))}
    </HStack>
  );
};

export default SocialShareButtons;
