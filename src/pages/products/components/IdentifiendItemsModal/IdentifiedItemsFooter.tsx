import { ModalFooter } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    selectedProductsCount: number
    onDiscard: () => void
    onImport: () => void
    isLoading?: boolean
}

export default function IdentifiedItemsFooter({ selectedProductsCount, onDiscard, onImport, isLoading = false }: Props) {
    const { t } = useLocaleResources('products');
    
    const buttonText = selectedProductsCount > 0
        ? t('IdentifiedItemsFooter.importSelected', { count: selectedProductsCount })
        : t('IdentifiedItemsFooter.selectItems')

    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <AppButton variant="secondary" onClick={onDiscard}>
                {t('common:discard')}
            </AppButton>
            <AppButton
                isDisabled={selectedProductsCount === 0}
                onClick={onImport}
                isLoading={isLoading}
            >
                {buttonText}
            </AppButton>
        </ModalFooter>
    )
}
