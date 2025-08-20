import { Box, Flex, Text } from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import { Star1Md } from 'assets/icons/System/Star1/Star1Md'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import { AnimatePresence, motion } from 'framer-motion'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { Feedback } from 'pages/public-pages/landings/_shared/types/types'
import React, { useState } from 'react'
import FeedbackAuthor from '../_shared/components/FeedbackAuthor'

export default function BookDemoFeedbackSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { t, isRTL } = useLocaleResources('common')

    const feedbacks = t('feedbacks', { returnObjects: true }) as Feedback[]
    const totalSlides = feedbacks.length
    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalSlides)
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)

    return (
        <Box
            position="relative"
            height="100%"
            padding={{ base: 4, md: 6 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ height: "100%" }}
                >
                    <Flex height="100%" direction="column" gap={4}>
                        <FeedbackRating rating={5} />
                        <Text flex={1} fontSize={20} color="text.white">
                            {feedbacks[currentIndex].content}
                        </Text>
                        <FeedbackAuthor feedback={feedbacks[currentIndex]} hasQuote={false} />
                    </Flex>
                </motion.div>
            </AnimatePresence>

            <RuledGrid
                position="absolute"
                right={isRTL ? "unset" : 6}
                left={isRTL ? 6 : "unset"}
                bottom={6}
                borderRadius={8}
                columns={2}
                sx={{ button: { padding: "10px" } }}
            >
                <button onClick={handlePrev}>
                    {isRTL ? <ChevronrightMd color='#fff' /> : <ChevronleftMd color='#fff' />}
                </button>
                <button onClick={handleNext}>
                    {isRTL ? <ChevronleftMd color='#fff' /> : <ChevronrightMd color='#fff' />}
                </button>
            </RuledGrid>
        </Box>
    )
}

const FeedbackRating = ({ rating }: { rating: number }) => {
    return (
        <Flex gap={1}>
            {Array.from({ length: rating }).map((_, index) => (
                <Star1Md key={index} color='#fff' />
            ))}
        </Flex>
    )
}