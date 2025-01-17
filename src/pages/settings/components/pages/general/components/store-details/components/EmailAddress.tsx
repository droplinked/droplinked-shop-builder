import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik';
import SectionContent from 'pages/settings/components/common/SectionContent'
import { SettingsPageInterface } from 'pages/settings/formConfigs';
import React from 'react'

export default function EmailAddress() {
    const { errors, values, handleChange } = useFormikContext<SettingsPageInterface>();

    return (
        <SectionContent
            title="Email Address"
            description='Provide an email address to manage the account and receive updates.'
            rightContent={
                <Input
                    inputProps={{
                        placeholder: "Email Address",
                        value: values.email,
                        onChange: handleChange,
                        name: "email",
                    }}
                    {...errors.email && { state: "error" }}
                    message={errors.email}
                />
            }
        />
    )
}
