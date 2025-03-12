import { Box, Flex, Text } from '@chakra-ui/react'
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm'
import React from 'react'

interface PlanFeaturesProps {
  features: string[]
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ features }) => {
  return (
    <Box p={4}>
      {features.map((feature) => (
        <Flex key={feature} gap={2} mb={4}>
          <AvailableoutlinedSm color="white" />
          <Text textColor="neutral.white" flex={1} fontSize="sm">
            {feature}
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default PlanFeatures 