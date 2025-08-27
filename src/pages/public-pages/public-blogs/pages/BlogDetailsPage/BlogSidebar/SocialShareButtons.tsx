import {
  Button,
  HStack,
  Icon
} from '@chakra-ui/react';
import { LinkSm } from 'assets/icons/Action/Link/LinkSm';
import { DiscordMd } from 'assets/icons/SocialMedia/Colorless/Discord/DiscordMd';
import { InstagramMd } from 'assets/icons/SocialMedia/Colorless/Instagram/InstagramMd';
import { LinkedinMd } from 'assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinMd';
import { TelegramMd } from 'assets/icons/SocialMedia/Colorless/Telegram/TelegramMd';
import { XMd } from 'assets/icons/SocialMedia/Colorless/X/XMd';
import useAppToast from 'hooks/toast/useToast';
import React, { useState } from 'react';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  onShare?: (platform: string) => void;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
  onShare
}) => {
  const [copied, setCopied] = useState(false);
  const toast = useAppToast();

  // Use fallback values that work in SSR
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const currentTitle = title || (typeof window !== 'undefined' ? document.title : '');

  const socialPlatforms = [
    { name: 'Link', icon: LinkSm },
    { name: 'X', icon: XMd },
    { name: 'LinkedIn', icon: LinkedinMd },
    { name: 'Instagram', icon: InstagramMd },
    { name: 'Telegram', icon: TelegramMd },
    { name: 'Discord', icon: DiscordMd }
  ];

  const handleShare = async (platform: string) => {
    // Only run share logic in browser
    if (typeof window === 'undefined') return;

    if (onShare) {
      onShare(platform);
      return;
    }

    // Default sharing behavior
    const shareUrls = {
      X: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      Instagram: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`,
      Discord: `https://discord.com/channels/@me?content=${encodeURIComponent(`${currentTitle} ${currentUrl}`)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    } else if (platform === 'Link') {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        toast.showToast({
          type: 'success',
          message: 'Link copied!',
          description: 'The blog link has been copied to your clipboard'
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopied(true);
        toast.showToast({
          type: 'success',
          message: 'Link copied!',
          description: 'The blog link has been copied to your clipboard'
        });
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <HStack spacing={2} justify="flex-start" align="center">
      {socialPlatforms.map((platform) => (
        <Button
          key={platform.name}
          size="40px"
          variant="outline"
          borderColor={platform.name === 'Link' && copied ? 'green.500' : 'neutral.gray.800'}
          borderRadius="lg"
          padding="10px"
          bg={platform.name === 'Link' && copied ? 'green.50' : 'transparent'}
          _hover={{
            bg: platform.name === 'Link' && copied ? 'green.100' : 'neutral.gray.800'
          }}
          onClick={() => handleShare(platform.name)}
          transition="all 0.2s"
        >
          <Icon
            as={platform.icon}
            color={platform.name === 'Link' && copied ? 'green.500' : '#7B7B7B'}
          />
        </Button>
      ))}
    </HStack>
  );
};

export default SocialShareButtons;
