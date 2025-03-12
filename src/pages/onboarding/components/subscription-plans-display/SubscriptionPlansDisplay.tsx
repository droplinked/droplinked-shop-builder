import { Box, Circle } from '@chakra-ui/react';
import React from 'react';
import CenterIcon from './CenterIcon';
import CircleIcons from './CircleIcons';
import PlanCards from './PlanCards';
import RightSectionWrapper from '../common/RightSectionWrapper';

const SubscriptionPlansDisplay = () => {
  return (
    <RightSectionWrapper sx={{ overflow: 'hidden' }}>
      <Box position="relative" w="750px" h="750px">
        {/* Main circle border */}
        <Circle
          size="750px"
          border="8px solid"
          borderColor="neutral.gray.800"
          position="absolute"
          bgGradient="radial(at right, rgba(20,20,20,0.5), rgba(20,20,20,0))"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: 'rgba(20,20,20,0.25)',
            borderRadius: 'inherit'
          }}
        />

        {/* Center circle with plans */}
        <Circle
          size="540px"
          bgGradient="linear(to-b, rgba(72, 187, 120, 0.05), rgba(156, 78, 255, 0.05))"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          border="1px solid"
          borderColor="whiteAlpha.50"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(45deg)',
            top: '50%',
            zIndex: 0
          }}
          _after={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(-45deg)',
            top: '50%',
            zIndex: 0
          }}
        >
          <Box position="relative" zIndex={1} w="full" h="full">
            <CenterIcon />
            <PlanCards />
          </Box>
        </Circle>
        <CircleIcons />
      </Box>
    </RightSectionWrapper>
  );
};

export default SubscriptionPlansDisplay;
