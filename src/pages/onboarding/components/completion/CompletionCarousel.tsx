import { Box, useBreakpointValue } from '@chakra-ui/react'
import CommunityEngagement from 'components/redesign/community-engagement/CommunityEngagement'
import React, { forwardRef } from 'react'
import Slider from 'react-slick'
import NewsletterSubscription from './NewsletterSubscription'
import VideoPlayer from './VideoPlayer'

interface CompletionCarouselProps {
    currentSlideIndex: number;
}

const CompletionCarousel = forwardRef<Slider, CompletionCarouselProps>(({ currentSlideIndex }, ref) => {
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        fade: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    }

    return (
        <Slider {...sliderSettings} ref={ref}>
            {currentSlideIndex !== 1 && <VideoPlayer />}

            <Box>
                <NewsletterSubscription />
                <CommunityEngagement columns={communityEngagementColumns} includeBlueSky borderRadius={8} />
            </Box>
        </Slider>
    )
}
)

export default CompletionCarousel