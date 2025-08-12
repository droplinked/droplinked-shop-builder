import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import IframeAwareLink from 'components/redesign/iframe-aware-link/IframeAwareLink'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import UserMenu from './UserMenu'

function AuthButtons() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { user } = useAppStore()
    const { t } = useLocaleResources('layout/PublicLayout')

    if (user) return <UserMenu />

    const GetStartedButton = () => (
        <IframeAwareLink to={AUTH_ROUTES.SIGN_UP}>
            <AppButton padding="10px 14px">
                {t('getStarted')}
            </AppButton>
        </IframeAwareLink>
    )

    if (isMobile) return <GetStartedButton />

    return (
        <Flex width="200px" justifyContent="flex-end" gap={4}>
            <IframeAwareLink to={AUTH_ROUTES.SIGN_IN}>
                <AppButton
                    padding="10px 14px"
                    variant="secondary"
                >
                    {t('Header.AuthButtons.signIn')}
                </AppButton>
            </IframeAwareLink>
            <GetStartedButton />
        </Flex>
    )
}

export default AuthButtons