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
    labelKey: string
    hoverEffect: string
    url: string
}

export const SOCIAL_MEDIA_LINKS = [
    {
        icon: React.createElement(TelegramLg, { color: '#FFF' }),
        labelKey: 'socialMedia.telegram',
        hoverEffect: '#2AABEE',
        url: 'https://t.me/droplinked'
    },
    {
        icon: React.createElement(DiscordLg, { color: '#FFF' }),
        labelKey: 'socialMedia.discord',
        hoverEffect: '#5865F2',
        url: 'https://discord.com/channels/1068939465025916959/1088500920406515763'
    },
    {
        icon: React.createElement(XLg, { color: '#FFF' }),
        labelKey: 'socialMedia.x',
        hoverEffect: '#000',
        url: 'https://x.com/droplinked'
    },
    {
        icon: React.createElement(InstagramLg, { color: '#FFF' }),
        labelKey: 'socialMedia.instagram',
        hoverEffect: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)',
        url: 'https://www.instagram.com/drop_linked'
    },
    {
        icon: React.createElement(LinkedinLg, { color: '#FFF' }),
        labelKey: 'socialMedia.linkedin',
        hoverEffect: '#0A66C2',
        url: 'https://www.linkedin.com/company/droplinked'
    },
    {
        icon: React.createElement(YoutubeLg, { color: '#FFF' }),
        labelKey: 'socialMedia.youtube',
        hoverEffect: '#FF0302',
        url: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed'
    },
    {
        icon: React.createElement(TiktokLg, { color: '#FFF' }),
        labelKey: 'socialMedia.tiktok',
        hoverEffect: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(261deg, #00F2EA 0%, #FF004F 100%)',
        url: 'https://www.tiktok.com/@droplinked'
    }
]

export const BLUE_SKY_LINK = {
    icon: React.createElement(BlueskyLg, { color: '#FFF' }),
    labelKey: 'socialMedia.bluesky',
    hoverEffect: '#0A84FF',
    url: 'https://bsky.app/profile/@droplinked.bsky.social'
}