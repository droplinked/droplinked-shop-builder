import { Box, HStack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppIcons from 'assest/icon/Appicons';

export interface ISocialAffliate {
    instagram: string
    snapchat: string
    pintrest: string
    twitter: string
    facebook: string
    size?: number
}

function SocialAffliate({ facebook, instagram, pintrest, snapchat, twitter, size }: ISocialAffliate) {

    const sized = useMemo(() => {
        if (!size) return {}
        return {
            width: `${size ? size : 17}px`,
            height: `${size ? size : 17}px`
        }
    }, [size])

    const social = [
        {
            icon: <AppIcons.instagramIcon {...sized} />,
            link: instagram
        },
        {
            icon: <AppIcons.snapchatIcon {...sized} />,
            link: snapchat
        },
        {
            icon: <AppIcons.pintrestIcon {...sized} />,
            link: pintrest
        },
        {
            icon: <AppIcons.twitterIcon {...sized} />,
            link: twitter
        },
        {
            icon: <AppIcons.facebookIcon {...sized} />,
            link: facebook
        }
    ]
    return (
        <HStack spacing={3}>
            {social.map((el, key) => (
                <Box key={key}>
                    <a href={el.link} target={"_blank"}>
                        {el.icon}
                    </a>
                </Box>
            ))}
        </HStack>
    )
}

export default SocialAffliate