import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import ActionButton from './ActionButton'
import ProductTypesPopover from './ProductTypesPopover/ProductTypesPopover'

interface Props {
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
    productsCount: number
    isActionEnabled: boolean
}

function RightContent({ onImportModalOpen, onReorderModalOpen, productsCount, isActionEnabled }: Props) {
    return (
        <Flex flexDirection="row-reverse" gap={4}>
            <ProductTypesPopover>
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
                isDisabled={!isActionEnabled}
            />
        </Flex>
    )
}

export default RightContent