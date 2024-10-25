import { Popover, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import DropdownContent from './components/DropdownContent'
import DropdownTrigger from './components/DropdownTrigger'

interface Props {
    selectedSKUId: string | undefined
    onSelectSKU: (skuId: string) => void
    product: any
}

export default function VariantsDropdown({ selectedSKUId, onSelectSKU, product }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const selectedSKU = product.skuIDs.find(sku => sku._id === selectedSKUId)

    const openDropdown = () => {
        if (product.product_type !== "DIGITAL") onOpen()
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpen={openDropdown}
            onClose={onClose}
            placement='bottom-start'
        >
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