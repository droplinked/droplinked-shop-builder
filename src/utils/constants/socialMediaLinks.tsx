import { BlueskyLg } from 'assets/icons/SocialMedia/Colorless/Bluesky/BlueskyLg'
import { DiscordLg } from 'assets/icons/SocialMedia/Colorless/Discord/DiscordLg'
import { InstagramLg } from 'assets/icons/SocialMedia/Colorless/Instagram/InstagramLg'
import { LinkedinLg } from 'assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinLg'
import { TelegramLg } from 'assets/icons/SocialMedia/Colorless/Telegram/TelegramLg'
import { TiktokLg } from 'assets/icons/SocialMedia/Colorless/TikTok/TiktokLg'
import { XLg } from 'assets/icons/SocialMedia/Colorless/X/XLg'
import { YoutubeLg } from 'assets/icons/SocialMedia/Colorless/YouTube/YoutubeLg'
import React, { JSX } from 'react'

export interface SocialMediaItem {
    icon: JSX.Element
    label: string
    hoverEffect: string
    url: string
}

export const SOCIAL_MEDIA_LINKS = [
    {
        icon: <TelegramLg color='#FFF' />,
        label: 'Telegram',
        hoverEffect: '#2AABEE',
        url: 'https://t.me/droplinked'
    },
    {
        icon: <DiscordLg color='#FFF' />,
        label: 'Discord',
        hoverEffect: '#5865F2',
        url: 'https://discord.com/channels/1068939465025916959/1088500920406515763'
    },
    {
        icon: <XLg color='#FFF' />,
        label: 'X (Twitter)',
        hoverEffect: '#000',
        url: 'https://x.com/droplinked'
    },
    {
        icon: <InstagramLg color='#FFF' />,
        label: 'Instagram',
        hoverEffect: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)',
        url: 'https://www.instagram.com/drop_linked'
    },
    {
        icon: <LinkedinLg color='#FFF' />,
        label: 'LinkedIn',
        hoverEffect: '#0A66C2',
        url: 'https://www.linkedin.com/company/droplinked'
    },
    {
        icon: <YoutubeLg color='#FFF' />,
        label: 'YouTube',
        hoverEffect: '#FF0302',
        url: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed'
    },
    {
        icon: <TiktokLg color='#FFF' />,
        label: 'TikTok',
        hoverEffect: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(261deg, #00F2EA 0%, #FF004F 100%)',
        url: 'https://www.tiktok.com/@droplinked'
    }
]

export const BLUE_SKY_LINK = {
    icon: <BlueskyLg color='#FFF' />,
    label: 'Blue Sky',
    hoverEffect: '#0A84FF',
    url: 'https://bsky.app/profile/@droplinked.bsky.social'
}