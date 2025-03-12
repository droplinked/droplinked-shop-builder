import React, { useState } from 'react'
import {
    Box,
    Flex,
    HStack,
    Box as Dot,
} from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import AppImage from 'components/common/image/AppImage'
import BlueButton from 'components/redesign/button/BlueButton'

interface ImageSliderProps {
    images: string[]
    onChange?: (currentImage: string) => void
}

export const ImageSlider = ({ images, onChange }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        onChange?.(images[nextIndex])
    }

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length
        setCurrentIndex(prevIndex)
        onChange?.(images[prevIndex])
    }

    return (
        <Flex flexDirection="column" width="100%" gap={4} overflow="hidden">
            <Flex
                width={`${images.length * 100}%`}
                transform={`translateX(-${(currentIndex * 100) / images.length}%)`}
                transition="transform 0.5s ease-in-out"
            >
                {images.map((image, index) => (
                    <Box key={index} width={`${100 / images.length}%`} flexShrink={0}>
                        <AppImage
                            src={image}
                            alt={`Slide ${index + 1}`}
                            width="100%"
                            height="150px"
                            borderRadius={8}
                            objectFit="cover"
                        />
                    </Box>
                ))}
            </Flex>

            <Flex
                alignItems="center"
                justifyContent="space-between"
                gap={4}
            >
                <BlueButton
                    leftIcon={<ChevronleftMd color='#fff' />}
                    onClick={handlePrev}
                    color="white"
                    fontSize={14}
                    fontWeight={400}
                    padding={0}
                >
                    Previous
                </BlueButton>

                <HStack spacing={2}>
                    {images.map((_, index) => (
                        <Dot
                            key={index}
                            w={index === currentIndex ? '16px' : '4px'}
                            h="4px"
                            bg={index === currentIndex ? 'white' : 'whiteAlpha.600'}
                            borderRadius="full"
                            transition="all 0.3s"
                            cursor="pointer"
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </HStack>

                <BlueButton
                    rightIcon={<ChevronrightMd color='#fff' />}
                    onClick={handleNext}
                    color="white"
                    fontSize={14}
                    fontWeight={400}
                    padding={0}
                >
                    Next
                </BlueButton>
            </Flex>
        </Flex>
    )
}
