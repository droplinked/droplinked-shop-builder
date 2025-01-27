import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

function FooterControls({ onClose, isLoading, isIframeLoaded, handleSave }) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={4}
        >
            <Button variant="secondary" isDisabled={isLoading} onClick={onClose}>
                Discard
            </Button>

            <Button
                isDisabled={isLoading || !isIframeLoaded}
                isLoading={isLoading}
                onClick={handleSave}
            >
                Save
            </Button>
        </Flex>
    )
}

export default FooterControls