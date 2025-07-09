import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import FinalCta from './FinalCta'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/redesign-landings/homePage/en.json'
import localAr from 'locales/public-pages/redesign-landings/homePage/ar.json'

export default function SignUpCta() {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    return (
        <FinalCta
            sectionTitle={t('joinNow.sectionTitle')}
            headingTitle={t('joinNow.headingTitle')}
            headingSubtitle={t('joinNow.headingSubtitle')}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton mt={6}>
                        {t('joinNow.getStarted')}
                    </AppButton>
                </Link>
            }
        />
    )
}
