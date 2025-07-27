import { DiscordLg } from "assets/icons/SocialMedia/Colorless/Discord/DiscordLg";
import { InstagramLg } from "assets/icons/SocialMedia/Colorless/Instagram/InstagramLg";
import { LinkedinLg } from "assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinLg";
import { TelegramLg } from "assets/icons/SocialMedia/Colorless/Telegram/TelegramLg";
import { XLg } from "assets/icons/SocialMedia/Colorless/X/XLg";
import { YoutubeLg } from "assets/icons/SocialMedia/Colorless/YouTube/YoutubeLg";

export interface Promotion {
  title: string;
  description: string;
  duration: string;
  platform: string;
  link: string;
  icon: ({
    color,
    ...props
  }: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  hoverEffect: string;
}

export const getPromotions = (t: (key: string) => string): Promotion[] => [
  {
    title: t('common:socialMedia.telegram'),
    description: t('SocialQuestsPromotions.telegram.description'),
    duration: t('SocialQuestsPromotions.telegram.duration'),
    platform: "TELEGRAM",
    link: "https://t.me/droplinked",
    icon: TelegramLg,
    hoverEffect: "#2AABEE",
  },
  {
    title: t('common:socialMedia.x'),
    description: t('SocialQuestsPromotions.twitter.description'),
    duration: t('SocialQuestsPromotions.twitter.duration'),
    platform: "X",
    link: "https://twitter.com/droplinked",
    icon: XLg,
    hoverEffect: "#000",
  },
  {
    title: t('common:socialMedia.instagram'),
    description: t('SocialQuestsPromotions.instagram.description'),
    duration: t('SocialQuestsPromotions.instagram.duration'),
    platform: "INSTAGRAM",
    link: "https://www.instagram.com/drop_linked",
    icon: InstagramLg,
    hoverEffect:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)",
  },
  {
    title: t('common:socialMedia.discord'),
    description: t('SocialQuestsPromotions.discord.description'),
    duration: t('SocialQuestsPromotions.discord.duration'),
    platform: "DISCORD",
    link: "https://discord.com/channels/1068939465025916959/1088500920406515763",
    icon: DiscordLg,
    hoverEffect: "#5865F2",
  },
  {
    title: t('common:socialMedia.youtube'),
    description: t('SocialQuestsPromotions.youtube.description'),
    duration: t('SocialQuestsPromotions.youtube.duration'),
    platform: "YOUTUBE",
    link: "https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed",
    icon: YoutubeLg,
    hoverEffect: "#FF0302",
  },
  {
    title: t('common:socialMedia.linkedin'),
    description: t('SocialQuestsPromotions.linkedin.description'),
    duration: t('SocialQuestsPromotions.linkedin.duration'),
    platform: "LINKEDIN",
    link: "https://www.linkedin.com/company/droplinked",
    icon: LinkedinLg,
    hoverEffect: "#0A66C2",
  }
]