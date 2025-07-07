import { DiscordMd } from "assets/icons/SocialMedia/Colorless/Discord/DiscordMd";
import { InstagramMd } from "assets/icons/SocialMedia/Colorless/Instagram/InstagramMd";
import { LinkedinMd } from "assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinMd";
import { TelegramMd } from "assets/icons/SocialMedia/Colorless/Telegram/TelegramMd";
import { XMd } from "assets/icons/SocialMedia/Colorless/X/XMd";
import { YoutubeMd } from "assets/icons/SocialMedia/Colorless/YouTube/YoutubeMd";
import DiscordGradiantLogo from "../svgs/DiscordGradiantLogo";
import InstagramGradiantLogo from "../svgs/InstagramGradiantLogo";
import LinkedinGradiantLogo from "../svgs/LinkedinGradiantLogo";
import TelegramGradiantLogo from "../svgs/TelegramGradiantLogo";
import TwitterGradiantLogo from "../svgs/TwitterGradiantLogo";
import YoutubeGradiantLogo from "../svgs/YoutubeGradiantLogo";

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
  gradiantLogo: () => React.JSX.Element
}

export const promotions: Promotion[] = [
  {
    title: "Telegram",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "TELEGRAM",
    link: "https://t.me/droplinked",
    icon: TelegramMd,
    hoverEffect: "#2AABEE",
    gradiantLogo: TelegramGradiantLogo
  },
  {
    title: "X (Twitter)",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "X",
    link: "https://twitter.com/droplinked",
    icon: XMd,
    hoverEffect: "#000",
    gradiantLogo: TwitterGradiantLogo
  },
  {
    title: "Instagram",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "INSTAGRAM",
    link: "https://www.instagram.com/drop_linked",
    icon: InstagramMd,
    hoverEffect:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)",
    gradiantLogo: InstagramGradiantLogo
  },
  {
    title: "Discord",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "DISCORD",
    link: "https://discord.com/channels/1068939465025916959/1088500920406515763",
    icon: DiscordMd,
    hoverEffect: "#5865F2",
    gradiantLogo: DiscordGradiantLogo
  },
  {
    title: "YouTube",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "YOUTUBE",
    link: "https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed",
    icon: YoutubeMd,
    hoverEffect: "#FF0302",
    gradiantLogo: YoutubeGradiantLogo
  },
  {
    title: "LinkedIn",
    description: "Free Pro Plan",
    duration: "1 month",
    platform: "LINKEDIN",
    link: "https://www.linkedin.com/company/droplinked",
    icon: LinkedinMd,
    hoverEffect: "#0A66C2",
    gradiantLogo: LinkedinGradiantLogo
  },
];
