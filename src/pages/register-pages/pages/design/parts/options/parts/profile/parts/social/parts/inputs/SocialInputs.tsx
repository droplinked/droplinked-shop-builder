import { Box, Flex, useOutsideClick, VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useCallback, useContext, useMemo } from 'react'
import socialInputsModel from './model'
import classes from './style.module.scss'

function SocialInputs({ socials, updateSocial }) {
    const { methods: { dispatch }, state: { shop } } = useContext(designContext)
    const { icons } = socialInputsModel
    const ref = React.useRef()
    useOutsideClick({
        ref: ref,
        handler: () => updateSocial(''),
    })

    const items = useMemo(() => {
        const { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL, telegramURL, youtubeURL, messengerURL } = shop
        return {
            linkedinURL: {
                icon: icons.linkedin,
                value: linkedinURL,
                url: 'linkedin.com/',
                pattern: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^/]+)\/?$/,
            },
            instagramURL: {
                icon: icons.instagram,
                value: instagramURL,
                url: 'instagram.com/',
                pattern: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/]+)\/?$/
            },
            twitterURL: {
                icon: icons.twitter,
                value: twitterURL,
                url: 'twitter.com/',
                pattern: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?([^/]+)\/?$/,
            },
            facebookURL: {
                icon: icons.facebook,
                value: facebookURL,
                url: 'facebook.com/',
                pattern: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:profile\.php\?id=|([^/]+)\/?)$/,
            },
            tiktokURL: {
                icon: icons.tiktok,
                value: tiktokURL,
                url: 'tiktok.com/@',
                pattern: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/]+)\/?$/,
            },
            webURL: {
                icon: icons.web,
                value: webURL,
                url: 'http://',
                pattern: /^(?:https?:\/\/)?(.*)/
            },
            discordURL: {
                icon: icons.discord,
                value: discordURL,
                url: 'discord.gg/',
                pattern: /\b(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discordapp\.com\/invite)\/([a-zA-Z0-9-]+)\b/,
            },
            telegramURL: {
                icon: icons.telegram,
                value: telegramURL,
                url: 't.me/',
                pattern: /^(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]{5,32})\/?$/,
            },
            youtubeURL: {
                icon: icons.youtube,
                value: youtubeURL,
                url: 'youtube.com/@',
                pattern: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([a-zA-Z0-9_.-]+)\/?$/,
            },
            messengerURL: {
                icon: icons.messenger,
                value: messengerURL,
                url: 'm.me/',
                pattern: /^(?:https?:\/\/)?m\.me\/([a-zA-Z0-9._-]+)\/?$/,
            },
        }
    }, [shop])

    const change = useCallback((key: string, value: string) => {
        const match = items[key].pattern.exec(value)
        dispatch({ type: 'updateShop', params: { [key]: match ? match[1] : value } })
    }, [shop])

    const submit = useCallback((e) => {
        e.preventDefault()
        updateSocial('')
    }, [])

    return (
        <VStack align="stretch">
            {Object.keys(items).filter(el => socials.includes(el) || shop[el].length).map((el, key) => (
                <Flex backgroundColor="#141414" borderRadius="8px" padding="4px" gap="8px" alignItems="center" key={key}>
                    {el !== socials ? (
                        <AppTooltip label={items[el].url + items[el].value} placement="top">
                            <Flex padding="13px 18px" cursor="pointer" onClick={() => updateSocial(el)} gap="10px" alignItems="flex-start" width="100%">
                                <Box className={classes.icon} position="relative" top="3px">{items[el].icon}</Box>
                                <AppTypography fontSize="14px" width="85%" color="#C2C2C2">
                                    {items[el].url}{items[el].value.substr(0, 6)}
                                    {items[el].value.length > 7 && '...'}
                                </AppTypography>
                            </Flex>
                        </AppTooltip>
                    ) : (
                        <form style={{ width: "100%" }} onSubmit={(e) => submit(e)}>
                            <VStack ref={ref} align="stretch" width="100%" spacing="0">
                                <Flex alignItems="center" gap="12px" backgroundColor="#1C1C1C" padding="13px 18px" borderRadius="6px 6px 0px 0px">
                                    <Flex className={classes.icon}>{items[el].icon}</Flex>
                                    <AppTypography fontSize="14px" color="#C2C2C2">{items[el].url}</AppTypography>
                                </Flex>
                                <Box padding="0 18px">
                                    <AppInput name='' value={items[el].value} onChange={(e) => change(el, e.target.value)} placeholder={el !== "webURL" ? "Username" : "Domain"} paddingLeft="0" width="100%" />
                                </Box>
                            </VStack>
                        </form>
                    )}
                </Flex>
            ))
            }
        </VStack >
    )
}

export default SocialInputs