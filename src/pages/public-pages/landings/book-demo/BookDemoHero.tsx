import { useBreakpointValue } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import BookDemoFeedbackSlider from './BookDemoFeedbackSlider'
import BookDemoFormSection from './BookDemoFormSection'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function BookDemoHero() {
    const isMobileOrTablet = useBreakpointValue({ base: true, xl: false })
    const { t } = useLocaleResources('book-demo')

    return (
        <>
            <HeroSection
                title={t('BookDemoHero.title')}
                subtitle={t('BookDemoHero.subtitle')}
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