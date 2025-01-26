import { Center, Circle, Flex, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import useAppToast from 'functions/hooks/toast/useToast';
import { trackFollowService } from 'lib/apis/quests/services';
import useFollowStatus, { CARD_STATUSES } from 'pages/public-pages/rewards/hook/useFollowStatus';
import React, { useState } from 'react';
import StatusIndicator from './StatusIndicator';
import { Promotion } from '../SocialMediaList';

const SocialMediaCard = ({ promotion }: { promotion: Promotion }) => {
  const [isSmallerThan1280] = useMediaQuery('(max-width: 1280px)');
  const { getCardStatus, updateFollowStatus, markLinkOpened, followStatus } = useFollowStatus();
  const { title, description, duration, platform, link, icon } = promotion;
  const { showToast } = useAppToast();
  const isFollowed = followStatus[platform];
  const [loading, setLoading] = useState(false);

  const openPlatformLink = () => window.open(link, '_blank');

  const handleCardClick = async () => {
    const status = getCardStatus(platform);

    if (status === CARD_STATUSES.GUEST) {
      openPlatformLink();
      return;
    }

    if (status === CARD_STATUSES.NOT_OPENED) {
      openPlatformLink();
      markLinkOpened(platform);
      return;
    }

    if (status === CARD_STATUSES.FOLLOWED) {
      return;
    }

    if (status === CARD_STATUSES.NOT_FOLLOWED) {
      setLoading(true);
      try {
        await trackFollowService({ platform });
        updateFollowStatus(platform);
      } catch (error) {
        showToast({ message: `Failed to claim reward for ${platform}. Please try again later.`, type: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const status = getCardStatus(platform);

  return (
    <Flex
      flex="1"
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'flex-start', lg: 'center' }}
      gap={4}
      border="1px solid"
      borderRadius="3xl"
      borderColor={isFollowed ? '#2BCFA11A' : '#222222'}
      padding={4}
      bg={isFollowed ? '#2BCFA11A' : '#010101'}
      backdropFilter="blur(100px)"
      cursor={isFollowed ? 'default' : 'pointer'}
      onClick={handleCardClick}
    >
      {isSmallerThan1280 && (
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Center flexShrink={0} w="56px" h="56px" border="1px solid" borderRadius="xl" borderColor={isFollowed ? '#2BCFA11A' : '#222222'}>
            {icon}
          </Center>
          <Center p={3} borderRadius="lg" display="flex">
            <StatusIndicator status={status} loading={loading} platform={platform} />
          </Center>
        </Flex>
      )}

      {!isSmallerThan1280 && (
        <Center flexShrink={0} w="56px" h="56px" border="1px solid" borderRadius="xl" borderColor={isFollowed ? '#2BCFA11A' : '#222222'}>
          {icon}
        </Center>
      )}

      <VStack w="full" mt={{ base: 4, lg: 0 }} align="flex-start" spacing={1}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <HStack spacing={2}>
          <Text color="#b1b1b1" fontSize="lg">
            {description}
          </Text>
          <Circle size={1} bg="whiteAlpha.400" />
          <Text color="#b1b1b1" fontSize="lg">
            {duration}
          </Text>
        </HStack>
      </VStack>

      <Center p={3} borderRadius="lg" display={{ base: 'none', lg: 'block' }}>
        <StatusIndicator status={status} loading={loading} platform={platform} />
      </Center>
    </Flex>
  );
};

export default SocialMediaCard;
