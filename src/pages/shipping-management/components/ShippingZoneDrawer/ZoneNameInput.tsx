import AppInput from 'components/redesign/input/AppInput'
import { useFormikContext } from 'formik'
import React, { useMemo } from 'react'
import { Zone } from '../../../types/shipping'

interface Props {
    value: string
    onChange: (value: string) => void
    currentZoneId?: string
}

export default function ZoneNameInput({ value, onChange, currentZoneId }: Props) {
    const { values } = useFormikContext<{ zones: Zone[] }>()

    const isDuplicateName = useMemo(() => {
        const trimmed = value.trim().toLowerCase()
        if (!trimmed) return false
        return (values?.zones || []).some(
            (z) => z.name.trim().toLowerCase() === trimmed && z._id !== currentZoneId
        )
    }, [value, values?.zones, currentZoneId])

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
            state={isDuplicateName ? 'error' : undefined}
            message={isDuplicateName ? 'Zone name already exists' : undefined}
        />
    )
}
