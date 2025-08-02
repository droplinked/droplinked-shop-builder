import { useBreakpointValue } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import BookDemoFeedbackSlider from './BookDemoFeedbackSlider'
import BookDemoFormSection from './BookDemoFormSection'

function BookDemoHero() {
    const isMobileOrTablet = useBreakpointValue({ base: true, xl: false })

    return (
        <>
            <HeroSection
                title="Book Demo"
                subtitle="Discover how droplinked fit your business needs"
            >
                {!isMobileOrTablet &&
                    <HeroChildFrame>
                        <RuledGrid
                            height="100%"
                            borderBottom="1px solid"
                            borderColor="neutral.gray.800"
                            columns={2}
                            nested
                        >
                            <BookDemoFeedbackSlider />
                            <BookDemoFormSection />
                        </RuledGrid>
                    </HeroChildFrame>
                }
            </HeroSection>

            {isMobileOrTablet &&
                <HeroChildFrame>
                    <BookDemoFormSection />
                </HeroChildFrame>
            }
        </>
    )
}

export default BookDemoHero