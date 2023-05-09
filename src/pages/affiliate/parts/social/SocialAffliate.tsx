import { Box, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import facebookIcon from "assest/icon/facebook.svg";
import twitterIcon from "assest/icon/twitter.svg";
import pintrestIcon from "assest/icon/pintrest.svg";
import snapchatIcon from "assest/icon/snapchat.svg";
import instagramIcon from "assest/icon/instagram.svg";

interface IProps {
    instagram: string
    snapchat: string
    pintrest: string
    twitter: string
    facebook: string
    size?: number
}

function SocialAffliate({ facebook, instagram, pintrest, snapchat, twitter, size }: IProps) {
    const social = [
        {
            icon: instagramIcon,
            link: instagram
        },
        {
            icon: snapchatIcon,
            link: snapchat
        },
        {
            icon: pintrestIcon,
            link: pintrest
        },
        {
            icon: twitterIcon,
            link: twitter
        },
        {
            icon: facebookIcon,
            link: facebook
        }
    ]
    return (
        <HStack spacing={3}>
            {social.map((el, key) => (
                <Box key={key}>
                    <a href={el.link} target={"_blank"}>
                        <Image src={el.icon} width={`${size ? size : 17}px`} height={`${size ? size : 17}px`} />
                    </a>
                </Box>
            ))}
        </HStack>
    )
}

export default SocialAffliate