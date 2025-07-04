// Reusable claim button component for partner landing pages
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton'
import React from 'react'

interface ClaimNowButtonProps extends Omit<AppButtonProps, 'onClick'> {
  onClaim: () => void;
}

export default function ClaimNowButton({ onClaim, ...buttonProps }: ClaimNowButtonProps) {
    return (
        <AppButton
            mt={6}
            onClick={onClaim}
            {...buttonProps}
        >
            Claim Now
        </AppButton>
    )
}
