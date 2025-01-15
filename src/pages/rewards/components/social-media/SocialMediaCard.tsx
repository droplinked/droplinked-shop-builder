import { Box, Flex, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import useAppStore from 'lib/stores/app/appStore';
import React from 'react';

interface SocialMediaCardProps {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  onClick?: () => void;
  cursor?: string;
  isFollowed?: boolean;
  allFollowed?: boolean;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ title, description, duration, icon, onClick, cursor = 'pointer', isFollowed, allFollowed }) => {
  const { shop } = useAppStore();
  const [isSmallerThan1280] = useMediaQuery('(max-width: 1280px)')

  const renderStatus = React.useMemo(() => {
    if (shop) {
      if (allFollowed) {
        return (
          <Text color="#2BCFA1" textAlign="center" fontSize="16px" fontWeight="500" lineHeight="24px">
            Claim Reward
          </Text>
        );
      }
      if (isFollowed) {
        return <AppIcons.Tick width="24px" height="24px" />;
      }
    }
    return <AppIcons.ExternalArrow />;
  }, [allFollowed, isFollowed, shop]);

  return (
    <Flex
      flex="1"
      p={4}
      bg={isFollowed && !allFollowed ? '#2BCFA11A' : '#010101'}
      borderRadius="3xl"
      border="1px solid"
      borderColor={isFollowed && !allFollowed ? '#2BCFA11A' : '#222222'}
      backdropFilter="blur(100px)"
      gap={4}
      overflow="hidden"
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'flex-start', lg: 'center' }}
      cursor={cursor}
      onClick={onClick}
    >
      {/* Mobile Icon Section */}
      {isSmallerThan1280 &&
        <Flex w="full" justifyContent="space-between" alignItems="center" display={{ base: 'flex', lg: 'none' }}>
          {/* Icon */}
          <Flex
            w="56px"
            h="56px"
            bg={isFollowed && !allFollowed ? '#2BCFA11A' : '#141414'}
            borderRadius="xl"
            border="1px solid"
            borderColor={isFollowed && !allFollowed ? '#2BCFA11A' : '#222222'}
            backdropFilter="blur(10px)"
            justifyContent="center"
            alignItems="center"
          >
            {icon}
          </Flex>
          {/* Status Indicator */}
          <Flex p={3} borderRadius="lg" justifyContent="center" alignItems="center">
            {renderStatus}
          </Flex>
        </Flex>}

      {/* Desktop Icon Section */}

      {!isSmallerThan1280 &&
        <Flex
          w="56px"
          h="56px"
          bg={isFollowed && !allFollowed ? '#2BCFA11A' : '#141414'}
          borderRadius="xl"
          border="1px solid"
          borderColor={isFollowed && !allFollowed ? '#2BCFA11A' : '#222222'}
          backdropFilter="blur(10px)"
          justifyContent="center"
          alignItems="center"
          display={{ base: 'none', lg: 'flex' }}
        >
          {icon}
        </Flex>
      }

      {/* Content Section */}
      <VStack align="flex-start" spacing={1} flex="1" w="full" mt={{ base: 4, lg: 0 }}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <HStack spacing={2}>
          <Text color="#b1b1b1" fontSize="lg">
            {description}
          </Text>
          <Box w="4px" h="4px" bg="whiteAlpha.400" borderRadius="full" />
          <Text color="#b1b1b1" fontSize="lg">
            {duration}
          </Text>
        </HStack>
      </VStack>

      {/* Desktop Status Indicator */}
      <Flex p={3} borderRadius="lg" justifyContent="center" alignItems="center" display={{ base: 'none', lg: 'flex' }}>
        {renderStatus}
      </Flex>
    </Flex>
  );
};

export default SocialMediaCard;
