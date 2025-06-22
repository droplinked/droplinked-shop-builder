import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import Lottie from 'lottie-react'
import FinalCta from '../lottie/FinalCta.json'

export default function ClaimNow() {
    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='bolt'
                sectionTitle='CLAIM NOW'
                headingTitle='Free 3 Month Pro Plan'
                headingSubtitle={`Unlock 3 months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
                typographyText=''
                subTitleElement={
                    <AppButton mt={6}>
                        Claim Now
                    </AppButton>
                }
            >
                <Lottie animationData={FinalCta} style={{ paddingTop: '16px' }} />
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
