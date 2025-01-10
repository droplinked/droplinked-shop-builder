import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import RewardHero from './components/reward-hero';
import RewardInfo from './components/reward-info/RewardInfo';
import SocialMediaPromotion from './components/social-media-promotion/SocialMediaPromotion';

const Rewards: React.FC = () => {
  return (
    <Flex flexDirection="column" justifyContent={'center'} bg="#010101" pb="159px" px={{ base: '36px', lg: '72px' }}>
      {/* Background Section */}
      <Box position="absolute" w="100%" h="auto" top="0" left="0" zIndex={1}>
        <Image src="/assets/images/rewards/NoiseTexture.png" w="100%" h="auto" objectFit="cover" position="absolute" top="0" left="0" zIndex={-2} opacity={1} alt="Noise Texture Background" />
        <Image src="/assets/images/rewards/dots.png" w="100%" h="auto" objectFit="cover" position="absolute" top="0" left="0" zIndex={-1} opacity={0.8} alt="Dots Background" />
      </Box>
      <RewardHero />
      <SocialMediaPromotion />
      <RewardInfo />
    </Flex>
  );
};

export default Rewards;
