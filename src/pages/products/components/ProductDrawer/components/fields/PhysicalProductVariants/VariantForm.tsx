import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues, ProductProperty } from 'pages/products/utils/types'
import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import VariantSelector from './VariantSelector'

function VariantForm({ handleDiscard }: { handleDiscard: () => void }) {
    const { values: { properties }, setFieldValue } = useFormikContext<ProductFormValues>()
    const [localProperty, setLocalProperty] = useState<ProductProperty | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<string>('')

    const handleItemChange = (itemIndex: number, field: 'value' | 'caption', value: string) => {
        if (!localProperty) return
        const updatedItems = [...localProperty.items]

        updatedItems[itemIndex][field] = value
        if (field === 'value' && selectedVariant !== 'Color')
            updatedItems[itemIndex]['caption'] = value

        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    const addItem = () => {
        if (!localProperty) return
        const updatedItems = [...localProperty.items, { value: '', caption: '' }]
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    const removeItem = (itemIndex: number) => {
        if (!localProperty) return
        const updatedItems = [...localProperty.items]
        updatedItems.splice(itemIndex, 1)
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    const saveToContext = () => {
        if (!localProperty) return

        const filteredItems = localProperty.items.filter(item => item.value.trim() !== '')
        if (filteredItems.length === 0) return

        const updatedProperties = [...properties]
        const updatedProperty = { ...localProperty, items: filteredItems }
        const existingIndex = updatedProperties.findIndex(p => p.value === localProperty.value)

        if (existingIndex > -1) updatedProperties[existingIndex] = updatedProperty
        else updatedProperties.push(updatedProperty)

        setFieldValue('properties', updatedProperties)
        setLocalProperty(null)
        setSelectedVariant('')
    }

    const renderInputFields = (item: { value: string; caption: string }, itemIndex: number) => {
        return selectedVariant === 'Color' ?
            <>
                <ColorPicker
                    color={item.value}
                    onColorChange={(color) => handleItemChange(itemIndex, 'value', color)}
                    containerProps={{ height: "50px" }}
                />
                <Input
                    inputProps={{
                        placeholder: 'Color Name',
                        value: item.caption,
                        onChange: (e) => handleItemChange(itemIndex, 'caption', e.target.value),
                    }}
                />
            </>
            :
            <Input
                inputProps={{
                    placeholder: 'Enter Value',
                    value: item.value,
                    onChange: (e) => handleItemChange(itemIndex, 'value', e.target.value),
                }}
            />
    }

    const renderItemButton = (itemIndex: number) => {
        const isLastItem = itemIndex === localProperty!.items.length - 1
        const isValidItem =
            localProperty!.items[itemIndex].value.trim() &&
            (selectedVariant !== 'Color' || localProperty!.items[itemIndex].caption.trim())

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
            <VariantSelector
                key={selectedVariant}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                properties={properties}
                setLocalProperty={setLocalProperty}
            />

            {localProperty && (
                <Flex w="full" direction="column" gap={4}>
                    {localProperty.items.map((item, itemIndex) => (
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