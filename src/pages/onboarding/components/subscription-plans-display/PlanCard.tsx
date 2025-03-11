import { Box, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface PlanCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ icon, title, description }) => {
  return (
    <Box
      w="220px"
      p={4}
      borderRadius="2xl"
      border="1px solid rgba(255, 255, 255, 0.04)"
      backgroundColor="rgb(34 34 34 / 4%)"
      backdropFilter="blur(20px)"
      display="inline-flex"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={4}
    >
      {icon}
      <Box alignSelf="stretch" display="flex" flexDir="column" alignItems="flex-start" gap={0.5}>
        <Box display="inline-flex" justifyContent="center" alignItems="center" gap={2}>
          <Text color="white" fontSize="base" fontWeight="bold" fontFamily="Inter" lineHeight="normal">
            {title}
          </Text>
        </Box>
        <Text alignSelf="stretch" h="60px" color="gray.400" fontSize="sm" fontWeight="normal" fontFamily="Inter" lineHeight="tight">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default PlanCard; 