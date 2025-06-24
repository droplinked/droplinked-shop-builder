import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import { useCrossmintNavigation } from '../hooks/useCrossmintNavigation'

export default function ClaimNowButton() {
    const { getButtonText, navigateBasedOnStatus } = useCrossmintNavigation()

    return (
        <AppButton mt={6} onClick={navigateBasedOnStatus}>
            {getButtonText()}
        </AppButton>
    )
}
