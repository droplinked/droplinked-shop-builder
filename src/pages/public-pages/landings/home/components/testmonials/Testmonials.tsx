import { Grid } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { Feedback } from 'pages/public-pages/landings/_shared/types/types'
import React from 'react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import FeedbackSvg from '../../svgs/Feedback'
import TestmonialCard from './TestmonialCard'

export default function Testmonials() {
    const { t } = useLocaleResources('homePage')

    const feedbacks = t('feedbacks', { returnObjects: true }) as Feedback[]

    return (
        <SectionContainer
            icon='chat-heart'
            sectionTitle={t('testimonials.sectionTitle')}
            headingTitle={t('testimonials.headingTitle')}
            headingSubtitle={t('testimonials.headingSubtitle')}
            typographySvg={<FeedbackSvg />}
        >
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={{ base: 4, xl: 6 }}
            >
                {feedbacks.map((feedback, index) => (
                    <TestmonialCard
                        key={index}
                        feedback={feedback}
                        display={index === feedbacks.length - 1 ? { base: "block", md: "none", lg: "block" } : "block"}
                    />
                ))}
            </Grid>
        </SectionContainer>
    )
}
