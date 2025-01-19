import { Center, Circle, Flex, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import { trackFollowService } from 'lib/apis/quests/services'
import useAppStore from 'lib/stores/app/appStore'
import useFollowStatus from 'pages/rewards/hook/useFollowStatus'
import React from 'react'

function SocialMediaCard({ promotion }: { promotion: any }) {
  const { shop } = useAppStore()
  const [isSmallerThan1280] = useMediaQuery('(max-width: 1280px)')
  const { followStatus, allPlatformsFollowed, updateFollowStatus } = useFollowStatus()
  const { showToast } = useAppToast()

  const { title, description, duration, platform, link, icon } = promotion
  const isFollowed = followStatus[platform]

  const handleCardClick = async () => {
    if (!shop) return
    window.open(link, '_blank')
    try {
      await trackFollowService({ platform })
      updateFollowStatus(platform)
    } catch (error) {
      showToast({ message: `Failed to track follow on ${platform}. Please try again later.`, type: 'error' })
    }
  }

  const renderIcon = () => (
    <Center
      flexShrink={0}
      w="56px"
      h="56px"
      border="1px solid"
      borderRadius="xl"
      borderColor={isFollowed && !allPlatformsFollowed ? '#2BCFA11A' : '#222222'}
      bg={isFollowed && !allPlatformsFollowed ? '#2BCFA11A' : '#141414'}
      backdropFilter="blur(10px)"
    >
      {icon}
    </Center>
  )

  const renderStatus = () => {
    if (shop) {
      if (allPlatformsFollowed) {
        return (
          <Text color="#2BCFA1" textAlign="center" fontSize="16px" fontWeight="500" lineHeight="24px">
            Claim Reward
          </Text>
        )
      }
      if (isFollowed) return <AppIcons.Tick width="24px" height="24px" />
    }
    return <AppIcons.ExternalArrow />
  }

  const renderStatusIndicator = (display) => (
    <Center p={3} borderRadius="lg" display={display}>
      {renderStatus()}
    </Center>
  )

  return (
    <Flex
      flex="1"
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'flex-start', lg: 'center' }}
      gap={4}
      border="1px solid"
      borderRadius="3xl"
      borderColor={isFollowed && !allPlatformsFollowed ? '#2BCFA11A' : '#222222'}
      padding={4}
      bg={isFollowed && !allPlatformsFollowed ? '#2BCFA11A' : '#010101'}
      backdropFilter="blur(100px)"
      cursor={isFollowed ? 'default' : 'pointer'}
      onClick={handleCardClick}
    >
      {/* Mobile Icon Section */}
      {isSmallerThan1280 && (
        <Flex w="full" justifyContent="space-between" alignItems="center">
          {renderIcon()}
          {renderStatusIndicator('flex')}
        </Flex>
      )}

      {/* Desktop Icon Section */}
      {!isSmallerThan1280 && renderIcon()}

      {/* Content Section */}
      <VStack w="full" mt={{ base: 4, lg: 0 }} align="flex-start" spacing={1}>
        <Text color="white" fontSize="lg" fontWeight="bold">{title}</Text>
        <HStack spacing={2}>
          <Text color="#b1b1b1" fontSize="lg">{description}</Text>
          <Circle size={1} bg="whiteAlpha.400" />
          <Text color="#b1b1b1" fontSize="lg">{duration}</Text>
        </HStack>
      </VStack>

      {/* Desktop Status Indicator */}
      {renderStatusIndicator({ base: 'none', lg: 'block' })}
    </Flex>
  )
}

export default SocialMediaCard