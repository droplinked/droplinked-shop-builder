import AppIcons from 'assets/icon/Appicons'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { BASE_URL } from 'utils/app/variable'

interface GoogleAuthButtonProps {
    isSignUp: boolean
    isDisabled?: boolean
    referralCode?: string
    d3Id?: string | null
    udId?: string | null
}

function GoogleAuthButton({ isSignUp, isDisabled, referralCode, d3Id, udId }: GoogleAuthButtonProps) {
    function handleClick() {
        const googleAuthUrl = new URL(`${BASE_URL}/auth/login/google`)

        if (isSignUp) {
            if (referralCode) googleAuthUrl.searchParams.append("referralCode", referralCode)
            if (d3Id) googleAuthUrl.searchParams.append("d3UserId", d3Id)
            if (udId) googleAuthUrl.searchParams.append("udUserId", udId)
        }

        window.location.href = googleAuthUrl.toString()
    }

    return (
        <Button
            variant="secondary"
            leftIcon={<AppIcons.Google />}
            onClick={handleClick}
            isDisabled={isDisabled}
        >
            Google Account
        </Button>
    )
}

export default GoogleAuthButton