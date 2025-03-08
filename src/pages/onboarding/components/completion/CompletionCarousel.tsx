import { Box } from '@chakra-ui/react'
import CommunityEngagement from 'pages/dashboard/components/CommunityEngagement/CommunityEngagement'
import React, { forwardRef } from 'react'
import Slider from 'react-slick'
import NewsletterSubscription from './NewsletterSubscription'
import VideoPlayer from './VideoPlayer'

const CompletionCarousel = forwardRef<Slider>((_, ref) => {
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <Slider {...sliderSettings} ref={ref}>
            <VideoPlayer />

            <Box>
                <NewsletterSubscription />
                <CommunityEngagement />
            </Box>
        </Slider>
    )
}
)

export default CompletionCarousel