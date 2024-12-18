import { Button, Flex, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import { ProductProperty } from 'pages/products/utils/types'
import React, { useRef, useState } from 'react'

interface Props {
    selectedVariant: string
    setSelectedVariant: (value: string) => void
    properties: ProductProperty[]
    setLocalProperty: (property: ProductProperty | null) => void
}

function VariantSelector({ selectedVariant, setSelectedVariant, properties, setLocalProperty }: Props) {
    const dropdownOptions = [
        { label: 'Color', value: 'Color' },
        { label: 'Size', value: 'Size' }
    ]
    const [inputValue, setInputValue] = useState(selectedVariant)
    const inputRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleTypeSelect = (newValue: { label: string; value: string }) => {
        setInputValue('')
        const existingProperty = properties.find(property => property.value === newValue.value)

        if (existingProperty) setLocalProperty({ ...existingProperty })
        else {
            setLocalProperty({
                title: newValue.value,
                value: newValue.value,
                items: [{ value: '', caption: '' }],
                isCustom: !['Size', 'Color'].includes(newValue.value),
            })
        }

        setSelectedVariant(newValue.value)
    }

    const handlePopoverOpen = () => {
        setTimeout(() => inputRef.current?.focus())
        onOpen()
    }

    const handleDropdownOptionClick = (option: { label: string; value: string }) => {
        handleTypeSelect(option)
        onClose()
    }

    const isVariantSelected = (value: string) => selectedVariant === value

    return (
        <Popover
            isOpen={isOpen}
            onOpen={handlePopoverOpen}
            onClose={onClose}
            placement="bottom-start"
            closeOnBlur
        >
            <PopoverTrigger>
                <Flex
                    alignItems="center"
                    gap={2}
                    border="1px solid #292929"
                    borderRadius={8}
                    padding="12px 16px"
                    transition="border-color 0.1s ease-out"
                    _hover={{ borderColor: "#3C3C3C" }}
                    sx={{ input: { color: "#FFF", _placeholder: { color: "#7B7B7B" } } }}
                >
                    <input
                        ref={inputRef}
                        placeholder="Color, Size or Custom Variant"
                        value={inputValue}
                        maxLength={30}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <AppIcons.SelectChevronDown />
                </Flex>
            </PopoverTrigger>

            <PopoverContent
                width="534px"
                display="flex"
                flexDirection="column"
                gap={2}
                borderRadius={8}
                borderColor="#222"
                p={3}
                bgColor="#222"
                sx={{
                    button: {
                        justifyContent: "flex-start",
                        borderRadius: "6px",
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 400,
                        _hover: { bgColor: "#292929" }
                    }
                }}
            >
                {dropdownOptions.map(option => (
                    <Button
                        key={option.value}
                        bgColor={isVariantSelected(option.value) ? "#292929" : "unset"}
                        color="#FFF"
                        onClick={() => handleDropdownOptionClick(option)}
                    >
                        {option.label}
                    </Button>
                ))}

                {inputValue !== selectedVariant && (
                    <Button
                        display="flex"
                        alignItems="center"
                        gap={3}
                        color="#179EF8"
                        sx={{ path: { stroke: "#179EF8" } }}
                        bg="unset"
                        onClick={() => handleDropdownOptionClick({ label: inputValue, value: inputValue })}
                    >
                        <AppIcons.BlackPlus />
                        {`Create "${inputValue}"`}
                    </Button>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default VariantSelector