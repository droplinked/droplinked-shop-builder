import AppInput from 'components/redesign/input/AppInput'
import React from 'react'

interface Props {
    value: string
    onChange: (value: string) => void
}

export default function ZoneNameInput({ value, onChange }: Props) {
    return (
        <AppInput
            label="Zone Name"
            inputProps={{
                name: 'zoneName',
                value,
                onChange: (e) => onChange(e.target.value),
                placeholder: 'i.e. (Domestic, International)',
                isRequired: true,
                fontSize: 16
            }}
        />
    )
}
