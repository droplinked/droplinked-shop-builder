import { Flex, Link } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import previewSocialsModel from './model'
import classes from './style.module.scss'

function PreviewSocials() {
    const { icons } = previewSocialsModel
    const { state: { shop: { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL } } } = useContext(designContext)

    const social = [
        {
            url: discordURL,
            icon: icons().discord
        },
        {
            url: facebookURL,
            icon: icons().facebook
        },
        {
            url: instagramURL,
            icon: icons().instagram
        },
        {
            url: linkedinURL,
            icon: icons().linkedin
        },
        {
            url: tiktokURL,
            icon: icons().tiktok
        },
        {
            url: twitterURL,
            icon: icons().twitter
        },
        {
            url: webURL,
            icon: icons().web
        },
    ]

    return (
        <Flex justifyContent="center" gap="7px" alignItems="center" flexWrap="wrap" className={classes.icons}>
            {social.filter(el => el.url).map((el, key) => (
                <Link key={key} href={el.url} target="_blank">{el.icon}</Link>
            ))}
        </Flex>
    )
}

export default PreviewSocials