import { Box, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ProductProperty } from 'pages/products/utils/types'
import React from 'react'

interface Props {
    variant: ProductProperty
}

interface VariantActionsProps {
    onEdit: () => void
    onRemove: () => void
}

interface VariantItemProps {
    item: { value: string, caption: string }
    isColorVariant: boolean
}

export default function VariantCard({ variant }: Props) {
    const { values: { properties }, setFieldValue } = useProductForm()

    const handleRemoveVariant = () => {
        const updatedProperties = properties.filter((prop) => prop.title !== variant.title)
        setFieldValue('properties', updatedProperties)
    }

    const handleEditVariant = () => {
        console.log(`Edit variant: ${variant.title}`)
    }

    return (
        <Flex
            direction="column"
            gap={4}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            <Flex gap={4}>
                <Text flex={1} fontWeight={500} color="#FFF">{variant.title}</Text>
                <VariantActions onEdit={handleEditVariant} onRemove={handleRemoveVariant} />
            </Flex>

            <Flex wrap="wrap" gap={2}>
                {variant.items.map((item, index) => (
                    <VariantItem key={index} item={item} isColorVariant={variant.title === 'Color'} />
                ))}
            </Flex>
        </Flex>
    )
}

function VariantActions({ onEdit, onRemove }: VariantActionsProps) {
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

function VariantItem({ item, isColorVariant }: VariantItemProps) {
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