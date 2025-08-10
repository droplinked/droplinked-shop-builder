import AppInput from 'components/redesign/input/AppInput'
import React from 'react'

interface Props {
    value: string
    onChange: (value: string) => void
    currentZoneId?: string
}

export default function ZoneNameInput({ value, onChange, currentZoneId }: Props) {
    return (
        <AppInput
            label="Zone Name"
            inputProps={{
                placeholder: 'i.e. (Domestic, International)',
                value: value,
                isRequired: true,
                fontSize: 16,
                onChange: (e) => onChange(e.target.value),
            }}
        />
    )
}
