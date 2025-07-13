import { Box, Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { DiscordMd } from 'assets/icons/SocialMedia/Colorless/Discord/DiscordMd'
import { InstagramMd } from 'assets/icons/SocialMedia/Colorless/Instagram/InstagramMd'
import { LinkedinMd } from 'assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinMd'
import { TelegramMd } from 'assets/icons/SocialMedia/Colorless/Telegram/TelegramMd'
import { XMd } from 'assets/icons/SocialMedia/Colorless/X/XMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import DefaultStoreLanguage from 'pages/settings/components/pages/general/components/preferences/default-store-language/DefaultStoreLanguage'
import LanguageSelect from 'pages/settings/components/pages/general/components/preferences/default-store-language/LanguageSelect'
import React from 'react'
import { Link } from 'react-router-dom'

const SOCIAL_MEDIA_LINKS = [
    { icon: <XMd color='#fff' />, url: 'https://x.com/droplinked' },
    { icon: <LinkedinMd color='#fff' />, url: 'https://www.linkedin.com/company/droplinked' },
    { icon: <InstagramMd color='#fff' />, url: 'https://www.instagram.com/drop_linked' },
    { icon: <TelegramMd color='#fff' />, url: 'https://t.me/droplinked' },
    { icon: <DiscordMd color='#fff' />, url: 'https://discord.com/channels/1068939465025916959/1088500920406515763' }
] as const

const ICON_WRAPPER_STYLES = {
    display: "grid",
    placeItems: "center",
    width: 10,
    height: 10,
    border: "1px solid",
    borderColor: "neutral.gray.900",
    borderRadius: 8
} as const

function BrandIdentity() {
    const { t } = useLocaleResources('common')

    return (
        <Box>
            <Flex
                as={Link}
                to="/"
                alignItems="center"
                gap={3}
                marginBottom={3}
            >
                <Box {...ICON_WRAPPER_STYLES}>
                    <Drop3 width="24px" height="24px" color='#fff' />
                </Box>
                <DroplinkedTypography width="129px" height="24px" color='#fff' />
            </Flex>

            <Text fontSize={{ base: 14, md: 16 }} fontWeight={500} color="text.white">
                {t('commerceTagline')}
            </Text>

            <Flex marginBlock={{ base: 4, xl: 6 }} gap={2}>
                {SOCIAL_MEDIA_LINKS.map(({ icon, url }) => (
                    <ChakraLink
                        key={url}
                        href={url}
                        target="_blank"
                        transition="0.3s ease-in-out"
                        _hover={{ bgColor: "neutral.gray.1000" }}
                        {...ICON_WRAPPER_STYLES}
                    >
                        {icon}
                    </ChakraLink>
                ))}
            </Flex>

            <Box width="144px">
                <LanguageSelect />
            </Box>
        </Box>
    )
}

export default BrandIdentity