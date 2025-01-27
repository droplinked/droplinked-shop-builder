import { Box, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useProductForm from 'pages/products/hooks/useProductForm'
import { updateSKUsOnVariantChange } from 'pages/products/utils/skuUtils'
import { ProductProperty } from 'pages/products/utils/types'
import React from 'react'

interface Props {
    variant: ProductProperty
    onEdit?: (editingVariant: ProductProperty) => void
}

export default function ProductVariantCard({ variant, onEdit }: Props) {
    const { values: { properties, sku, product_type }, setFieldValue } = useProductForm()

    const isNormalProduct = product_type === 'NORMAL'

    const handleRemoveVariant = () => {
        if (!isNormalProduct) return

        const updatedProperties = properties.filter((prop) => prop.title !== variant.title)
        setFieldValue('properties', updatedProperties)
        setFieldValue('sku', updateSKUsOnVariantChange({ properties: updatedProperties, currentSKUs: sku }))
    }

    return (
        <Flex
            direction="column"
            gap={4}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            <Flex justifyContent="space-between" alignItems="center">
                <Text flex={1} fontWeight={500} color="#FFF">{variant.title}</Text>
                {isNormalProduct && (
                    <VariantActions
                        onEdit={() => onEdit?.(variant)}
                        onRemove={handleRemoveVariant}
                    />
                )}
            </Flex>

            <Flex wrap="wrap" gap={2}>
                {variant.items.map((item, index) => (
                    <VariantItem
                        key={index}
                        item={item}
                        isColorVariant={variant.title === 'Color' && !variant.isCustom}
                    />
                ))}
            </Flex>
        </Flex>
    )
}

function VariantActions({ onEdit, onRemove }) {
    return (
        <Box sx={{ button: { padding: '10px' } }}>
            <button type="button" onClick={onEdit}>
                <AppIcons.Edit />
            </button>
            <button type="button" onClick={onRemove}>
                <AppIcons.RedTrash />
            </button>
        </Box>
    )
}

function VariantItem({ item, isColorVariant }) {
    return (
        <Flex
            alignItems="center"
            gap="6px"
            borderRadius={4}
            padding="4px 8px"
            bgColor="#222"
            fontSize={14}
            color="#FFF"
        >
            {isColorVariant && <Box w={4} h={4} borderRadius={2} bgColor={item.value} />}
            {item.caption}
        </Flex>
    )
}