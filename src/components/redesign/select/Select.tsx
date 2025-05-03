import { Select as ChakraSelect, FormLabel, InputGroup, InputGroupProps, SelectProps, Spinner, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React, { useMemo } from 'react'
import ErrorMessage from '../error-message/ErrorMessage'

interface Props {
    label?: string
    description?: string
    items: any[]
    labelAccessor?: string
    valueAccessor?: string
    dataAttributes?: Record<string, string>
    isLoading?: boolean
    error?: string
    inputGroupProps?: InputGroupProps
    itemBackgroundColor?: string
    itemColor?: string;
    selectProps?: SelectProps
}

function Select(props: Props) {
    const { label, description, items, labelAccessor = "name", valueAccessor, dataAttributes, isLoading, error, inputGroupProps, itemColor, itemBackgroundColor, selectProps } = props
    const { value, onChange } = selectProps

    const options = useMemo(() => {
        return items.map((item, index) => {
            const isString = typeof item === "string"
            const optionValue = isString ? item : valueAccessor ? item[valueAccessor] : JSON.stringify(item)
            const optionLabel = isString ? item : item[labelAccessor]

            return (
                <option
                    key={index}
                    style={{ background: "#1a202c" }}
                    {...(itemBackgroundColor || itemColor) && { style: { backgroundColor: itemBackgroundColor, color: itemColor } }}
                    value={optionValue}
                    {...Object.fromEntries(Object.entries(dataAttributes ?? {}).map(([key, accessor]) => [key, item[accessor]]))}
                >
                    {optionLabel}
                </option>
            )
        })
    }, [items, valueAccessor, labelAccessor, dataAttributes])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value

        const selectedItem = typeof items[0] === "string"
            ? selectedValue
            : valueAccessor
                ? items.find(item => item[valueAccessor] === selectedValue)
                : JSON.parse(selectedValue)

        onChange?.(selectedItem)
    }

    const selectElement = (
        <ChakraSelect
            value={typeof value === "string" ? value : valueAccessor ? value?.[valueAccessor] : JSON.stringify(value)}
            height={12}
            border="1px solid "
            borderColor={`${error ? "text.error" : "neutral.gray.800"}`}
            borderWidth="1.5px"
            borderRadius={8}
            color="#FFF"
            icon={isLoading ? <Spinner size="sm" color='text.subtext.placeholder.dark' /> : <AppIcons.SelectChevronDown />}
            _placeholder={{ color: "text.subtext.placeholder.dark" }}
            _hover={{}}
            _focus={{}}
            _focusVisible={{}}
            onChange={handleChange}
            {...selectProps}
        >
            {options}
        </ChakraSelect>
    )

    if (!label) return (
        <>
            {selectElement}
            {error && <ErrorMessage mt={2}>{error}</ErrorMessage>}
        </>
    )

    return (
        <InputGroup display="flex" flexDirection="column" {...inputGroupProps}>
            <FormLabel mb={description ? 1 : 4} fontSize={14} fontWeight={500} color="text.white">{label}</FormLabel>
            {description && <Text mb={4} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
            {selectElement}
            {error && <ErrorMessage mt={2}>{error}</ErrorMessage>}
        </InputGroup>
    )
}

export default Select