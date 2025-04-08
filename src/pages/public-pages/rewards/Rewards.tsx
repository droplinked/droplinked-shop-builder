import { Flex } from '@chakra-ui/react';
import React from 'react';
import RewardBackground from './components/background/RewardBackground';
import RewardDetails from './components/details/RewardDetails';
import RewardHero from './components/hero/RewardHero';
import SocialMediaList from './components/social-media/SocialMediaList';

const Rewards: React.FC = () => {
  return (
    <Flex flexDirection="column" justifyContent={'center'} bg="#010101" pb="159px" px={{ base: '36px', lg: '72px' }}>
      <RewardBackground />
      <RewardHero />
      <SocialMediaList />
      <RewardDetails />
    </Flex>
  );
};

export default Rewards;