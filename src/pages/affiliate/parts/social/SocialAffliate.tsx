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
        if (!size) return {}
        return {
            width: `${size ? size : 17}px`,
            height: `${size ? size : 17}px`
        }
    }, [size])

    const icons = {
        instagram: <AppIcons.instagramIcon {...sized} />,
        discord: <AppIcons.discord {...sized} />,
        tiktok: <AppIcons.instagramIcon {...sized} />,
        linkedin: <AppIcons.instagramIcon {...sized} />,
        twitter: <AppIcons.twitterIcon {...sized} />,
        facebook: <AppIcons.facebookIcon {...sized} />,
        web: <AppIcons.web {...sized} />,
    }

    return (
        <HStack spacing={3}>
            {Object.keys(social).filter(el => social[el]).map((el, key) => (
                <Box key={key}>
                    <a href={social[el]} target={"_blank"}>
                        {icons[el]}
                    </a>
                </Box>
            ))}
        </HStack>
    )
}

export default SocialAffliate