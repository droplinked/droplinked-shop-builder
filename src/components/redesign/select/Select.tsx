import { Select as ChakraSelect, FormLabel, InputGroup, InputGroupProps, SelectProps, Spinner } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React, { useMemo } from 'react'
import ErrorMessage from '../error-message/ErrorMessage'

interface Props {
    label?: string
    items: any[]
    labelAccessor?: string
    valueAccessor?: string
    dataAttributes?: Record<string, string>
    isLoading?: boolean
    error?: string
    inputGroupProps?: InputGroupProps
    selectProps?: SelectProps
}

function Select(props: Props) {
    const { label, items, labelAccessor = "name", valueAccessor, dataAttributes, isLoading, error, inputGroupProps, selectProps } = props
    const { value, onChange } = selectProps

    const options = useMemo(() => {
        return items.map((item, index) => {
            const isString = typeof item === "string"
            const optionValue = isString ? item : valueAccessor ? item[valueAccessor] : JSON.stringify(item)
            const optionLabel = isString ? item : item[labelAccessor]

            return (
                <option
                    key={index}
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
            border={`1px solid ${error ? "#F24" : "#292929"}`}
            borderWidth="1.5px"
            borderRadius={8}
            color="#FFF"
            icon={isLoading ? <Spinner size="sm" color='#7B7B7B' /> : <AppIcons.SelectChevronDown />}
            _placeholder={{ color: "#7B7B7B" }}
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
        <InputGroup
            display="flex"
            flexDirection="column"
            gap={2}
            {...inputGroupProps}
        >
            <FormLabel width="fit-content" m={0} fontSize={14} fontWeight={500} color="white">{label}</FormLabel>
            {selectElement}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputGroup>
    )
}

export default Select