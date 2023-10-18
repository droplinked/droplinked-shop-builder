import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useCallback, useContext, useMemo } from 'react'

function SocialInputs({ socials }) {
    const { methods: { dispatch }, state: { shop } } = useContext(designContext)
    const style = {
        width: "14px",
        height: "14px"
    }
    const items = useMemo(() => {
        const { discordURL, facebookURL, instagramURL, linkedinURL, tiktokURL, twitterURL, webURL } = shop
        return {
            linkedinURL: {
                icon: <AppIcons.LinkedIn {...style} />,
                value: linkedinURL
            },
            instagramURL: {
                icon: <AppIcons.InstagramIcon {...style} />,
                value: instagramURL
            },
            twitterURL: {
                icon: <AppIcons.TwitterIcon {...style} />,
                value: twitterURL
            },
            facebookURL: {
                icon: <AppIcons.FacebookIcon {...style} />,
                value: facebookURL
            },
            tiktokURL: {
                icon: <AppIcons.TikTok {...style} />,
                value: tiktokURL
            },
            webURL: {
                icon: <AppIcons.Web {...style} />,
                value: webURL
            },
            discordURL: {
                icon: <AppIcons.Discord {...style} />,
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
                    <Flex alignItems="center" justifyContent="center" width="18px" height="18px" backgroundColor="#C2C2C2" borderRadius="4px">{items[el].icon}</Flex>
                </Flex>
            ))}
        </VStack>
    )
}

export default SocialInputs