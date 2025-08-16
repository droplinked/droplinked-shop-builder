import { Box, Flex, Text } from '@chakra-ui/react';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import React from 'react';

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <Box>
      {features.map((feature) => (
        <Flex key={feature} gap={2} mb={4} alignItems="center">
          <AvailableoutlinedSm color="white" />
          <Text textColor="neutral.white" flex={1} fontSize="sm">
            {feature}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}