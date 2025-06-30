import React from 'react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Feedback from '../../svgs/Feedback'
import TestmonialCard from './TestmonialCard'
import { Grid } from '@chakra-ui/react'

export default function Testmonials() {
    const feedbacks = [
        {
            feedback: 'I launched my NFT collection in minutes. droplinked made it super easy and the sales transparency has been incredible.',
            name: 'John D., Digital Artist',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/ac31212706927ab0670276812230a9b428f553d3e86e1e29a364e34068ad5520.png',
            time: 'August 2024'
        },
        {
            feedback: 'With droplinked, I scaled my product sales faster than I could have imagined. The integrations across blockchains were game changers!',
            name: 'Emily R., Entrepreneur',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/6657fbefd65755465c5efb806032e7f0385d422740e9cf1d6f1b23c1dad7a1c9.png',
            time: 'April 2025'
        },
        {
            feedback: 'The seamless crypto payment options and decentralized nature of the platform are exactly what I needed. My store is growing quickly with my community.',
            name: 'Michael T., Retailer',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/9e5b3744f2e1e055d2cb2a7ed2a2e497d721ea7cbe8b8a434833d5118ea4557a.png',
            time: 'December 2024'
        }
    ]

    return (
        <SectionContainer
            icon='chat-heart'
            sectionTitle='CUSTOMER TESTIMONIALS'
            headingTitle={`Join Thousands\nof Successful Sellers`}
            headingSubtitle="Hear from those who’ve made the shift to onchain commerce with droplinked"
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
