import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/homePage/en.json'
import localAr from 'locales/public-pages/landings/homePage/ar.json'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Feedback from '../../svgs/Feedback'
import TestmonialCard from './TestmonialCard'
import { Grid } from '@chakra-ui/react'

export default function Testmonials() {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    const feedbacks = t('testimonials.feedbacks', { returnObjects: true }) as Array<{
        feedback: string;
        name: string;
        image: string;
        time: string;
    }>

    return (
        <SectionContainer
            icon='chat-heart'
            sectionTitle={t('testimonials.sectionTitle')}
            headingTitle={t('testimonials.headingTitle')}
            headingSubtitle={t('testimonials.headingSubtitle')}
            typographySvg={<Feedback />}
        >
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={{ base: 4, xl: 6 }}
            >
                {feedbacks.map((feedback, index) => (
                    <TestmonialCard
                        key={index}
                        feedback={feedback.feedback}
                        name={feedback.name}
                        image={feedback.image}
                        time={feedback.time}
                        display={index === feedbacks.length - 1 ? { base: "block", md: "none", lg: "block" } : "block"}
                    />
                ))}
            </Grid>
        </SectionContainer>
    )
}
