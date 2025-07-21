import AppInput from 'components/redesign/input/AppInput'
import { useFormikContext } from 'formik';
import SectionContent from 'pages/settings/components/common/SectionContent'
import { ISettings } from 'pages/settings/utils/formConfigs';
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

export default function EmailAddress() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t("EmailAddress.title")}
            description={t("EmailAddress.description")}
            rightContent={
                <AppInput
                    inputProps={{
                        placeholder: t("EmailAddress.placeholder"),
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
