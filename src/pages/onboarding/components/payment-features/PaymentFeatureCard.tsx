import { Box, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

interface CardProps {
  headerImage: string
  title: string
  description: string
  objectFit?: 'cover' | 'contain'
}

const PaymentFeatureCard: React.FC<CardProps> = ({ headerImage, title, description, objectFit = 'cover'  }) => (
  <Box
    position="relative"
    borderRadius="2xl"
    overflow="hidden"
    borderWidth="1px"
    borderColor="#282828"
    display="flex"
    flexDirection="column"
    justifyContent="flex-end"
    alignItems="flex-start"
    bgGradient="linear(to-b, rgba(24, 24, 24, 0), #181818)"
    height="452px"
    userSelect="none"
  >
    <Box position="absolute" top="0" left="0" width="100%" height="100%">
      <AppImage src={headerImage} alt={title} objectFit={objectFit} w="100%" h="100%" bg="transparent" />
    </Box>
    <Box p={6} display="flex" flexDirection="column" gap={1} position="relative" zIndex="1">
      <Text color="white" fontSize="md" fontWeight="bold" fontFamily="Inter" lineHeight="7">
        {title}
      </Text>
      <Text color="#b1b1b1" fontSize="xs" fontWeight="normal" fontFamily="Inter" lineHeight="tight">
        {description}
      </Text>
    </Box>
  </Box>
)

export default PaymentFeatureCard
