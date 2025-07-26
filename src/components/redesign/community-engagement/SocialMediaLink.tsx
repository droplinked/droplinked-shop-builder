import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { ExternalarrowLg } from "assets/icons/Navigation/ExternalArrow/ExternalarrowLg"
import { ExternalarrowleftLg } from "assets/icons/Navigation/ExternalArrowLeft/ExternalArrowLeftLg"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"
import { SocialMediaItem } from "data/socialMediaLinks"

interface Props {
  linkData: SocialMediaItem
}

function SocialMediaLink({ linkData }: Props) {
  const { t, isRTL } = useLocaleResources("dashboardPage")
  const { icon, labelKey, hoverEffect, url } = linkData

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      position="relative"
      height="100%"
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
        top="-20px"
        left={isRTL ? "-20px" : "unset"}
        right={isRTL ? "unset" : "-20px"}
        opacity={0.2}
        sx={{
          "svg": {
            w: "140px",
            h: "140px",
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
        <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="text.white">
          {t(labelKey)}
        </Text>
        <Box className="link-arrow" opacity={0}>
          {isRTL ? <ExternalarrowleftLg color="#fff" /> : <ExternalarrowLg color="#fff" />}
        </Box>
      </Flex>
    </Link>
  )
}

export default SocialMediaLink