import { Box, Flex, Link, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { SocialMediaItem } from 'pages/dashboard/types/dashboard.types'
import React from 'react'

interface Props {
    linkData: SocialMediaItem
}

function SocialMediaLink({ linkData }: Props) {
    const { icon, label, hoverEffect, url } = linkData

    return (
        <Link
            href={url}
            target="_blank"
            display="flex"
            flexDirection="column"
            gap={{ base: 4, md: 6 }}
            padding={{ base: 4, lg: 6 }}
            transition="all 0.2s"
            _hover={{
                bg: hoverEffect,
                ".link-arrow": { opacity: 1 },
                ".icon-container": {
                    bg: "rgba(255, 255, 255, 0.20)",
                    borderColor: "rgba(255, 255, 255, 0.20)"
                }
            }}
        >
            <IconWrapper icon={icon} className="icon-container" />

            <Flex alignItems="center" gap="6px">
                <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#fff">
                    {label}
                </Text>
                <Box className="link-arrow" opacity={0}>
                    <AppIcons.ExternalArrow />
                </Box>
            </Flex>
        </Link>
    )
}

export default SocialMediaLink