import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import ActionButton from './ActionButton'
import ProductTypesPopover from './ProductTypesPopover/ProductTypesPopover'

interface Props {
    handleProductTypeSelection: (productType: string) => void
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
}

function RightContent({ handleProductTypeSelection, onImportModalOpen, onReorderModalOpen }: Props) {
    return (
        <Flex flexDirection="row-reverse" gap={4}>
            <ProductTypesPopover onProductTypeSelection={handleProductTypeSelection}>
                <ActionButton
                    icon={<AppIcons.BlackPlus />}
                    label="New Product"
                />
            </ProductTypesPopover>

            <ActionButton
                variant="secondary"
                icon={<AppIcons.Download />}
                label="Import"
                onClick={onImportModalOpen}
            />

            <ActionButton
                variant="secondary"
                icon={<AppIcons.VerticalMove />}
                label="Reorder Products"
                onClick={onReorderModalOpen}
            />
        </Flex>
    )
}

export default RightContent