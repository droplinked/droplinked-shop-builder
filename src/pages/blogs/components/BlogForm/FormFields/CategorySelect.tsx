import { Button, Divider, Flex, Popover, PopoverContent, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React, { useRef, useState } from 'react'

const CategorySelect = () => {
    const valueRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { values, errors, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    const [categories, setCategories] = useState<string[]>([
        'E-Commerce Trends', 'Blockchain & NFTs',
        'Affiliate Marketing Strategies', 'Product Creation and Management',
        'Decentralized Marketplaces', 'User & Seller Stories', 'Cryptocurrency & Payments'
    ])

    const [newCategory, setNewCategory] = useState<string>('')

    const handleCategorySelect = (category: string) => {
        setFieldValue('category', category)
        onClose()
    }

    const handleNewCategoryAdd = () => {
        if (newCategory.trim() === '') return
        setCategories(prevCategories => [...prevCategories, newCategory])
        setNewCategory('')
    }

    return (
        <FormFieldWrapper
            label={t("CategorySelect.label")}
            description={t("CategorySelect.description")}
            errorMessage={errors?.category?.toString()}
        >
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement="bottom-start"
                initialFocusRef={valueRef}
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
                    >
                        <Text
                            ref={valueRef}
                            flex={1}
                            color={values.category ? 'text.white' : 'text.subtext.placeholder.dark'}
                        >
                            {values.category || t("CategorySelect.placeholder")}
                        </Text>
                        <AppIcons.SelectChevronDown />
                    </Flex>
                </PopoverTrigger>
                <PopoverContent
                    borderRadius={8}
                    border="none"
                    bgColor="neutral.gray.900"
                >
                    <Flex flexDirection="column" gap={2} padding={3}>
                        {categories.map(category => (
                            <Button
                                key={category}
                                justifyContent="flex-start"
                                borderRadius="6px"
                                padding="12px 16px"
                                bgColor={values.category === category ? 'neutral.gray.800' : 'unset'}
                                fontWeight={400}
                                color="#FFF"
                                _hover={{ bgColor: 'neutral.gray.800' }}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </Flex>

                    <Divider borderColor="neutral.gray.700" />

                    <AppInput
                        inputContainerProps={{ border: 'none', padding: '8px 12px' }}
                        inputProps={{
                            placeholder: t("CategorySelect.newCategory"),
                            padding: '12px 16px',
                            fontSize: 16,
                            value: newCategory,
                            onChange: e => setNewCategory(e.target.value)
                        }}
                        rightElement={
                            <button type="button" onClick={handleNewCategoryAdd}>
                                <PlusMd color="#2bcfa1" />
                            </button>
                        }
                    />
                </PopoverContent>
            </Popover>
        </FormFieldWrapper>
    )
}

export default CategorySelect