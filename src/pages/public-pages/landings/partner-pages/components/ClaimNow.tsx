import React from 'react'
import ClaimNowButton from './ClaimNowButton'
import FinalCta from '../../_shared/components/FinalCta'
import { usePartnerLanding } from '../context/PartnerLandingContext'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ClaimNow() {
    const { trialMonths } = usePartnerLanding();
    const { t } = useLocaleResources('public-pages/landings/partner-pages');

    return (
        <FinalCta
            sectionTitle={t('ClaimNow.sectionTitle')}
            headingTitle={t('ClaimNow.headingTitle', { trialMonths })}
            headingSubtitle={t('ClaimNow.headingSubtitle', { trialMonths })}
            subTitleElement={<ClaimNowButton />}
        />
    )
}