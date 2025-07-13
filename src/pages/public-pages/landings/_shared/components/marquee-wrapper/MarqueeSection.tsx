import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { partners } from '../../utils/partnersList'
import SectionContainer from '../SectionContainer/SectionContainer'
import MarqueeWrapper from './MarqueeWrapper'

// Import locale files
import localEn from 'locales/public-pages/landings/_shared/en.json'
import localAr from 'locales/public-pages/landings/_shared/ar.json'

/**
 * Section component that displays ecosystem partners in a scrolling marquee
 * Uses MarqueeWrapper to create horizontal scrolling effect with partner icons
 */
export default function MarqueeSection() {
    const { t } = useLocaleResources('public-pages/landings/_shared', { en: localEn, ar: localAr })

    return (
        <SectionContainer sectionTitle={t('marqueeSection.sectionTitle')} paddingBlock={6}>
            <MarqueeWrapper>
                {partners.map((image, index) => (
                    <IconWrapper
                        key={index}
                        border="none"
                        background="neutral.background"
                        icon={
                            <img
                                width="20px"
                                height="20px"
                                src={image.icon}
                                alt={image.title}
                            />
                        }
                    />
                ))}
            </MarqueeWrapper>
        </SectionContainer>
    )
}