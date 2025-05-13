import { ModalFooter } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

interface Props {
    selectedProductsCount: number
    onDiscard: () => void
    onImport: () => void
    isLoading?: boolean
}

export default function IdentifiedItemsFooter({ selectedProductsCount, onDiscard, onImport, isLoading = false }: Props) {
    const buttonText = selectedProductsCount > 0
        ? `Import ${selectedProductsCount} Selected Items`
        : 'Select Items to Import'

    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <AppButton variant="secondary" onClick={onDiscard}>
                Discard
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
