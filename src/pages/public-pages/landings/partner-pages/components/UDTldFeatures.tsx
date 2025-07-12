import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Features from '../assets/Features'
import localEn from 'locales/public-pages/landings/partner-pages/en.json'
import localAr from 'locales/public-pages/landings/partner-pages/ar.json'

export default function UDTldFeatures() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages', {
        en: localEn,
        ar: localAr
    });

    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle={t('udFeatures.sectionTitle')}
            headingTitle={t('udFeatures.headingTitle')}
            headingSubtitle={t('udFeatures.headingSubtitle')}
            typographySvg={<Features />}
        >
           <p color='white'>{t('udFeatures.featuresText')}</p>
        </SectionContainer>
    )
}
