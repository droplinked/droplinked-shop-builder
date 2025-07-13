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
    title: t('promotions.telegram.title'),
    description: t('promotions.telegram.description'),
    duration: t('promotions.telegram.duration'),
    platform: "TELEGRAM",
    link: "https://t.me/droplinked",
    icon: TelegramLg,
    hoverEffect: "#2AABEE",
  },
  {
    title: t('promotions.twitter.title'),
    description: t('promotions.twitter.description'),
    duration: t('promotions.twitter.duration'),
    platform: "X",
    link: "https://twitter.com/droplinked",
    icon: XLg,
    hoverEffect: "#000",
  },
  {
    title: t('promotions.instagram.title'),
    description: t('promotions.instagram.description'),
    duration: t('promotions.instagram.duration'),
    platform: "INSTAGRAM",
    link: "https://www.instagram.com/drop_linked",
    icon: InstagramLg,
    hoverEffect:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)",
  },
  {
    title: t('promotions.discord.title'),
    description: t('promotions.discord.description'),
    duration: t('promotions.discord.duration'),
    platform: "DISCORD",
    link: "https://discord.com/channels/1068939465025916959/1088500920406515763",
    icon: DiscordLg,
    hoverEffect: "#5865F2",
  },
  {
    title: t('promotions.youtube.title'),
    description: t('promotions.youtube.description'),
    duration: t('promotions.youtube.duration'),
    platform: "YOUTUBE",
    link: "https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed",
    icon: YoutubeLg,
    hoverEffect: "#FF0302",
  },
  {
    title: t('promotions.linkedin.title'),
    description: t('promotions.linkedin.description'),
    duration: t('promotions.linkedin.duration'),
    platform: "LINKEDIN",
    link: "https://www.linkedin.com/company/droplinked",
    icon: LinkedinLg,
    hoverEffect: "#0A66C2",
  },
];