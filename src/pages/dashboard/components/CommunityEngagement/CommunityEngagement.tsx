import { useMediaQuery } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import { SocialMediaItem } from "pages/dashboard/types/dashboard.types"
import React from "react"
import JoinCommunityCard from "./JoinCommunityCard"
import SocialMediaLink from "./SocialMediaLink"

export default function CommunityEngagement() {
    const [isMd] = useMediaQuery('(min-width: 768px)')
    const [isLg] = useMediaQuery('(min-width: 1280px)')
    const columns = isLg ? 4 : isMd ? 2 : 1

    return (
        <RuledGrid
            columns={columns}
            borderRadius={16}
            overflow="hidden"
        >
            <JoinCommunityCard />

            {SOCIAL_MEDIA_LINKS.map((socialMediaLink) =>
                <SocialMediaLink key={socialMediaLink.label} linkData={socialMediaLink} />
            )}
        </RuledGrid>
    )
}

const SOCIAL_MEDIA_LINKS: SocialMediaItem[] = [
    {
        icon: <AppIcons.TelegramOutlined />,
        label: 'Telegram',
        hoverEffect: "#2AABEE",
        url: "https://t.me/droplinked"
    },
    {
        icon: <AppIcons.DiscordOutlined />,
        label: 'Discord',
        hoverEffect: "#5865F2",
        url: "https://discord.com/channels/1068939465025916959/1088500920406515763"
    },
    {
        icon: <AppIcons.XOutlined />,
        label: 'X (Twitter)',
        hoverEffect: "#000",
        url: "https://x.com/droplinked"
    },
    {
        icon: <AppIcons.InstagramOutlined />,
        label: 'Instagram',
        hoverEffect: "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)",
        url: "https://www.instagram.com/drop_linked"
    },
    {
        icon: <AppIcons.LinkedInOutlined />,
        label: 'LinkedIn',
        hoverEffect: "#0A66C2",
        url: "https://www.linkedin.com/company/droplinked"
    },
    {
        icon: <AppIcons.YouTubeOutlined />,
        label: 'YouTube',
        hoverEffect: "#FF0302",
        url: "https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed"
    },
    {
        icon: <AppIcons.TikTokOutlined />,
        label: 'TikTok',
        hoverEffect: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(261deg, #00F2EA 0%, #FF004F 100%)",
        url: "https://www.tiktok.com/@droplinked"
    }
]