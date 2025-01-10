import { Flex } from '@chakra-ui/react';
import React from 'react';
import CustomizableSection from './components/CustomizableSection';
import ProPlanSection from './components/ProPlanSection';
import SellingSection from './components/SellingSection';

const RewardInfo = () => {
  return (
    <Flex justify="start" align="start" gap={6} overflow="hidden" flexDirection={{ base: 'column', lg: 'row' }}>
      <ProPlanSection />
      <Flex flexDirection="column" gap={6} flex="1">
        <SellingSection />
        <CustomizableSection />
      </Flex>
    </Flex>
  );
};

export default RewardInfo;
