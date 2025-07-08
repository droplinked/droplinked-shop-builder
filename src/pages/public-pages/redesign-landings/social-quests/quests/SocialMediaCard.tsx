import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import React, { useState } from "react"
import { Promotion } from "../utils/promotionsList"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import useAppStore from "stores/app/appStore"
import TitleRightContent from "./TitleRightContent"

function SocialMediaCard(promotion: Promotion) {
  const [isHovered, setIsHovered] = useState(false)
  const { isLoggedIn } = useAppStore()

  const { title, platform, link, icon, hoverEffect, description, duration, gradiantLogo } = promotion

  return (
    <Link
      href={link}
      target="_blank"
      position="relative"
      height="100%"
      display="flex"
      flexDirection="column"
      gap={4}
      padding={4}
      overflow="hidden"
      bg="neutral.websiteBackground"
      borderRadius="16px"
      border="1px solid"
      borderColor="neutral.gray.900"
      _hover={{
        bg: hoverEffect,
        ".bg-icon svg": { filter: "brightness(100%)" },
        ".link-arrow": { opacity: 1 },
        ".icon-container": {
          bg: "rgba(255, 255, 255, 0.20)",
          borderColor: "rgba(255, 255, 255, 0.20)"
        },
        ".subtext-color": { color: "text.white" }
      }}
      sx={{ "*": { transition: "all 0.3s" }, ".bg-icon svg": { filter: "brightness(100%)" }, }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <IconWrapper icon={<Icon as={icon} width="24px" height="24px" />} className="icon-container" />

      <Flex flexDirection="column" gap={1}>
        <Flex alignItems="center" gap="6px">
          <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="text.white">
            {title}
          </Text>
          {
            isLoggedIn ?
              <TitleRightContent />
              :
              <Box className="link-arrow" opacity={0}>
                <AppIcons.ExternalArrow />
              </Box>
          }
        </Flex>
        <DotSeparatedList dotColor={isHovered ? "rgba(255, 255, 255, 0.20)" : "neutral.gray.900"}>
          <Text className="subtext-color" color="text.subtext.placeholder.dark">{description}</Text>
          <Text className="subtext-color" color="text.subtext.placeholder.dark">{duration}</Text>
        </DotSeparatedList>
      </Flex>
    </Link>
  )
}

export default SocialMediaCard