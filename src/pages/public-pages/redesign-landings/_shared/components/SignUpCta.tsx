import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import FinalCta from '../../_shared/components/FinalCta'

export default function SignUpCta() {
    return (
        <FinalCta
            sectionTitle='JOIN NOW'
            headingTitle='Ready to Get Started?'
            headingSubtitle="Now’s the chance to join the next wave of commerce and make an impact "
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton mt={6}>
                        Get Started
                    </AppButton>
                </Link>
            }
        />
    )
}
