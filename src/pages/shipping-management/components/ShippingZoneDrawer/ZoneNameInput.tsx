import AppInput from 'components/redesign/input/AppInput'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    value: string
    onChange: (value: string) => void
}

export default function ZoneNameInput({ value, onChange }: Props) {
    const { t } = useLocaleResources("shipping-management")
    return (
        <AppInput
            label={t('ZoneNameInput.label')}
            inputProps={{
                name: 'zoneName',
                value,
                onChange: (e) => onChange(e.target.value),
                placeholder: t('ZoneNameInput.placeholder'),
                isRequired: true,
                fontSize: 16
            }}
        />
    )
}
