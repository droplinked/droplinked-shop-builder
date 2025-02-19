import { useMediaQuery } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import { SocialMediaItemModel } from "pages/dashboard/types/SocialMediaItem"
import React from "react"
import JoinTheCommunity from "./JoinTheCommunity"
import SocialMediaItem from "./SocialMediaItem"

export default function CommunityGrid() {
    const [isMd] = useMediaQuery('(min-width: 768px)')
    const [isLg] = useMediaQuery('(min-width: 1280px)')
    const columns = isLg ? 4 : isMd ? 2 : 1

    return (
        <RuledGrid
            columns={columns}
            borderRadius={16}
            overflow="hidden"
        >
            <JoinTheCommunity />

            {SOCIALS.map((social, index) => {
                // Calculate if it's the last row (when 4 columns are filled)
                const isLastRow = index >= SOCIALS.length - columns
                return <SocialMediaItem key={index} socialMediaItem={social} isLastRow={isLastRow} />
            })}
        </RuledGrid>
    )
}

const SOCIALS: SocialMediaItemModel[] = [
    {
        icon: <AppIcons.TelegramOutlined />,
        label: 'Telegram',
        hoverColor: "#2AABEE",
        link: "https://t.me/droplinked"
    },
    {
        icon: <AppIcons.DiscordOutlined />,
        label: 'Discord',
        hoverColor: "#5865F2",
        link: "https://discord.com/channels/1068939465025916959/1088500920406515763"
    },
    {
        icon: <AppIcons.XOutlined />,
        label: 'X (Twitter)',
        hoverColor: "#000",
        link: "https://x.com/droplinked"
    },
    {
        icon: <AppIcons.InstagramOutlined />,
        label: 'Instagram',
        hoverColor: "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)",
        link: "https://www.instagram.com/drop_linked"
    },
    {
        icon: <AppIcons.LinkedInOutlined />,
        label: 'LinkedIn',
        hoverColor: "#0A66C2",
        link: "https://www.linkedin.com/company/droplinked"
    },
    {
        icon: <AppIcons.YouTubeOutlined />,
        label: 'YouTube',
        hoverColor: "#FF0302",
        link: "https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed"
    },
    {
        icon: <AppIcons.TikTokOutlined />,
        label: 'TikTok',
        hoverColor: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(261deg, #00F2EA 0%, #FF004F 100%)",
        link: "https://www.tiktok.com/@droplinked"
    }
]