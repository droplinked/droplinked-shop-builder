import React from 'react'
import ClaimNowButton from './ClaimNowButton'
import FinalCta from '../../_shared/components/FinalCta'
import { usePartnerLanding } from '../context/PartnerLandingContext'

export default function ClaimNow() {
    const { trialMonths } = usePartnerLanding();

    return (
        <FinalCta
            sectionTitle='CLAIM NOW'
            headingTitle={`Free ${trialMonths} Month Pro Plan`}
            headingSubtitle={`Unlock ${trialMonths} months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
            subTitleElement={<ClaimNowButton />}
        />
    )
}