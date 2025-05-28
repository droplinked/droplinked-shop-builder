import {
    Box,
    Box as Dot,
    Flex,
    HStack,
} from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import AppImage from 'components/common/image/AppImage'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import ImageSkeleton from './ImageSkeleton'

interface ImageSliderProps {
    images: string[]
    onChange?: (currentImage: string) => void
    isLoading: boolean
}

export const ImageSlider = ({ images, onChange, isLoading }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { t } = useLocaleResources('onboarding')

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
                width={isLoading ? "300%" : `${images.length * 100}%`}
                transform={`translateX(-${(currentIndex * 100) / images.length}%)`}
                transition="transform 0.5s ease-in-out"
            >
                {isLoading && <ImageSkeleton />}
                {!isLoading && images.map((image, index) => (
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
                    leftIcon={<ChevronleftMd color={isLoading ? "#737373" : "#fff"} />}
                    onClick={handlePrev}
                    color="white"
                    fontSize={14}
                    fontWeight={400}
                    padding={0}
                    isDisabled={isLoading}
                >
                    {t('common.buttons.previous')}
                </BlueButton>

                <HStack spacing={2}>
                    {!isLoading && images.map((_, index) => (
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
                    rightIcon={<ChevronrightMd color={isLoading ? "#737373" : "#fff"} />}
                    onClick={handleNext}
                    color="white"
                    fontSize={14}
                    fontWeight={400}
                    padding={0}
                    isDisabled={isLoading}
                >
                    {t('common.buttons.next')}
                </BlueButton>
            </Flex>
        </Flex>
    )
}
