import { Button, Flex, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { attributeToIdMap, ProductProperty } from 'pages/products/utils/types'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
    properties: ProductProperty[]
    localProperty: ProductProperty
    setLocalProperty: (property: ProductProperty) => void
}

function VariantSelector({ properties, setLocalProperty, localProperty }: Props) {
    const { t } = useLocaleResources('products')
    const dropdownOptions = ["Color", "Size"]
    const [inputValue, setInputValue] = useState(localProperty?.title)
    const inputRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const canAddVariants = properties.length < 2
    const isPredefinedOrEmpty = dropdownOptions.includes(inputValue) || !inputValue
    const buttonText = isPredefinedOrEmpty
        ? t('variantSelector.createCustomVariant')
        : t('variantSelector.createVariant', { variant: inputValue })

    const handleDropdownOptionClick = ({ selectedVariant, isCustomVariant }) => {
        setInputValue(selectedVariant)
        const existingProperty = properties.find(property => property.title === selectedVariant)

        if (existingProperty) setLocalProperty({ ...existingProperty })
        else {
            setLocalProperty({
                title: selectedVariant,
                value: isCustomVariant ? selectedVariant : attributeToIdMap[selectedVariant],
                items: [],
                isCustom: isCustomVariant
            })
        }

        onClose()
    }

    const handleCustomVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLocalProperty({ ...localProperty, title: value, value })
    }

    useEffect(() => {
        if (!isOpen) {
            inputRef.current?.blur()
            setInputValue(localProperty?.title || '')
        }
    }, [isOpen, inputRef, setInputValue, localProperty])

    if (localProperty?.isCustom) {
        return (
            <AppInput
                inputProps={{
                    fontSize: 16,
                    placeholder: t('variantSelector.placeholder'),
                    value: localProperty.value,
                    onChange: handleCustomVariantChange
                }}
            />
        )
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpen={canAddVariants ? onOpen : () => { }}
            onClose={onClose}
            placement="bottom-start"
            initialFocusRef={inputRef}
        >
            <PopoverTrigger>
                <Flex
                    alignItems="center"
                    gap={2}
                    border="1px solid"
                    borderColor="neutral.gray.800"
                    borderRadius={8}
                    padding="12px 16px"
                    transition="border-color 0.1s ease-out"
                    _hover={{ borderColor: 'neutral.gray.700' }}
                    sx={{
                        input: {
                            flex: 1, outline: 'none', border: 'none', bg: 'transparent', color: '#FFF',
                            _placeholder: { color: '#7B7B7B' }
                        }
                    }}
                >
                    <input
                        ref={inputRef}
                        value={inputValue}
                        disabled={!canAddVariants}
                        maxLength={30}
                        autoCorrect="off"
                        placeholder={t('variantSelector.inputPlaceholder')}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <AppIcons.SelectChevronDown />
                </Flex>
            </PopoverTrigger>

            <PopoverContent
                width="642px"
                display="flex"
                flexDirection="column"
                gap={2}
                borderRadius={8}
                borderColor="#222"
                p={3}
                bgColor="#222"
                sx={{
                    button: {
                        justifyContent: 'flex-start',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 400,
                        _hover: { bgColor: 'neutral.gray.800' }
                    }
                }}
            >
                {dropdownOptions.map(variant => (
                    <Button
                        key={variant}
                        bgColor={localProperty?.title === variant ? 'neutral.gray.800' : 'unset'}
                        color="#FFF"
                        onClick={() => handleDropdownOptionClick({
                            selectedVariant: variant,
                            isCustomVariant: false
                        })}
                    >
                        {variant}
                    </Button>
                ))}

                <Button
                    display="flex"
                    alignItems="center"
                    gap={3}
                    bg="unset"
                    color="#179EF8"
                    sx={{ path: { stroke: '#179EF8' } }}
                    onClick={() => handleDropdownOptionClick({
                        selectedVariant: isPredefinedOrEmpty ? '' : inputValue,
                        isCustomVariant: true
                    })}
                >
                    <AppIcons.BlackPlus />
                    {buttonText}
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default VariantSelector