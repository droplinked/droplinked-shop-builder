import { ModalFooter } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

export default function IdentifiedItemsFooter() {
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
            <Button>
                Import 42 Selected Items
            </Button>
        </ModalFooter>
    )
}
