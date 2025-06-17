import { Box, Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { DiscordMd } from 'assets/icons/SocialMedia/Colorless/Discord/DiscordMd'
import { InstagramMd } from 'assets/icons/SocialMedia/Colorless/Instagram/InstagramMd'
import { LinkedinMd } from 'assets/icons/SocialMedia/Colorless/LinkedIn/LinkedinMd'
import { TelegramMd } from 'assets/icons/SocialMedia/Colorless/Telegram/TelegramMd'
import { XMd } from 'assets/icons/SocialMedia/Colorless/X/XMd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BrandIdentity() {
    const socialMediaLinks = [
        { icon: <XMd color='#fff' />, url: 'https://x.com/droplinked' },
        { icon: <LinkedinMd color='#fff' />, url: 'https://www.linkedin.com/company/droplinked' },
        { icon: <InstagramMd color='#fff' />, url: 'https://www.instagram.com/drop_linked' },
        { icon: <TelegramMd color='#fff' />, url: 'https://t.me/droplinked' },
        { icon: <DiscordMd color='#fff' />, url: 'https://discord.com/channels/1068939465025916959/1088500920406515763' }
    ]

    return (
        <Box
            sx={{
                ".icon-wrapper": {
                    display: "grid",
                    placeItems: "center",
                    width: 10,
                    height: 10,
                    border: "1px solid",
                    borderColor: "neutral.gray.900",
                    borderRadius: 8
                }
            }}
        >
            <ChakraLink
                as={Link}
                to="/"
                display="flex"
                alignItems="center"
                gap={3}
                marginBottom={3}
            >
                <Box className='icon-wrapper'>
                    <Drop3 width="24px" height="24px" color='#fff' />
                </Box>
                <DroplinkedTypography width="129px" height="24px" color='#fff' />
            </ChakraLink>

            <Text fontSize={{ base: 14, md: 16 }} fontWeight={500} color="text.white">
                Commerce tools to sell and settle transparently
            </Text>

            <Flex marginBlock={{ base: 4, xl: 6 }} gap={2}>
                {socialMediaLinks.map((link) => (
                    <ChakraLink
                        className='icon-wrapper'
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        transition="0.3s ease-in-out"
                        _hover={{ bgColor: "neutral.gray.1000" }}
                    >
                        {link.icon}
                    </ChakraLink>
                ))}
            </Flex>
        </Box>
    )
}