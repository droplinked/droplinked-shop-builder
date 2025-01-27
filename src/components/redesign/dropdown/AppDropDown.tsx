import { Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import Select from 'react-select'
import DropDownModel from './DropDownModel'

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