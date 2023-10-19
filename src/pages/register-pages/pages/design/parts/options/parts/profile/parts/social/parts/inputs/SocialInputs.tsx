import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useCallback, useContext, useMemo } from 'react'
import socialInputsModel from './model'
import classes from './style.module.scss'

function SocialInputs({ socials }) {
    const { methods: { dispatch }, state: { shop } } = useContext(designContext)
    const { icons } = socialInputsModel
    
    const items = useMemo(() => {
        const { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL } = shop
        return {
            linkedinURL: {
                icon: icons.linkedin,
                value: linkedinURL
            },
            instagramURL: {
                icon: icons.instagram,
                value: instagramURL
            },
            twitterURL: {
                icon: icons.twitter,
                value: twitterURL
            },
            facebookURL: {
                icon: icons.facebook,
                value: facebookURL
            },
            tiktokURL: {
                icon: icons.tiktok,
                value: tiktokURL
            },
            webURL: {
                icon: icons.web,
                value: webURL
            },
            discordURL: {
                icon: icons.discord,
                value: discordURL
            },
        }
    }, [shop])

    const change = useCallback((key, value) => dispatch({ type: 'updateShop', params: { [key]: value } }), [shop])

    return (
        <VStack align="stretch">
            {Object.keys(items).filter(el => socials.includes(el) || shop[el].length).map((el, key) => (
                <Flex backgroundColor="#141414" padding="0 18px" gap="8px" alignItems="center" key={key}>
                    <AppInput name='' value={items[el].value} onChange={(e) => change(el, e.target.value)} placeholder={el} paddingLeft="0" width="100%" />
                    <Flex justifyContent="center" width="30px" textAlign="center" className={classes.icon}>{items[el].icon}</Flex>
                </Flex>
            ))
            }
        </VStack >
    )
}

export default SocialInputs