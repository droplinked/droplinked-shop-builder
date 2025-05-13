import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

function FooterControls({ onClose, isLoading, isIframeLoaded, handleSave }) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={4}
        >
            <AppButton variant="secondary" isDisabled={isLoading} onClick={onClose}>
                Discard
            </AppButton>

            <AppButton
                isDisabled={isLoading || !isIframeLoaded}
                isLoading={isLoading}
                onClick={handleSave}
            >
                Save
            </AppButton>
        </Flex>
    )
}

export default FooterControls