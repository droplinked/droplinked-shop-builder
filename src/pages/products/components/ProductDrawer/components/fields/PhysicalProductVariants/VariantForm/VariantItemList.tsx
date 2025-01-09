import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { ProductProperty, ProductPropertyItem } from 'pages/products/utils/types'
import React, { useEffect, useState } from 'react'
import FormControl from '../../../common/FormControl'
import ColorPicker from './ColorPicker'

interface Props {
    localProperty: ProductProperty
    setLocalProperty: (property: ProductProperty) => void
    selectedVariant: string
}

function VariantItemList({ localProperty, setLocalProperty, selectedVariant }: Props) {
    const [newItem, setNewItem] = useState<ProductPropertyItem>({ caption: '', value: '' })

    // Automatically set default color value when the selected variant is "Color"
    useEffect(() => {
        setNewItem({ caption: '', value: selectedVariant === 'Color' ? '#FFFFFF' : '' })
    }, [selectedVariant, setNewItem])

    function handleItemChange(field: 'value' | 'caption', value: string) {
        if (selectedVariant !== 'Color' && field === 'value') {
            setNewItem({ value, caption: value })
        }
        else setNewItem(prevItem => ({ ...prevItem, [field]: value }))
    }

    function addItem() {
        if (!localProperty || isDuplicateItem(newItem)) return
        const updatedItems = [...localProperty.items, newItem]
        setLocalProperty({ ...localProperty, items: updatedItems })
        setNewItem({ caption: '', value: selectedVariant === 'Color' ? '#FFFFFF' : '' })
    }

    function removeItem(itemIndex: number) {
        const updatedItems = localProperty.items.filter((_, index) => index !== itemIndex)
        setLocalProperty({ ...localProperty, items: updatedItems })
    }

    function isDuplicateItem(item: ProductPropertyItem) {
        return localProperty?.items.some(
            existingItem => existingItem.caption === item.caption && existingItem.value === item.value
        )
    }

    function renderInputFields(item: ProductPropertyItem) {
        return selectedVariant === 'Color' ?
            <>
                <ColorPicker
                    color={item.value}
                    onColorChange={color => handleItemChange('value', color)}
                    containerProps={{ height: '50px' }}
                />
                <Input
                    inputProps={{
                        placeholder: 'Color Name',
                        value: item.caption,
                        onChange: e => handleItemChange('caption', e.target.value)
                    }}
                />
            </>
            :
            <Input
                inputProps={{
                    placeholder: 'Enter Value',
                    value: item.value,
                    onChange: e => handleItemChange('value', e.target.value)
                }}
            />
    }

    function renderItemButton(itemIndex: number) {
        const isLastItem = itemIndex === (localProperty?.items?.length || 0)
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
        <FormControl label='Value'>
            <Flex direction="column" gap={4}>
                {[...(localProperty?.items || []), newItem].map((item, itemIndex) => (
                    <Flex
                        key={itemIndex}
                        flex={1}
                        alignItems="center"
                        gap={4}
                        sx={{ input: { fontSize: 16 } }}
                    >
                        {renderInputFields(item)}
                        {renderItemButton(itemIndex)}
                    </Flex>
                ))}
            </Flex>
        </FormControl>
    )
}

export default VariantItemList