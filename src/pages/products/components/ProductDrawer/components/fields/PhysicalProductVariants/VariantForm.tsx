import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues, ProductProperty } from 'pages/products/utils/types'
import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'

interface LocalProperty extends ProductProperty {
    isAdded: boolean
}

function VariantForm() {
    const [dropdownOptions, setDropdownOptions] = useState([
        { label: 'Color', value: 'Color' },
        { label: 'Size', value: 'Size' }
    ])

    const { values: { properties }, setFieldValue } = useFormikContext<ProductFormValues>()
    const [localProperties, setLocalProperties] = useState<LocalProperty[]>([])
    const [selectedVariant, setSelectedVariant] = useState<string>('')

    const handleTypeSelect = (newValue: any) => {
        console.log({ newValue })
        setLocalProperties([])
        const isCustomVariant = newValue.value !== 'Size' && newValue.value !== 'Color'

        const newProperty: LocalProperty = {
            title: newValue.value,
            value: isCustomVariant ? newValue.value : 'id',
            items: [{ value: '', caption: '' }],
            isCustom: isCustomVariant,
            isAdded: false
        }
        setLocalProperties([newProperty])
    }

    const isFieldsComplete = (items: { value: string, caption: string }[]) => {
        return items.every(item => item.value.trim() && (item.caption === undefined || item.caption.trim()))
    }

    const handleItemChange = (
        propIndex: number,
        itemIndex: number,
        field: 'value' | 'caption',
        value: string
    ) => {
        const updatedProperties = [...localProperties]

        // اگر تایپ چیزی غیر از Color بود، مقدار value باید به caption هم ست بشه
        if (updatedProperties[propIndex].title !== 'Color' && field === 'value') {
            updatedProperties[propIndex].items[itemIndex].caption = value
        }

        // حالا مقدار value یا caption که تغییر کرده رو ست می‌کنیم
        updatedProperties[propIndex].items[itemIndex][field] = value
        setLocalProperties(updatedProperties)
    }

    // اضافه کردن item جدید به localProperties
    const addToLocalProperties = (propIndex: number) => {
        const updatedProperties = [...localProperties]

        // وقتی دکمه "Add" زده میشه، فقط یک item جدید به items اضافه میشه
        updatedProperties[propIndex].items.push({ value: '', caption: '' })
        updatedProperties[propIndex].isAdded = true  // بعد از اضافه کردن، وضعیت isAdded را به true تغییر می‌دهیم
        setLocalProperties(updatedProperties)
    }

    // حذف یک property از localProperties
    const removeItem = (propIndex: number) => {
        const updatedProperties = [...localProperties]
        updatedProperties[propIndex].items.pop() // حذف آخرین item
        updatedProperties[propIndex].isAdded = false  // وقتی آیتم‌ها حذف شدند، وضعیت isAdded به false تغییر می‌کند
        setLocalProperties(updatedProperties)
    }

    // ذخیره کردن در کانتکست
    const saveToContext = () => {
        const updatedProperties = [...properties]

        // برای هر property در localProperties، یک شیء جدید ساخته می‌شود
        localProperties.forEach(property => {
            // حذف فیلد isAdded قبل از ذخیره
            const { isAdded, ...propertyWithoutIsAdded } = property

            const newProperty = {
                value: `${property.title}_id`,  // اینجا می‌تونید یک ID خاص برای سایز یا رنگ بذارید
                title: property.title,
                isCustom: property.isCustom,  // از isCustom مقدار درست استفاده می‌شود
                items: property.items.map(item => ({
                    value: item.value,
                    caption: item.caption || item.value,  // اگر Caption وجود نداشت، از value به عنوان caption استفاده می‌کنیم
                })),
            }

            updatedProperties.push(newProperty)
        })

        // به کانتکست فرستادن
        setFieldValue('properties', updatedProperties)
        setLocalProperties([])  // بعد از ذخیره کردن در کانتکست، localProperties پاک می‌شود
    }

    return (
        <Box color="white" borderRadius="md">
            {/* Dropdown برای انتخاب Type */}
            <CreatableSelect
                placeholder="Select or type"
                formatCreateLabel={(e) => `Create ${e}`}
                onChange={handleTypeSelect}
                options={dropdownOptions}
                isValidNewOption={(inputValue, _, options) =>
                    inputValue.trim() && !options.some(option => option.value === inputValue)
                }
            />

            {/* نمایش Properties */}
            <VStack spacing={4} mt={4} align="stretch">
                {localProperties.map((property, propIndex) => (
                    <Box key={propIndex} border="1px solid gray" p={3} borderRadius="md">
                        <strong>{property.title}</strong>

                        {/* برای Color */}
                        {property.title === 'Color' &&
                            property.items.map((item, itemIndex) => (
                                <HStack key={itemIndex} mt={2}>
                                    {/* Color Picker */}
                                    <Input
                                        inputProps={{
                                            type: 'color',
                                            value: item.value,
                                            onChange: (e) =>
                                                handleItemChange(propIndex, itemIndex, 'value', e.target.value),
                                        }}
                                    />
                                    {/* Caption */}
                                    <Input
                                        inputProps={{
                                            placeholder: 'Color Name',
                                            value: item.caption || '',
                                            onChange: (e) =>
                                                handleItemChange(propIndex, itemIndex, 'caption', e.target.value),
                                        }}
                                    />
                                </HStack>
                            ))}

                        {/* برای سایر انواع */}
                        {property.title !== 'Color' && (
                            <HStack mt={2}>
                                <Input
                                    inputProps={{
                                        placeholder: 'Enter Value',
                                        value: property.items[0]?.value || '',
                                        onChange: (e) =>
                                            handleItemChange(propIndex, 0, 'value', e.target.value),
                                    }}
                                />
                            </HStack>
                        )}

                        {/* دکمه افزودن */}
                        {!property.isAdded && (
                            <Button
                                mt={2}
                                colorScheme="blue"
                                onClick={() => addToLocalProperties(propIndex)}
                                isDisabled={!isFieldsComplete(property.items)}
                            >
                                Add
                            </Button>
                        )}

                        {/* دکمه حذف */}
                        {property.isAdded && (
                            <IconButton
                                mt={2}
                                aria-label="Delete Item"
                                icon={<AppIcons.Delete />}
                                onClick={() => removeItem(propIndex)}
                            />
                        )}
                    </Box>
                ))}
            </VStack>

            {/* دکمه ذخیره به کانتکست */}
            <Button
                mt={4}
                colorScheme="green"
                onClick={saveToContext}
                isDisabled={localProperties.length === 0}
            >
                Create
            </Button>
        </Box>
    )
}

export default VariantForm