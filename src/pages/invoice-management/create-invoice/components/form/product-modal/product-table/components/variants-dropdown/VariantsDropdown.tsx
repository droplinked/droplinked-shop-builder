import { Popover } from '@chakra-ui/react'
import React from 'react'
import DropdownContent from './components/DropdownContent'
import DropdownTrigger from './components/DropdownTrigger'

interface Props {
    selectedSKUId: string | undefined
    onSelectSKU: (skuId: string) => void
    product: any
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function VariantsDropdown(props: Props) {
    const { isOpen, onOpen, onClose, selectedSKUId, onSelectSKU, product } = props
    const selectedSKU = product.skuIDs.find(sku => sku._id === selectedSKUId)

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-start'>
            <DropdownTrigger isOpen={isOpen} selectedSKU={selectedSKU} />
            <DropdownContent
                product={product}
                selectedSKUId={selectedSKUId}
                onSelectSKU={onSelectSKU}
                onClose={onClose}
            />
        </Popover>
    )
}