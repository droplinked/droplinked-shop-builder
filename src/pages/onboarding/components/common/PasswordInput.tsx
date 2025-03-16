import { HideMd } from 'assets/icons/Action/Hide/HideMd'
import { ShowMd } from 'assets/icons/Action/Show/ShowMd'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import { InputChangeEvent } from 'types/eventTypes'

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
    placeholder = "Enter password",
    label = "Password",
    message,
    isRequired
}: PasswordInputProps) {
    const [inputType, setInputType] = useState<"text" | "password">("password")

    return (
        <Input
            label={label}
            inputProps={{
                name,
                type: inputType,
                value,
                onChange,
                placeholder,
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