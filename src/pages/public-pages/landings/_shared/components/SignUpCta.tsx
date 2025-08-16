import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import FinalCta from './FinalCta'

export default function SignUpCta() {
    const { t } = useLocaleResources('common')

    return (
        <FinalCta
            sectionTitle={t('joinNow.sectionTitle')}
            headingTitle={t('joinNow.headingTitle')}
            headingSubtitle={t('joinNow.headingSubtitle')}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton mt={6}>
                        {t('getStarted')}
                    </AppButton>
                </Link>
            }
        />
    )
}
