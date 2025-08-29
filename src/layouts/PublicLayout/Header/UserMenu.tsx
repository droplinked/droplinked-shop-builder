import { Center, Flex, Text } from '@chakra-ui/react'
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd'
import { UserMd } from 'assets/icons/System/User/UserMd'
import IframeAwareLink from 'components/redesign/iframe-aware-link/IframeAwareLink'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import { UserMenu as ProducerUserMenu } from '../../ProducerLayout/Header/UserMenu/UserMenu'

function UserMenu() {
    const { shop, user } = useAppStore()
    const { isRTL } = useLocaleResources('layout/PublicLayout')

    const userStatus = user?.status
    const isFullyOnboarded = userStatus === "SHOP_INFO_COMPLETED" || userStatus === "ACTIVE"

    const getUserRedirectRoute = () => {
        if (userStatus === "NEW") return AUTH_ROUTES.SIGNUP_EMAIL_VERIFICATION
        if (["VERIFIED", "PROFILE_COMPLETED"].includes(userStatus)) return AUTH_ROUTES.EXISTING_WEBSITE // TODO: Change to dashboard
        if (isFullyOnboarded) return "/analytics/dashboard"

        return AUTH_ROUTES.SIGN_IN
    }

    return (
        <Flex
            border='1px solid'
            borderColor='neutral.gray.900'
            borderRadius={8}
            userSelect='none'
        >
            <IframeAwareLink to={getUserRedirectRoute()}>
                <Flex
                    as="button"
                    alignItems='center'
                    gap='6px'
                    borderRight={isRTL ? 'none' : 'inherit'}
                    borderLeft={isRTL ? 'inherit' : 'none'}
                    borderColor='inherit'
                    padding='10px 14px'
                >
                    <UserMd color='#fff' />
                    <Text fontSize={14} fontWeight={500} color='text.white'>{shop?.name}</Text>
                </Flex>
            </IframeAwareLink>

            {isFullyOnboarded && (
                <ProducerUserMenu
                    trigger={
                        <Center padding='10px'>
                            <ChevrondownMd />
                        </Center>
                    }
                />
            )}
        </Flex>
    )
}

export default UserMenu