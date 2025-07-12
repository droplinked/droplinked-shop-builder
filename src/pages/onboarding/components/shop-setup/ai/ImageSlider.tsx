import { Box, Box as Dot, Flex, HStack } from '@chakra-ui/react';
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd';
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd';
import AppImage from 'components/common/image/AppImage';
import AppButton from 'components/redesign/button/AppButton';
import React, { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ImageSliderProps {
  images: string[];
  onChange?: (currentImage: string) => void;
  isLoading: boolean;
  selectedValue?: string;
}

export const ImageSlider = ({ images, onChange, isLoading, selectedValue }: ImageSliderProps) => {
  const { t } = useLocaleResources('onboarding');
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (selectedValue) {
      const index = images.indexOf(selectedValue);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  // Update currentIndex when selectedValue changes
  React.useEffect(() => {
    if (selectedValue) {
      const index = images.indexOf(selectedValue);
      if (index >= 0) {
        setCurrentIndex(index);
      }
    }
  }, [selectedValue, images]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (image: string) => {
    onChange?.(image);
  };

  return (
    <Flex flexDirection="column" width="100%" gap={4} overflow="hidden">
      <Flex width={isLoading ? '300%' : `${images.length * 100}%`} transform={`translateX(-${(currentIndex * 100) / images.length}%)`} transition="transform 0.5s ease-in-out">
        {isLoading && <ImageSkeleton />}
        {!isLoading &&
          images.map((image, index) => (
            <Box
              key={index}
              width={`${100 / images.length}%`}
              flexShrink={0}
              position="relative"
              border={selectedValue === image ? '1px solid' : 'none'}
              borderColor="main.primary"
              borderRadius="8px"
              p={1}
              cursor="pointer"
              onClick={() => handleImageClick(image)}
            >
              <AppImage src={image} alt={`Slide ${index + 1}`} width="100%" height="150px" borderRadius={8} objectFit="cover" />
            </Box>
          ))}
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" gap={4}>
        <AppButton variant="normal" leftIcon={<ChevronleftMd color={isLoading ? '#737373' : '#fff'} />} onClick={handlePrev} color="white" isDisabled={isLoading} _hover={'none'}>
          {t('aiAssistant.imageSlider.previous')}
        </AppButton>

        <HStack spacing={2}>
          {!isLoading &&
            images.map((_, index) => (
              <Dot
                key={index}
                w={index === currentIndex ? '16px' : '4px'}
                h="4px"
                bg={index === currentIndex ? 'main.primary' : 'whiteAlpha.600'}
                borderRadius="full"
                transition="all 0.3s"
                cursor="pointer"
                onClick={() => handleDotClick(index)}
              />
            ))}
        </HStack>

        <AppButton variant="normal" rightIcon={<ChevronrightMd color={isLoading ? '#737373' : '#fff'} />} onClick={handleNext} color="white" isDisabled={isLoading} _hover={'none'}>
          {t('aiAssistant.imageSlider.next')}
        </AppButton>
      </Flex>
    </Flex>
  );
};
