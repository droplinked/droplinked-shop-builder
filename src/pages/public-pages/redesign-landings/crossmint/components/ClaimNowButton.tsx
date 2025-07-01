import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton'
import { useAuthNavigation } from 'hooks/useAuthNavigation/useAuthNavigation'
import React from 'react'

interface ClaimNowButtonProps extends AppButtonProps {
    t: (key: string) => string;
}

export default function ClaimNowButton({ t, ...buttonProps }: ClaimNowButtonProps) {
    const { navigateBasedOnStatus } = useAuthNavigation()

    const handleClaimNow = () => navigateBasedOnStatus({ source: 'crossmint' })

    // Add safety check for t function
    if (typeof t !== 'function') {
        console.error('Translation function t is not a function:', t)
        return (
            <AppButton
                mt={6}
                onClick={handleClaimNow}
                {...buttonProps}
            >
                Claim Now
            </AppButton>
        )
    }

    return (
        <AppButton
            mt={6}
            onClick={handleClaimNow}
            {...buttonProps}
        >
            {t('claimNow.buttonText')}
        </AppButton>
    )
}
