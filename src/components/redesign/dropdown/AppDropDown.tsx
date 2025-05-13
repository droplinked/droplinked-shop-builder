import { Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import Select from 'react-select'
import DropDownModel from './DropDownModel'

/**
 * A styled dropdown component based on react-select with loading and error states
 * 
 * @param {object} props - Component props
 * @param {Array<{value?: string|number, label?: string|number}>} props.options - Array of options for the dropdown
 * @param {function} props.onChange - Function called when selection changes
 * @param {{value?: string|number, label?: string|number}} [props.value] - Currently selected value
 * @param {string} [props.placeholder] - Placeholder text when no option is selected
 * @param {boolean} [props.disabled] - Whether the dropdown is disabled
 * @param {boolean} [props.loading] - Whether to show loading state
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.name] - Field name for form submissions
 * 
 * @returns {JSX.Element} Styled dropdown component
 */
interface Ioptions {
    value?: string | number
    label?: string | number
}

interface Iprops {
    options: Array<Ioptions>
    onChange: any
    value?: Ioptions
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    error?: string;
    name?: string
}

function AppDropDown({ disabled, name, options, onChange, error, value, loading, placeholder }: Iprops) {
    return (
        <AppSkeleton
            css={{ p: { fontSize: 12, color: "#FFF" } }}
            borderRadius={"8px"}
            width={"100%"}
            isLoaded={loading}
        >
            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isDisabled={disabled}
                name={name}
                styles={DropDownModel.style(error)}
            />
            {error && <Text mt={2} paddingInline={2}>{error}</Text>}
        </AppSkeleton>
    )
}

export default AppDropDown