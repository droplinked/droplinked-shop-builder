import AppInput from "components/redesign/input/AppInput";
import { useFormikContext } from "formik";
import SectionContent from "pages/settings/components/common/SectionContent";
import { ISettings } from "pages/settings/utils/formConfigs";
import React from "react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export default function StoreName() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t("StoreName.title")}
            description={t("StoreName.description")}
            rightContent={
                <AppInput
                    inputProps={{
                        placeholder: t("StoreName.placeholder"),
                        value: values.name,
                        onChange: handleChange,
                        name: "name",
                        isDisabled: true
                    }}
                    {...errors.name && { state: "error" }}
                    message={errors.name}
                />
            }
        />
    );
}
