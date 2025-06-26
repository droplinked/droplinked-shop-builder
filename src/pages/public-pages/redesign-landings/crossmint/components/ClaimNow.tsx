import Lottie from 'lottie-react'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import FinalCta from '../lottie/FinalCta.json'
import ClaimNowButton from './ClaimNowButton'

export default function ClaimNow() {
    return (
        <SectionContainer
            paddingTop={{ base: "80px", lg: "128px" }}
            paddingBottom={0}
            icon='bolt'
            sectionTitle='CLAIM NOW'
            headingTitle='Free 3 Month Pro Plan'
            headingSubtitle={`Unlock 3 months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
            subTitleElement={
                <ClaimNowButton />
            }
        >
            <Lottie animationData={FinalCta} style={{ paddingTop: '16px' }} />
        </SectionContainer >
    )
}
