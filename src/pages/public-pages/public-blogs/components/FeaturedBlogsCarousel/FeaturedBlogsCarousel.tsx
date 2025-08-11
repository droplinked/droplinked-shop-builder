import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useBlogs from '../../hooks/useBlogs'
import { IBlogListItem } from '../../types/blog.types'
import { CenterCard } from './CenterCard'
import { SideCard } from './SideCard'
import { NavButton } from './NavButton'
import SliderControls from '../common/SliderControls'

interface FeaturedBlogsCarouselProps {
  slides?: IBlogListItem[]
}

export default function FeaturedBlogsCarousel({ slides: slidesProp }: FeaturedBlogsCarouselProps) {
  const { getFeaturedBlogs, isLoading } = useBlogs()

  const slides = useMemo<IBlogListItem[]>(() => {
    if (slidesProp && slidesProp.length) return slidesProp
    return getFeaturedBlogs()
  }, [slidesProp, getFeaturedBlogs])

  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (slides.length) setCurrentIndex(0)
  }, [slides.length])

  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % (slides.length || 1)), [slides.length])
  const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + (slides.length || 1)) % (slides.length || 1)), [slides.length])

  const getByOffset = (offset: number) => slides[(currentIndex + offset + slides.length) % slides.length]
  const left2 = getByOffset(-2)
  const left1 = getByOffset(-1)
  const center = getByOffset(0)
  const right1 = getByOffset(1)
  const right2 = getByOffset(2)

  const sidesPerSide = useBreakpointValue({ base: 0, md: 1, lg: 2 }) ?? 2
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  if (isLoading) {
    return <Skeleton w={{ base: '100%', md: '100%' }} h={{ base: '384px', md: '480px' }} borderRadius="xl" />
  }
  if (!slides.length) return null

  const MobileLayout = () => (
    <Box w={{ base: '100%' }} maxW="1296px" h={{ base: '384px' }} position="relative" display="inline-flex" justifyContent="center" alignItems="flex-end">
      <CenterCard slide={center} />
      {slides.length > 1 && (
        <Box w="100%" position="absolute" bottom={-4} left="50%" transform="translateX(-50%)">
          <SliderControls
            onPrevious={prev}
            onNext={next}
            currentIndex={currentIndex}
            totalItems={slides.length}
            visibleItems={1}
          />
        </Box>
      )}
    </Box>
  )
  if (isMobile) return <MobileLayout />

  const OneSideLayout = () => (
    <Box w={{ md: '100%' }} maxW="1296px" h={{ md: '480px' }} position="relative" display="inline-flex" justifyContent="center" alignItems="flex-end" gap={6}>
      <SideCard slide={left1} />
      <Box w="24px" h={{ md: '480px' }} position="relative" display="flex" alignItems="center" justifyContent="center">
        <NavButton direction='prev' onClick={prev} />
      </Box>
      <CenterCard slide={center} />
      <Box w="24px" h={{ md: '480px' }} position="relative" display="flex" alignItems="center" justifyContent="center">
        <NavButton direction='next' onClick={next} />
      </Box>
      <SideCard slide={right1} />
    </Box>
  )
  if (sidesPerSide === 1) return <OneSideLayout />

  return (
    <Box w={{ lg: '100%' }} maxW="1296px" h={{ lg: '480px' }} position="relative" display="inline-flex" justifyContent="center" alignItems="flex-end" gap={6}>
      <Box position="relative" display="inline-flex" alignItems="flex-end" gap={6}>
        <SideCard slide={left2} />
        <SideCard slide={left1} />
        <NavButton direction='prev' onClick={prev} position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)" zIndex={1} />
      </Box>
      <CenterCard slide={center} />
      <Box position="relative" display="inline-flex" alignItems="flex-end" gap={6}>
        <SideCard slide={right1} />
        <SideCard slide={right2} />
        <NavButton direction='next' onClick={next} position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)" zIndex={1} />
      </Box>
    </Box>
  )
}


