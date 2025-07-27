import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function FooterControls({ onClose, isLoading, isIframeLoaded, handleSave }) {
    const { t } = useLocaleResources('products')
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={4}
        >
            <AppButton variant="secondary" isDisabled={isLoading} onClick={onClose}>
                {t('common:discard')}
            </AppButton>

            <AppButton
                isDisabled={isLoading || !isIframeLoaded}
                isLoading={isLoading}
                onClick={handleSave}
            >
                {t('common:save')}
            </AppButton>
        </Flex>
    )
}

export default FooterControls