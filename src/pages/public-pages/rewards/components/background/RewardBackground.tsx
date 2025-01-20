
import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const RewardBackground = () => {
  return (
    <Box position="absolute" w="100%" minHeight="800px" top="0" left="0" zIndex={1}>
        <Image src="/assets/images/rewards/NoiseTexture.png" w="100%" h="100%" objectFit="cover" position="absolute" top="0" left="0" zIndex={-2} opacity={1} alt="Noise Texture Background" />
        <Image src="/assets/images/rewards/dots.png" w="100%" h="100%" objectFit="cover" position="absolute" top="0" left="0" zIndex={-1} opacity={0.8} alt="Dots Background" />
      </Box>
  )
}

export default RewardBackground
