import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import React from "react"
import { Promotion } from "../utils/promotionsList"

function SocialMediaCard(promotion: Promotion) {
  const { title, platform, link, icon, hoverEffect, description, duration, gradiantLogo } = promotion

  return (
    <Link
      href={link}
      target="_blank"
      position="relative"
      height="100%"
      display="flex"
      flexDirection="column"
      gap={{ base: 4, md: 6 }}
      padding={{ base: 4, lg: 6 }}
      overflow="hidden"
      bg="neutral.websiteBackground"
      _hover={{
        bg: hoverEffect,
        ".bg-icon svg": { filter: "brightness(100%)" },
        ".link-arrow": { opacity: 1 },
        ".icon-container": {
          bg: "rgba(255, 255, 255, 0.20)",
          borderColor: "rgba(255, 255, 255, 0.20)"
        }
      }}
      sx={{ "*": { transition: "all 0.3s" }, ".bg-icon svg": { filter: "brightness(100%)" }, }}
    >
      {/* Background Icon Layer with Gradient */}
      <Box
        className="bg-icon"
        position="absolute"
        top="-20px"
        right="-20px"
        sx={{
          "svg": {
            w: "140px",
            h: "140px",
          }
        }}
      >
        <Icon as={gradiantLogo} />
      </Box>

      {/* Original Foreground Icon */}
      <IconWrapper icon={<Icon as={icon} />} className="icon-container" />

      <Flex alignItems="center" gap="6px">
        <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="text.white">
          {title}
        </Text>
        <Box className="link-arrow" opacity={0}>
          <AppIcons.ExternalArrow />
        </Box>
      </Flex>
    </Link>
  )
}

export default SocialMediaCard