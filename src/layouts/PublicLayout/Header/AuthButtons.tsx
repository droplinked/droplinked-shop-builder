import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import UserMenu from './UserMenu'
import arLocale from 'locales/layout/PublicLayout/ar.json'
import enLocale from 'locales/layout/PublicLayout/en.json'

function AuthButtons() {
    const navigate = useNavigate()
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { user } = useAppStore()
    const { t } = useLocaleResources('layout/PublicLayout', { en: enLocale, ar: arLocale })

    if (user) return <UserMenu />

    const GetStartedButton = () => (
        <AppButton
            padding="10px 14px"
            onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
        >
            {t('getStarted')}
        </AppButton>
    )

    if (isMobile) return <GetStartedButton />

    return (
        <Flex gap={4}>
            <AppButton
                padding="10px 14px"
                variant="secondary"
                onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}
            >
                {t('Header.AuthButtons.signIn')}
            </AppButton>
            <GetStartedButton />
        </Flex>
    )
}

export default AuthButtons