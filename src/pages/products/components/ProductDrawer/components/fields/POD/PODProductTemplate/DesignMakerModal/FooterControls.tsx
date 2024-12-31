import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

function FooterControls({ onClose, isLoading, isIframeLoaded, handleSave, handleBack, publishProduct }) {
    return (
        <Flex justifyContent="space-between" gap={4}>
            <Button variant="secondary" isDisabled={isLoading} onClick={onClose}>
                Discard
            </Button>

            <Flex gap={4}>
                {!publishProduct && (
                    <Button variant="outline" isDisabled={isLoading} onClick={handleBack}>
                        Back
                    </Button>
                )}
                <Button
                    isDisabled={isLoading || !isIframeLoaded}
                    isLoading={isLoading}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Flex>
        </Flex>
    )
}

export default FooterControls