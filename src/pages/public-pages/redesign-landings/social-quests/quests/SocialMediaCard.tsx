import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import React, { useState } from "react"
import { Promotion } from "../utils/promotionsList"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import useAppStore from "stores/app/appStore"
import TitleRightContent from "./TitleRightContent"
import { CARD_STATUSES } from "../hook/useFollowStatus"
import { trackFollowService } from "lib/apis/quests/services"
import useAppToast from "hooks/toast/useToast"

interface SocialMediaCardProps extends Promotion {
  followStatusHook: ReturnType<typeof import('../hook/useFollowStatus').default>
}

function SocialMediaCard(props: SocialMediaCardProps) {
  const { title, platform, link, icon, hoverEffect, description, duration, gradiantLogo, followStatusHook } = props
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useAppStore()
  const { showToast } = useAppToast()

  const { followStatus, getCardStatus, markLinkOpened, updateFollowStatus, linkOpened } = followStatusHook
  const isFollowed = followStatus[platform]
  const status = getCardStatus(platform)
  const isreadyToClaim = status === CARD_STATUSES.NOT_FOLLOWED

  const openPlatformLink = () => window.open(link, '_blank')

  const handleCardClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loading) return // Prevent multiple clicks while loading

    if (status === CARD_STATUSES.GUEST) {
      openPlatformLink()
      return
    }

    if (status === CARD_STATUSES.NOT_OPENED) {
      openPlatformLink()
      markLinkOpened(platform)
      return
    }

    if (status === CARD_STATUSES.FOLLOWED) {
      return
    }

    if (status === CARD_STATUSES.NOT_FOLLOWED) {
      setLoading(true)
      try {
        await trackFollowService({ platform })
        updateFollowStatus(platform)
        showToast({ message: `Reward claimed for ${title}!`, type: 'success' })
      } catch (error) {
        showToast({ message: `Failed to claim reward for ${title}. Please try again later.`, type: 'error' })
      } finally {
        setLoading(false)
      }
    }
  }

  const linkBackground = isFollowed ? "url(https://upload-file-droplinked.s3.amazonaws.com/b193d648e698c9ae124ca0db97292f82b66b95281eaba24e80b0aefa5936ef51.png)" : "neutral.websiteBackground"

  return (
    <Box
      position="relative"
      height="100%"
      display="flex"
      flexDirection="column"
      gap={4}
      padding={4}
      overflow="hidden"
      bg={linkBackground}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="bottom"
      borderRadius="16px"
      border="1px solid"
      borderColor="neutral.gray.900"
      cursor={isFollowed ? 'default' : 'pointer'}
      onClick={handleCardClick}
      {...(!isFollowed && !linkOpened[platform]) && {
        _hover: {
          bg: hoverEffect,
          ".bg-icon svg": { filter: "brightness(100%)" },
          ".link-arrow": { opacity: 1 },
          ".icon-container": {
            bg: "rgba(255, 255, 255, 0.20)",
            borderColor: "rgba(255, 255, 255, 0.20)"
          },
          ".subtext-color": { color: "text.white" }
        }
      }}
      {...(!isFollowed && !linkOpened[platform]) && {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      }}
      sx={{ "*": { transition: "all 0.3s" }, ".bg-icon svg": { filter: "brightness(100%)" }, }}
    >
      {/* Gradient Overlay for Fade Effect */}
      {isFollowed && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="100%"
          background="linear-gradient(180deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 100%)"
          zIndex={1}
          borderRadius="16px"
        />
      )}

      {/* Background Icon Layer with Gradient */}
      <Box
        className="bg-icon"
        position="absolute"
        top="-20px"
        right="-20px"
        filter={isFollowed ? "brightness(3)" : "unset"}
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
      <IconWrapper icon={<Icon as={icon} width="24px" height="24px" />} className="icon-container" style={{ position: "relative", zIndex: 2 }} />

      <Flex flexDirection="column" gap={1} position="relative" zIndex={2}>
        <Flex alignItems="center" gap="6px">
          <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="text.white">
            {title}
          </Text>
          {
            isLoggedIn ?
              <TitleRightContent
                isFollowed={isFollowed}
                isreadyToClaim={isreadyToClaim}
                isLoading={loading}
              />
              :
              <Box className="link-arrow" opacity={0}>
                <AppIcons.ExternalArrow />
              </Box>
          }
        </Flex>
        <DotSeparatedList dotColor={isHovered || isFollowed ? "rgba(255, 255, 255, 0.20)" : "neutral.gray.900"}>
          <Text className="subtext-color" color="text.subtext.placeholder.dark">{description}</Text>
          <Text className="subtext-color" color="text.subtext.placeholder.dark">{duration}</Text>
        </DotSeparatedList>
      </Flex>
    </Box>
  )
}

export default SocialMediaCard