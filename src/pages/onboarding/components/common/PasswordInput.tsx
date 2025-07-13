import { HideMd } from 'assets/icons/Action/Hide/HideMd'
import { ShowMd } from 'assets/icons/Action/Show/ShowMd'
import AppInput from 'components/redesign/input/AppInput'
import React, { useState } from 'react'
import { InputChangeEvent } from 'types/eventTypes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

interface PasswordInputProps {
    name: string
    value: string
    onChange: (e: InputChangeEvent) => void
    placeholder?: string
    label?: string
    message?: string
    isRequired?: boolean
}

function PasswordInput({
    name,
    value,
    onChange,
    placeholder,
    label,
    message,
    isRequired
}: PasswordInputProps) {
    const [inputType, setInputType] = useState<"text" | "password">("password")
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

    return (
        <AppInput
            label={label || t('common.passwordLabel')}
            inputProps={{
                name,
                type: inputType,
                value,
                onChange,
                placeholder: placeholder || t('common.passwordPlaceholder'),
                isRequired,
            }}
            rightElement={
                <button
                    type='button'
                    onClick={() => setInputType(inputType === "password" ? "text" : "password")}
                >
                    {inputType === "password" ? <ShowMd color='#FFF' /> : <HideMd color='#FFF' />}
                </button>
            }
            message={message}
        />
    )
}

export default PasswordInput