import { Box, Flex, Grid, GridItem, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import React from "react"
import IconWrapper from "./IconWrapper"

export default function CommunityGrid() {
    const [isMd] = useMediaQuery('(min-width: 768px)')
    const [isLg] = useMediaQuery('(min-width: 1280px)')
    const columns = isLg ? 4 : isMd ? 2 : 1

    return (
        <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            border="1px solid #292929"
            borderRadius={16}
            overflow="hidden"
        >
            <GridItem
                borderRight="1px solid #292929"
                borderBottom="1px solid #292929"
                padding={{ base: 4, lg: 6 }}
            >
                <Heading mb={1} fontSize={20} fontWeight={700} color="white">
                    Join the Community!
                </Heading>
                <Text color="#7B7B7B">
                    Follow us across our channels to get the latest news and exclusive offers.
                </Text>
            </GridItem>

            {SOCIALS.map((social, index) => {
                // Calculate if it's the last row (when 4 columns are filled)
                const isLastRow = index >= SOCIALS.length - columns

                return (
                    <GridItem
                        key={index}
                        display="flex"
                        flexDirection="column"
                        gap={{ base: 4, md: 6 }}
                        padding={{ base: 4, lg: 6 }}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                            bg: social.hoverColor,
                            '.link-arrow': { opacity: 1 },
                            '.icon-container': { bg: "rgba(255, 255, 255, 0.20)", borderColor: "rgba(255, 255, 255, 0.20)" }
                        }}
                        borderRight="1px solid #292929"
                        borderBottom={isLastRow ? 'none' : '1px solid #292929'} // Remove bottom border for the last row
                    >
                        <IconWrapper icon={social.icon} className="icon-container" />
                        <Flex alignItems="center" gap="6px">
                            <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#fff">{social.label}</Text>
                            <Box className="link-arrow" opacity={0}><AppIcons.ExternalArrow /></Box>
                        </Flex>
                    </GridItem>
                )
            })}
        </Grid>
    )
}

const SOCIALS = [
    {
        label: 'Telegram',
        icon: <AppIcons.TelegramOutlined />,
        hoverColor: "#2AABEE",
    },
    {
        label: 'Discord',
        icon: <AppIcons.DiscordOutlined />,
        hoverColor: "#5865F2"
    },
    {
        label: 'X (Twitter)',
        icon: <AppIcons.XOutlined />,
        hoverColor: "#000"
    },
    {
        label: 'Instagram',
        icon: <AppIcons.InstagramOutlined />,
        hoverColor: "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(114deg, #4E60D3 0%, #913BAF 25%, #D52D88 60%, #F26D4F 100%)"
    },
    {
        label: 'LinkedIn',
        icon: <AppIcons.LinkedInOutlined />,
        hoverColor: "#0A66C2"
    },
    {
        label: 'YouTube',
        icon: <AppIcons.YouTubeOutlined />,
        hoverColor: "#FF0302"
    },
    {
        label: 'TikTok',
        icon: <AppIcons.TikTokOutlined />,
        hoverColor: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(261deg, #00F2EA 0%, #FF004F 100%)"
    }
]