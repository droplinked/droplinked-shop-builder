import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import { updateSKUsOnVariantChange } from 'pages/products/utils/skuUtils'
import { ProductProperty, ProductPropertyItem } from 'pages/products/utils/types'
import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import VariantSelector from './VariantSelector'

function VariantForm({ handleDiscard }: { handleDiscard: () => void }) {
    const { values: { properties, sku }, setFieldValue } = useProductForm()

    const [selectedVariant, setSelectedVariant] = useState<string>('') // Tracks the currently selected variant

    // Local state for managing the selected property and its items
    const [localProperty, setLocalProperty] = useState<ProductProperty | undefined>(
        properties.find(p => p.title === selectedVariant)
    )

    const [newItem, setNewItem] = useState<ProductPropertyItem>({ caption: "", value: "" }) // For new input fields

    // Handles changes to individual item fields
    const handleItemChange = (field: 'value' | 'caption', value: string) => {
        if (selectedVariant !== 'Color' && field === 'value') {
            setNewItem({ value, caption: value })
        }
        else setNewItem(prevItem => ({ ...prevItem, [field]: value }))
    }

    // Adds a new item to the local property
    const addItem = () => {
        if (!localProperty) return
        const updatedItems = [...localProperty.items, newItem]
        setNewItem({ caption: "", value: "" })
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    // Removes an item from the local property
    const removeItem = (itemIndex: number) => {
        if (!localProperty) return
        const updatedItems = [...localProperty.items]
        updatedItems.splice(itemIndex, 1)
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    // Saves the current local property to the form context
    const saveToContext = () => {
        if (!localProperty) return

        // Filter out empty items to avoid saving invalid data
        const filteredItems = localProperty.items.filter(item => item.value.trim() !== '')
        if (filteredItems.length === 0) return

        const updatedProperties = [...properties]
        const updatedProperty = { ...localProperty, items: filteredItems }
        const existingIndex = properties.findIndex(p => p.value === localProperty.value)

        // Update or add the property in the context
        if (existingIndex > -1) updatedProperties[existingIndex] = updatedProperty
        else updatedProperties.push(updatedProperty)

        // Update form values and reset local state
        setFieldValue('properties', updatedProperties)
        setFieldValue('sku', updateSKUsOnVariantChange({ properties: updatedProperties, currentSKUs: sku }))
        setLocalProperty(null)
        setSelectedVariant('')
        handleDiscard()
    }

    // Renders appropriate input fields based on the selected variant
    const renderInputFields = (item: { value: string; caption: string }, itemIndex: number) => {
        return selectedVariant === 'Color' ?
            <>
                <ColorPicker
                    color={item.value}
                    onColorChange={(color) => handleItemChange('value', color)}
                    containerProps={{ height: "50px" }}
                />
                <Input
                    inputProps={{
                        placeholder: 'Color Name',
                        value: item.caption,
                        onChange: (e) => handleItemChange('caption', e.target.value),
                    }}
                />
            </>
            :
            <Input
                inputProps={{
                    placeholder: 'Enter Value',
                    value: item.value,
                    onChange: (e) => handleItemChange('value', e.target.value),
                }}
            />
    }

    // Renders add/remove buttons for items
    const renderItemButton = (itemIndex: number) => {
        // `newItem` is appended to the mapped array, so we do not subtract 1.
        const isLastItem = itemIndex === localProperty?.items?.length

        const isValidItem = newItem.value.trim() && (selectedVariant !== 'Color' || newItem.caption.trim())

        return isLastItem ?
            <button type='button' disabled={!isValidItem} onClick={addItem}>
                <AppIcons.GreenPlus />
            </button>
            :
            <button type='button' onClick={() => removeItem(itemIndex)}>
                <AppIcons.RedTrash />
            </button>
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
            <VariantSelector
                key={selectedVariant}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                properties={properties}
                setLocalProperty={setLocalProperty}
            />

            {/* Displays input fields and buttons for each item */}
            {localProperty && (
                <Flex w="full" direction="column" gap={4}>
                    {[...(localProperty?.items ?? []), newItem].map((item, itemIndex) => (
                        <Flex
                            key={itemIndex}
                            flex={1}
                            alignItems="center"
                            gap={4}
                            sx={{ input: { fontSize: 16 } }}
                        >
                            {renderInputFields(item, itemIndex)}
                            {renderItemButton(itemIndex)}
                        </Flex>
                    ))}
                </Flex>
            )}

            {/* Footer buttons for discarding or saving changes */}
            <Flex
                justifyContent="flex-end"
                gap={4}
                sx={{ button: { padding: '8px 12px', fontSize: 12, fontWeight: 500 } }}
            >
                <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
                <Button onClick={saveToContext}>Create</Button>
            </Flex>
        </Flex>
    )
}

export default VariantForm