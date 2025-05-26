import AppInput from 'components/redesign/input/AppInput'
import { useFormikContext } from 'formik';
import SectionContent from 'pages/settings/components/common/SectionContent'
import { ISettings } from 'pages/settings/utils/formConfigs';
import React from 'react'

export default function EmailAddress() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();

    return (
        <SectionContent
            title="Email Address"
            description='Provide an email address to manage the account and receive updates.'
            rightContent={
                <AppInput
                    inputProps={{
                        placeholder: "Email Address",
                        value: values.email,
                        onChange: handleChange,
                        name: "email",
                        isDisabled: true
                    }}
                    {...errors.email && { state: "error" }}
                    message={errors.email}
                />
            }
        />
    )
}
