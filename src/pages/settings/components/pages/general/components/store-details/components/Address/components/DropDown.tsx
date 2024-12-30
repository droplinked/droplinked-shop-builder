import { useFormikContext } from 'formik'
import React from 'react'
import { IAddressInputs } from '../formConfigs'
import AppDropDown from 'components/redesign/dropdown/AppDropDown'

interface Props {
    options: Array<{
        label: string
        value: string
    }>
    name: string
    placeholder: string
    disabled?: boolean
    isLoading?: boolean
}

export default function DropDown({ options, name, placeholder, disabled, isLoading }: Props) {
    const { errors, values, setFieldValue } = useFormikContext<IAddressInputs>()

    return (
        <AppDropDown
            loading={!isLoading}
            placeholder={placeholder}
            name={name}
            options={options}
            onChange={(item) => setFieldValue(name, item.value)}
            {...(values[name] && {
                value: {
                    label: values[name],
                    value: values[name],
                },
            })}
            disabled={disabled}
            error={errors[name]}
        />
    )
}
