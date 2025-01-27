import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useProductForm from 'pages/products/hooks/useProductForm'
import { updateSKUsOnVariantChange } from 'pages/products/utils/skuUtils'
import React, { useState } from 'react'
import FormControl from '../../../common/FormControl'
import VariantItemList from './VariantItemList'
import VariantSelector from './VariantSelector'

interface Props {
    handleDiscard: () => void
    editingVariant?: string
}

function VariantForm({ handleDiscard, editingVariant }: Props) {
    const { values: { properties, sku }, setFieldValue } = useProductForm()
    const [localProperty, setLocalProperty] = useState(
        properties.find(p => p.title === editingVariant) || null
    )

    function saveToContext() {
        if (!localProperty?.title) return

        const updatedProperties = [...properties]
        const existingIndex = updatedProperties.findIndex(p => p.value === localProperty?.value)
        const isEmptyProperty = localProperty?.items?.length === 0

        if (existingIndex > -1) {
            isEmptyProperty
                ? updatedProperties.splice(existingIndex, 1) // Remove if empty
                : updatedProperties[existingIndex] = localProperty // Update existing
        }
        else if (!isEmptyProperty) {
            updatedProperties.push(localProperty) // Add new property only if not empty
        }

        setFieldValue('properties', updatedProperties)
        setFieldValue('sku', updateSKUsOnVariantChange({ properties: updatedProperties, currentSKUs: sku }))

        handleDiscard()
    }

    return (
        <Flex
            direction="column"
            gap={9}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            {/* Allows selecting the variant type */}
            <FormControl label='Type'>
                <VariantSelector
                    properties={properties}
                    localProperty={localProperty}
                    setLocalProperty={setLocalProperty}
                />
            </FormControl>

            {/* Item list */}
            {localProperty && (
                <VariantItemList
                    localProperty={localProperty}
                    setLocalProperty={setLocalProperty}
                />
            )}

            {/* Footer buttons */}
            <Flex
                justifyContent="flex-end"
                gap={4}
                sx={{ button: { padding: '8px 12px', fontSize: 12, fontWeight: 500 } }}
            >
                <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
                <Button onClick={saveToContext}>
                    {editingVariant ? 'Edit' : 'Save'}
                </Button>
            </Flex>
        </Flex>
    )
}

export default VariantForm