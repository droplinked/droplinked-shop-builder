import { Box } from "@chakra-ui/react"
import useAppToast from "hooks/toast/useToast"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from "react"
import { trackFollowService } from "services/quests/services"
import useAppStore from "stores/app/appStore"
import useFollowStatus, { CARD_STATUSES } from "../hook/useFollowStatus"
import { Promotion } from "../utils/promotionsList"
import BackgroundIcon from "./BackgroundIcon"
import CardContent from "./CardContent"

interface SocialMediaCardProps extends Promotion {
  followStatusHook: ReturnType<typeof useFollowStatus>
}

function SocialMediaCard(props: SocialMediaCardProps) {
  const { title, platform, link, icon, hoverEffect, description, duration, followStatusHook } = props
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useAppStore()
  const { showToast } = useAppToast()
  const { t } = useLocaleResources('public-pages/landings/social-quests')

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
        showToast({ message: t('Quests.rewardClaimed', { title }), type: 'success' })
      } catch (error) {
        showToast({ message: t('Quests.rewardClaimFailed', { title }), type: 'error' })
      } finally {
        setLoading(false)
      }
    }
  }

  const linkBackground = isFollowed
    ? "url(https://upload-file-droplinked.s3.amazonaws.com/b193d648e698c9ae124ca0db97292f82b66b95281eaba24e80b0aefa5936ef51.png)"
    : "neutral.websiteBackground"

  const shouldShowHoverEffects = !isFollowed && !linkOpened[platform]

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
      {...shouldShowHoverEffects && {
        _hover: {
          bg: hoverEffect,
          ".bg-icon svg": { filter: "brightness(100%)" },
          ".bg-icon": { opacity: 0.4 },
          ".link-arrow": { opacity: 1 },
          ".icon-container": {
            bg: "rgba(255, 255, 255, 0.20)",
            borderColor: "rgba(255, 255, 255, 0.20)"
          },
          ".subtext-color": { color: "text.white" }
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      }}
      sx={{
        "*": { transition: "all 0.3s" },
        ".bg-icon svg": { filter: "brightness(100%)" }
      }}
    >
      <BackgroundIcon icon={icon({ color: '#FFF' })} isFollowed={isFollowed} />
      <CardContent
        icon={icon}
        title={title}
        description={description}
        duration={duration}
        isLoggedIn={isLoggedIn}
        isFollowed={isFollowed}
        isreadyToClaim={isreadyToClaim}
        isLoading={loading}
        isHovered={isHovered}
      />
    </Box>
  )
}

export default SocialMediaCard