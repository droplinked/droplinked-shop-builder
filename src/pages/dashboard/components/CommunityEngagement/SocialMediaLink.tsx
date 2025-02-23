import { Box, Flex, Link, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import { SocialMediaItem } from "pages/dashboard/types/dashboard.types"
import React from "react"

interface Props {
  linkData: SocialMediaItem
}

function SocialMediaLink({ linkData }: Props) {
  const { icon, label, hoverEffect, url } = linkData

  return (
    <Link
      href={url}
      target="_blank"
      position="relative"
      display="flex"
      flexDirection="column"
      gap={{ base: 4, md: 6 }}
      padding={{ base: 4, lg: 6 }}
      overflow="hidden"
      _hover={{
        bg: hoverEffect,
        ".bg-icon svg": { filter: "brightness(100%)" },
        ".link-arrow": { opacity: 1 },
        ".icon-container": {
          bg: "rgba(255, 255, 255, 0.20)",
          borderColor: "rgba(255, 255, 255, 0.20)"
        }
      }}
      sx={{ "*": { transition: "all 0.3s" } }}
    >
      {/* Background Icon Layer with Gradient */}
      <Box
        className="bg-icon"
        position="absolute"
        top="-24px"
        right="-24px"
        width="140px"
        height="140px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        opacity={0.2}
        sx={{
          "svg": {
            maskImage: "radial-gradient(circle at 19px 107px, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle at 19px 107px, black 0%, transparent 100%)",
            filter: "brightness(20%)"
          }
        }}
      >
        {icon}
      </Box>

      {/* Original Foreground Icon */}
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