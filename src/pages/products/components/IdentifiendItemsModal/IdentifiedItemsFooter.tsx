import { ModalFooter } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    selectedProductsCount: number
}

export default function IdentifiedItemsFooter({ selectedProductsCount }: Props) {
    const buttonText = selectedProductsCount > 0 ? `Import ${selectedProductsCount} Selected Items` : 'Select Items to Import'

    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <Button variant="secondary">
                Discard
            </Button>
            <Button isDisabled={selectedProductsCount === 0}>
                {buttonText}
            </Button>
        </ModalFooter>
    )
}
