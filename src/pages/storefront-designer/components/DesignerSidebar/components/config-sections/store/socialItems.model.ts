import React from "react";
import { DiscordSm } from "assets/icons/SocialMedia/Colored/Discord/DiscordSm";
import { FacebookSm } from "assets/icons/SocialMedia/Colored/Facebook/FacebookSm";
import { InstagramSm } from "assets/icons/SocialMedia/Colored/Instagram/InstagramSm";
import { LinkedinSm } from "assets/icons/SocialMedia/Colored/LinkedIn/LinkedinSm";
import { TiktoklightSm } from "assets/icons/SocialMedia/Colored/TikTokLight/TiktoklightSm";
import { XSm } from "assets/icons/SocialMedia/Colorless/X/XSm";
import { GlobeSm } from "assets/icons/Sign/Globe/GlobeSm";
import { Telegram1Sm } from "assets/icons/SocialMedia/Colored/Telegram1/Telegram1Sm";
import { YoutubeSm } from "assets/icons/SocialMedia/Colored/YouTube/YoutubeSm";
import { MessengerSm } from "assets/icons/SocialMedia/Colored/Messenger/MessengerSm";

export interface SocialItemModel {
  icon: React.ReactNode;
  value: string | undefined;
  url: string;
  pattern: RegExp;
  label: string;
}

export interface SocialItemsState {
  [key: string]: SocialItemModel;
}

type TranslateFunction = (key: string) => string;

export const createSocialItems = (shop: any, t: TranslateFunction): SocialItemsState => {
  
  const {
    discordURL,
    facebookURL,
    instagramURL,
    linkedinURL,
    tiktokURL,
    twitterURL,
    webURL,
    telegramURL,
    youtubeURL,
    messengerURL,
  } = shop;
  
  return {
    linkedinURL: {
      icon: React.createElement(LinkedinSm),
      value: linkedinURL,
      url: "linkedin.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^/]+)\/?$/,
      label: t('socialMedia.linkedin')
    },
    instagramURL: {
      icon: React.createElement(InstagramSm),
      value: instagramURL,
      url: "instagram.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/]+)\/?$/,
      label: t('socialMedia.instagram')
    },
    twitterURL: {
      icon: React.createElement(XSm),
      value: twitterURL,
      url: "twitter.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?([^/]+)\/?$/,
      label: t('socialMedia.twitter')
    },
    facebookURL: {
      icon: React.createElement(FacebookSm),
      value: facebookURL,
      url: "facebook.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:profile\.php\?id=|([^/]+)\/?)$/,
      label: t('socialMedia.facebook')
    },
    tiktokURL: {
      icon: React.createElement(TiktoklightSm),
      value: tiktokURL,
      url: "tiktok.com/@",
      pattern: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/]+)\/?$/,
      label: t('socialMedia.tiktok')
    },
    webURL: {
      icon: React.createElement(GlobeSm),
      value: webURL,
      url: "http://",
      pattern: /^(?:https?:\/\/)?(.*)/,
      label: t('socialMedia.web')
    },
    discordURL: {
      icon: React.createElement(DiscordSm),
      value: discordURL,
      url: "discord.gg/",
      pattern: /\b(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discordapp\.com\/invite)\/([a-zA-Z0-9-]+)\b/,
      label: t('socialMedia.discord')
    },
    telegramURL: {
      icon: React.createElement(Telegram1Sm),
      value: telegramURL,
      url: "t.me/",
      pattern: /^(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]{5,32})\/?$/,
      label: t('socialMedia.telegram')
    },
    youtubeURL: {
      icon: React.createElement(YoutubeSm),
      value: youtubeURL,
      url: "youtube.com/@",
      pattern: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([a-zA-Z0-9_.-]+)\/?$/,
      label: t('socialMedia.youtube')
    },
    messengerURL: {
      icon: React.createElement(MessengerSm),
      value: messengerURL,
      url: "m.me/",
      pattern: /^(?:https?:\/\/)?m\.me\/([a-zA-Z0-9._-]+)\/?$/,
      label: t('socialMedia.messenger')
    },
  };
};

export default createSocialItems;
