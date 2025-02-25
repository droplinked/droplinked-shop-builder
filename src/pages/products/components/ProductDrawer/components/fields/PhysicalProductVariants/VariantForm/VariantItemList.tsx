import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { ProductProperty, ProductPropertyItem } from 'pages/products/utils/types'
import React, { useEffect, useState } from 'react'
import FormControl from '../../../common/FormControl'
import ColorPicker from './ColorPicker'

interface Props {
    localProperty: ProductProperty
    setLocalProperty: (property: ProductProperty) => void
}

function VariantItemList({ localProperty, setLocalProperty }: Props) {
    const [newItem, setNewItem] = useState<ProductPropertyItem>({ caption: '', value: '' })

    // Store the condition in a variable
    const isColorVariant = localProperty?.title === 'Color' && !localProperty?.isCustom

    useEffect(() => {
        setNewItem({ caption: '', value: isColorVariant ? '#FFFFFF' : '' })
    }, [isColorVariant])

    function handleItemChange(field: 'value' | 'caption', value: string, itemIndex: number) {
        const isLastItem = itemIndex === localProperty.items.length

        if (isLastItem) {
            setNewItem(prev => isColorVariant
                ? { ...prev, [field]: value }
                : { value, caption: value }
            )
        }
        else {
            const updatedItems = [...localProperty.items]
            updatedItems[itemIndex] = isColorVariant
                ? { ...updatedItems[itemIndex], [field]: value }
                : { value, caption: value }
            setLocalProperty({ ...localProperty, items: updatedItems })
        }
    }

    function addItem() {
        if (!newItem.value.trim() || (isColorVariant && !newItem.caption.trim())) return
        if (isDuplicateItem(newItem)) return
        setLocalProperty({ ...localProperty, items: [...localProperty.items, newItem] })
        setNewItem({ caption: '', value: isColorVariant ? '#FFFFFF' : '' })
    }

    function removeItem(itemIndex: number) {
        const updatedItems = localProperty.items.filter((_, index) => index !== itemIndex)
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    function isDuplicateItem(item: ProductPropertyItem) {
        return localProperty.items.some(
            existingItem => existingItem.caption === item.caption && existingItem.value === item.value
        )
    }

    function renderInputFields(item: ProductPropertyItem, itemIndex: number) {
        return isColorVariant ?
            <>
                <ColorPicker
                    color={item.value}
                    onColorChange={color => handleItemChange('value', color, itemIndex)}
                    containerProps={{ height: '50px' }}
                />
                <Input
                    inputProps={{
                        placeholder: 'Color Name',
                        value: item.caption,
                        onChange: e => handleItemChange('caption', e.target.value, itemIndex)
                    }}
                />
            </>
            :
            <Input
                inputProps={{
                    placeholder: 'Enter Value',
                    value: item.value,
                    onChange: e => handleItemChange('value', e.target.value, itemIndex)
                }}
            />
    }

    function renderItemButton(itemIndex: number) {
        const isLastItem = itemIndex === localProperty.items.length
        const isValidItem = newItem.value.trim() && (!isColorVariant || newItem.caption.trim())

        return isLastItem ?
            <button type="button" disabled={!isValidItem} onClick={addItem}>
                <AppIcons.GreenPlus />
            </button>
            :
            <button type="button" onClick={() => removeItem(itemIndex)}>
                <AppIcons.RedTrash />
            </button>
    }

    return (
        <FormControl label="Value">
            <Flex direction="column" gap={4}>
                {localProperty.items.map((item, index) => (
                    <Flex
                        key={index}
                        flex={1}
                        alignItems="center"
                        gap={4}
                        sx={{ input: { fontSize: 16 } }}
                    >
                        {renderInputFields(item, index)}
                        {renderItemButton(index)}
                    </Flex>
                ))}
                {/* Render the newItem inputs separately as the last row */}
                <Flex
                    flex={1}
                    alignItems="center"
                    gap={4}
                    sx={{ input: { fontSize: 16 } }}
                >
                    {renderInputFields(newItem, localProperty.items.length)}
                    {renderItemButton(localProperty.items.length)}
                </Flex>
            </Flex>
        </FormControl>
    )
}

export default VariantItemList