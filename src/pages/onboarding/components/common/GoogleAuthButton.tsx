import { Google1 } from 'assets/logo/Companies/Google/Google1'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BASE_URL } from 'utils/app/variable'

interface GoogleAuthButtonProps {
    isSignUp: boolean
    isDisabled?: boolean
    referralCode?: string
    d3Id?: string
    udId?: string
    baseId?: string
    source?: string
}

function GoogleAuthButton({ isSignUp, isDisabled, referralCode, d3Id, udId, baseId, source }: GoogleAuthButtonProps) {
    const [searchParams] = useSearchParams()
    const { authenticateUser, handleLoginSuccess, loading } = useLogin()
    const { t } = useLocaleResources('onboarding')

    function handleClick() {
        const googleAuthUrl = new URL(`${BASE_URL}/auth/login/google`)

        if (isSignUp) {
            if (referralCode) googleAuthUrl.searchParams.append("referralCode", referralCode)
            if (d3Id) googleAuthUrl.searchParams.append("d3UserId", d3Id)
            if (udId) googleAuthUrl.searchParams.append("udUserId", udId)
            if (baseId) googleAuthUrl.searchParams.append("baseUserId", baseId)
            // I know this is hilarious, but the backend team wanted it this way
            if (source === "crossmint") googleAuthUrl.searchParams.append("crossmintUserId", "some-random-id")
        }

        window.location.href = googleAuthUrl.toString()
    }

    useEffect(() => {
        async function handleGoogleLogin() {
            const access_token = searchParams.get("access_token")
            const refresh_token = searchParams.get("refresh_token")

            if (access_token && refresh_token && !loading) {
                const result = await authenticateUser({
                    type: "get",
                    access_token,
                    refresh_token,
                    params: { access_token }
                })
                if (result) await handleLoginSuccess(result)
            }
        }

        handleGoogleLogin()
    }, [searchParams, loading, authenticateUser, handleLoginSuccess])

    return (
        <AppButton
            variant="secondary"
            leftIcon={<Google1 />}
            useOriginalIconColor={true}
            isLoading={loading}
            isDisabled={isDisabled}
            onClick={handleClick}
        >
            {t('common.googleAccount')}
        </AppButton>
    )
}

export default GoogleAuthButton