import { Box, Circle } from '@chakra-ui/react';
import React from 'react';
import CenterIcon from './CenterIcon';
import CircleIcons from './CircleIcons';
import PlanCards from './PlanCards';

const SubscriptionPlansDisplay = () => {
  return (
      <Box position="relative" w="750px" h="750px">
        {/* Glow effects */}
        <Box position="absolute" top="0" left="245px" width="150px" height="150px" borderRadius="75px" bg="primary.default" opacity="0.5" filter="blur(125px)" />
        <Box position="absolute" bottom="0" left="245px" width="150px" height="150px" borderRadius="75px" bg="#9C4EFF" opacity="0.5" filter="blur(125px)" />

        {/* Main circle border */}
        <Circle
          size="750px"
          border="1px solid"
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
          size="520px" 
          bg="neutral.gray.900" 
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
  );
};

export default SubscriptionPlansDisplay;
