import { Box } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

/**
 * Navigation Arrow for Carousel
 * Displays only when hovered over the image
 */
export const CarouselArrow = ({ direction, onClick, isHovered }) => {
  if (!isHovered) return null;

  return (
    <Box
      as="button"
      h="24px"
      w="24px"
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      border="1px solid"
      borderColor="neutral.gray.200"
      zIndex={2}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      bg="rgba(255, 255, 255, 0.75)"
      p={0}
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      left={direction === 'prev' ? 2 : 'auto'}
      right={direction === 'next' ? 2 : 'auto'}
    >
      {direction === 'prev' ? <AppIcons.ChevronLeft color="black" /> : <AppIcons.ChevronRight color="black" />}
    </Box>
  );
};
