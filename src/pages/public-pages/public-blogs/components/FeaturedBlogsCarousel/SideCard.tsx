import { Box } from '@chakra-ui/react'
import React from 'react'
import { IBlogListItem } from '../../types/blog.types'

interface SideCardProps {
  slide: IBlogListItem
}

export function SideCard({ slide }: SideCardProps) {
  return (
    <Box
      w="192px"
      h="480px"
      position="relative"
      borderRadius="xl"
      border="1px"
      borderColor="neutral.800"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
      overflow="hidden"
      backgroundImage={`url(${slide.image})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box w="192px" h="224px" left={0} top="260px" position="absolute" bgGradient="linear(to-b, blackAlpha.0, blackAlpha.0)" />
      <Box w="240px" h="224px" left="-24px" top="260px" position="absolute" bgGradient="linear(to-b, blackAlpha.0, blackAlpha.25, blackAlpha.75)" />
      <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="400px"
          background="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
          zIndex={1}
        />
    </Box>
  )
}


