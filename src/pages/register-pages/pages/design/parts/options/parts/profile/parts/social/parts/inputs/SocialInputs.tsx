import { Box, Flex, useOutsideClick, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import AppTypography from 'components/common/typography/AppTypography'
import { Form } from 'formik'
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
        const { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL } = shop
        return {
            linkedinURL: {
                icon: icons.linkedin,
                value: linkedinURL,
                url: 'linkedin.com/'
            },
            instagramURL: {
                icon: icons.instagram,
                value: instagramURL,
                url: 'instagram.com/'
            },
            twitterURL: {
                icon: icons.twitter,
                value: twitterURL,
                url: 'twitter.com/'
            },
            facebookURL: {
                icon: icons.facebook,
                value: facebookURL,
                url: 'facebook.com/'
            },
            tiktokURL: {
                icon: icons.tiktok,
                value: tiktokURL,
                url: 'tiktok.com/'
            },
            webURL: {
                icon: icons.web,
                value: webURL,
                url: 'http://'
            },
            discordURL: {
                icon: icons.discord,
                value: discordURL,
                url: 'discord.gg/'
            },
        }
    }, [shop])

    const change = useCallback((key, value) => dispatch({ type: 'updateShop', params: { [key]: value } }), [shop])

    const submit = useCallback((e) => {
        e.preventDefault()
        updateSocial('')
    }, [])

    return (
        <VStack align="stretch">
            {Object.keys(items).filter(el => socials.includes(el) || shop[el].length).map((el, key) => (
                <Flex backgroundColor="#141414" padding="4px" gap="8px" alignItems="center" key={key}>
                    {el !== socials ? (
                        <AppTooltip label={items[el].url + items[el].value} placement="top">
                            <Flex padding="0 14px" cursor="pointer" onClick={() => updateSocial(el)} gap="10px" alignItems="flex-start" width="100%">
                                <Box className={classes.icon} position="relative" top="3px">{items[el].icon}</Box>
                                <AppTypography size="14px" width="85%" color="#C2C2C2">
                                    {items[el].url}{items[el].value.substr(0, 6)}
                                    {items[el].value.length > 7 && '...'}
                                </AppTypography>
                            </Flex>
                        </AppTooltip>
                    ) : (
                        <form style={{ width: "100%" }} onSubmit={(e) => submit(e)}>
                            <VStack ref={ref} align="stretch" width="100%" spacing="0">
                                <Flex alignItems="center" gap="12px" backgroundColor="#1C1C1C" padding="10px 14px" borderRadius="6px 6px 0px 0px">
                                    <Flex className={classes.icon}>{items[el].icon}</Flex>
                                    <AppTypography size="14px" color="#C2C2C2">{items[el].url}</AppTypography>
                                </Flex>
                                <Box padding="0 14px">
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