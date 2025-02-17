import { Box, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { CarouselArrow } from './components/CarouselArrow';
import { CustomCarouselIndicators } from './components/CustomCarouselIndicators';

/**
 * Product Image Slider Component
 * Displays product images with custom navigation arrows & indicators
 */
export default function ProductImageSlider({ productImages }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box position="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Carousel
        selectedItem={activeSlide}
        onChange={setActiveSlide}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        useKeyboardArrows
        emulateTouch
        swipeable
        renderArrowPrev={(clickHandler, hasPrev) => hasPrev && <CarouselArrow direction="prev" onClick={clickHandler} isHovered={isHovered} />}
        renderArrowNext={(clickHandler, hasNext) => hasNext && <CarouselArrow direction="next" onClick={clickHandler} isHovered={isHovered} />}
      >
        {productImages.map((imageSrc, index) => (
          <Box key={index} position="relative" overflow="hidden" borderRadius="lg" aspectRatio="1" transition="transform 0.3s ease-in-out" _hover={{ transform: 'scale(1.1)' }}>
            <Image src={imageSrc} w="full" h="full" objectFit="cover" />
          </Box>
        ))}
      </Carousel>

      <CustomCarouselIndicators totalSlides={productImages.length} activeSlide={activeSlide} isHovered={isHovered} />
    </Box>
  );
}
