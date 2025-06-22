import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import Lottie from 'lottie-react'
import FinalCta from '../lottie/FinalCta.json'
import { Link } from 'react-router-dom'
import { AUTH_ROUTES } from 'constants/authRoutes'

export default function ClaimNow() {
    return (
        <SectionContainer
            flexProps={{
                paddingTop: { base: "80px", lg: "128px" },
                paddingBottom: 0
            }}
            icon='bolt'
            sectionTitle='CLAIM NOW'
            headingTitle='Free 3 Month Pro Plan'
            headingSubtitle={`Unlock 3 months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton mt={6}>
                        Claim Now
                    </AppButton>
                </Link>
            }
        >
            <Lottie animationData={FinalCta} style={{ paddingTop: '16px' }} />
        </SectionContainer>
    )
}
