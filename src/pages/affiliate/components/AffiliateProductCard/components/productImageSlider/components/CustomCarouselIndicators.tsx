import { Box } from '@chakra-ui/react';
import React from 'react';

/**
 * Custom Dot Indicators for Carousel
 * Displays only when hovered over the image
 */
export const CustomCarouselIndicators = ({ totalSlides, activeSlide, isHovered }) => {
  if (!isHovered) return null;

  return (
    <Box position="absolute" bottom="8px" left="50%" transform="translateX(-50%)" display="flex">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Box key={index} w="8px" h="8px" mx="2px" borderRadius="full" bg={index === activeSlide ? 'black' : 'gray.400'} transition="background 0.3s" />
      ))}
    </Box>
  );
};
