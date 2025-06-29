import { Select as ChakraSelect, Flex, FormLabel, InputGroup, InputGroupProps, SelectProps, Spinner, Text } from '@chakra-ui/react'
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useMemo } from 'react'
import ErrorMessage from '../error-message/ErrorMessage'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'

/**
 * Customizable select component with support for complex data structures
 * 
 * @param {object} props - Component props
 * @param {string} [props.label] - Label text displayed above select
 * @param {string} [props.description] - Descriptive text displayed below label
 * @param {any[]} props.items - Array of items to display in the select
 * @param {string} [props.labelAccessor="name"] - Object property to use as display text for items
 * @param {string} [props.valueAccessor] - Object property to use as value for items
 * @param {Record<string, string>} [props.dataAttributes] - Additional data attributes to add to options
 * @param {boolean} [props.isLoading] - Whether to show loading indicator
 * @param {string} [props.error] - Error message to display
 * @param {InputGroupProps} [props.inputGroupProps] - Props for the input group wrapper
 * @param {string} [props.itemBackgroundColor] - Background color for dropdown items
 * @param {string} [props.itemColor] - Text color for dropdown items
 * @param {SelectProps} [props.selectProps] - Props for the select element including value and onChange
 * @param {boolean} [props.isRequired] - Whether the field is required (displays asterisk)
 * 
 * @returns {JSX.Element} Customizable select component
 */
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
    isRequired?: boolean
}

function AppSelect(props: Props) {
    const { label, description, items, labelAccessor = "name", valueAccessor, dataAttributes, isLoading, error, inputGroupProps, itemColor, itemBackgroundColor, selectProps, isRequired } = props
    const { value, onChange } = selectProps
    const { isRTL } = useLocaleResources("common")

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
            icon={isLoading ? <Spinner size="sm" color='text.subtext.placeholder.dark' /> : <ChevrondownMd color='#7b7b7b' />}
            _placeholder={{ color: "text.subtext.placeholder.dark" }}
            _hover={{}}
            _focus={{}}
            _focusVisible={{}}
            rootProps={{
                sx: {
                    ".chakra-select__icon-wrapper": {
                        left: isRTL ? 2 : "unset",
                        right: isRTL ? "unset" : 2
                    }
                }
            }}
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
            <Flex gap={2} alignItems="center" mb={description ? 1 : 4}>
                <FormLabel display="flex" gap={1} alignItems="center" fontSize={14} fontWeight={500} color="text.white">
                    {label} {isRequired && <AsteriskSm width="12px" height="12px" color='#FF2244' />}
                </FormLabel>
            </Flex>
            {description && <Text mb={4} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
            {selectElement}
            {error && <ErrorMessage mt={2}>{error}</ErrorMessage>}
        </InputGroup>
    )
}

export default AppSelect