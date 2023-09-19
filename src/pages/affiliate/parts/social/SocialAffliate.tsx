import { Box, HStack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppIcons from 'assest/icon/Appicons';

export interface ISocialAffliate {
    instagram: string
    tiktok: string
    discord: string
    linkedin: string
    twitter: string
    web: string
    facebook: string
}

export interface IProps {
    social: ISocialAffliate
    size?: number
}

function SocialAffliate({ social, size }: IProps) {

    const sized = useMemo(() => {
        return {
            width: `${size ? size : 17}px`,
            height: `${size ? size : 17}px`,
            opacity: ".7"
        }
    }, [size])

    const icons = {
        instagram: {
            icon: <AppIcons.InstagramIcon {...sized} />,
            url: 'https://www.instagram.com/'
        },
        discord: {
            icon: <AppIcons.Discord {...sized} />,
            url: 'https://discord.gg/'
        },
        tiktok: {
            icon: <AppIcons.TikTok {...sized} />,
            url: 'https://www.tiktok.com/'
        },
        linkedin: {
            icon: <AppIcons.LinkedIn {...sized} />,
            url: 'https://www.linkedin.com/'
        },
        twitter: {
            icon: <AppIcons.TwitterIcon {...sized} />,
            url: 'https://twitter.com/'
        },
        facebook: {
            icon: <AppIcons.FacebookIcon {...sized} />,
            url: 'https://www.facebook.com/'
        },
        web: {
            icon: <AppIcons.Web {...sized} />,
            url: 'https://'
        },
    }

    return (
        <HStack spacing={3}>
            {Object.keys(social).filter(el => social[el]).map((el, key) => (
                <Box key={key}>
                    <a href={icons[el].url + social[el]} target={"_blank"}>
                        {icons[el].icon}
                    </a>
                </Box>
            ))}
        </HStack>
    )
}

export default SocialAffliate