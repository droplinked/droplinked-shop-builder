import AppIcons from 'assets/icon/Appicons'
import Button from 'components/redesign/button/Button'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BASE_URL } from 'utils/app/variable'

interface GoogleAuthButtonProps {
    isSignUp: boolean
    isDisabled?: boolean
    referralCode?: string
    d3Id?: string | null
    udId?: string | null
}

function GoogleAuthButton({ isSignUp, isDisabled, referralCode, d3Id, udId }: GoogleAuthButtonProps) {
    const [searchParams] = useSearchParams()
    const { authenticateUser, finalizeLogin, loading } = useLogin()

    function handleClick() {
        const googleAuthUrl = new URL(`${BASE_URL}/auth/login/google`)

        if (isSignUp) {
            if (referralCode) googleAuthUrl.searchParams.append("referralCode", referralCode)
            if (d3Id) googleAuthUrl.searchParams.append("d3UserId", d3Id)
            if (udId) googleAuthUrl.searchParams.append("udUserId", udId)
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
                if (result) await finalizeLogin(result)
            }
        }

        handleGoogleLogin()
    }, [searchParams, loading, authenticateUser, finalizeLogin])

    return (
        <Button
            variant="secondary"
            leftIcon={<AppIcons.Google />}
            isDisabled={isDisabled}
            onClick={handleClick}
        >
            Google Account
        </Button>
    )
}

export default GoogleAuthButton