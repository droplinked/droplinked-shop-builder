import { Flex, Link } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import previewSocialsModel from './model'
import classes from './style.module.scss'

function PreviewSocials() {
    const { icons } = previewSocialsModel
    const { state: { shop: { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL, shopDesign: { textColorParagraphs } } } } = useContext(designContext)

    const social = useMemo(() => [
        {
            url: discordURL,
            icon: icons({ color: textColorParagraphs }).discord
        },
        {
            url: facebookURL,
            icon: icons({ color: textColorParagraphs }).facebook
        },
        {
            url: instagramURL,
            icon: icons({ color: textColorParagraphs }).instagram
        },
        {
            url: linkedinURL,
            icon: icons({ color: textColorParagraphs }).linkedin
        },
        {
            url: tiktokURL,
            icon: icons({ color: textColorParagraphs }).tiktok
        },
        {
            url: twitterURL,
            icon: icons({ color: textColorParagraphs }).twitter
        },
        {
            url: webURL,
            icon: icons({ color: textColorParagraphs }).web
        },
    ], [textColorParagraphs, discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL])

    return (
        <Flex justifyContent="center" gap="7px" alignItems="center" flexWrap="wrap" className={classes.icons}>
            {social.filter(el => el.url).map((el, key) => (
                <Link key={key} href={el.url} target="_blank">{el.icon}</Link>
            ))}
        </Flex>
    )
}

export default PreviewSocials