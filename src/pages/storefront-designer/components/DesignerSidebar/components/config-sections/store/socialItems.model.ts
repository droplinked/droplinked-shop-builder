import React from "react";
import { DiscordMd } from "assets/icons/SocialMedia/Colored/Discord/DiscordMd";
import { FacebookMd } from "assets/icons/SocialMedia/Colored/Facebook/FacebookMd";
import { InstagramMd } from "assets/icons/SocialMedia/Colored/Instagram/InstagramMd";
import { LinkedinMd } from "assets/icons/SocialMedia/Colored/LinkedIn/LinkedinMd";
import { TiktoklightMd } from "assets/icons/SocialMedia/Colored/TikTokLight/TiktoklightMd";
import { XMd } from "assets/icons/SocialMedia/Colorless/X/XMd";
import { GlobeMd } from "assets/icons/Sign/Globe/GlobeMd";
import { Telegram1Md } from "assets/icons/SocialMedia/Colored/Telegram1/Telegram1Md";
import { YoutubeMd } from "assets/icons/SocialMedia/Colored/YouTube/YoutubeMd";
import { MessengerMd } from "assets/icons/SocialMedia/Colored/Messenger/MessengerMd";

export interface SocialItemModel {
  icon: React.ReactNode;
  value: string | undefined;
  url: string;
  pattern: RegExp;
}

export interface SocialItemsState {
  [key: string]: SocialItemModel;
}

export const createSocialItems = (shop: any): SocialItemsState => {
  
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
      icon: React.createElement(LinkedinMd),
      value: linkedinURL,
      url: "linkedin.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^/]+)\/?$/,
    },
    instagramURL: {
      icon: React.createElement(InstagramMd),
      value: instagramURL,
      url: "instagram.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/]+)\/?$/,
    },
    twitterURL: {
      icon: React.createElement(XMd),
      value: twitterURL,
      url: "twitter.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?([^/]+)\/?$/,
    },
    facebookURL: {
      icon: React.createElement(FacebookMd),
      value: facebookURL,
      url: "facebook.com/",
      pattern: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:profile\.php\?id=|([^/]+)\/?)$/,
    },
    tiktokURL: {
      icon: React.createElement(TiktoklightMd),
      value: tiktokURL,
      url: "tiktok.com/@",
      pattern: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/]+)\/?$/,
    },
    webURL: {
      icon: React.createElement(GlobeMd),
      value: webURL,
      url: "http://",
      pattern: /^(?:https?:\/\/)?(.*)/,
    },
    discordURL: {
      icon: React.createElement(DiscordMd),
      value: discordURL,
      url: "discord.gg/",
      pattern: /\b(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discordapp\.com\/invite)\/([a-zA-Z0-9-]+)\b/,
    },
    telegramURL: {
      icon: React.createElement(Telegram1Md),
      value: telegramURL,
      url: "t.me/",
      pattern: /^(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]{5,32})\/?$/,
    },
    youtubeURL: {
      icon: React.createElement(YoutubeMd),
      value: youtubeURL,
      url: "youtube.com/@",
      pattern: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([a-zA-Z0-9_.-]+)\/?$/,
    },
    messengerURL: {
      icon: React.createElement(MessengerMd),
      value: messengerURL,
      url: "m.me/",
      pattern: /^(?:https?:\/\/)?m\.me\/([a-zA-Z0-9._-]+)\/?$/,
    },
  };
};

export default createSocialItems;
