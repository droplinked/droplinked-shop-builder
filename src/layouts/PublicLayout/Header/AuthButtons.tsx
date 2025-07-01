import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import UserMenu from './UserMenu'

const AuthButtons = () => {
    const navigate = useNavigate()
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { user } = useAppStore()
    const { t } = useLocaleResources('common')

    const GetStartedButton = () => (
        <AppButton
            padding="10px 14px"
            onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
        >
            {t('getStarted')}
        </AppButton>
    )

    if (user) return <UserMenu />

    if (isMobile) return <GetStartedButton />

    return (
        <Flex gap={4}>
            <AppButton
                padding="10px 14px"
                variant="secondary"
                onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}
            >
                {t('signIn')}
            </AppButton>
            <GetStartedButton />
        </Flex>
    )
}

export default AuthButtons