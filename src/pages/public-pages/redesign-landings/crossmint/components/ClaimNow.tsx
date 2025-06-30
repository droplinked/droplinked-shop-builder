import React from 'react'
import ClaimNowButton from './ClaimNowButton'
import FinalCta from '../../_shared/components/FinalCta'

export default function ClaimNow() {
    return (
        <FinalCta
            sectionTitle='CLAIM NOW'
            headingTitle='Free 3 Month Pro Plan'
            headingSubtitle={`Unlock 3 months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
            subTitleElement={<ClaimNowButton />}
        />
    )
}
