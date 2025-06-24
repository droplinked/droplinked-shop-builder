import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton'
import { useAuthNavigation } from 'hooks/useAuthNavigation/useAuthNavigation'
import React from 'react'

export default function ClaimNowButton({ ...buttonProps }: AppButtonProps) {
    const { navigateBasedOnStatus } = useAuthNavigation()

    return (
        <AppButton mt={6} onClick={navigateBasedOnStatus} {...buttonProps}>
            Claim Now
        </AppButton>
    )
}
