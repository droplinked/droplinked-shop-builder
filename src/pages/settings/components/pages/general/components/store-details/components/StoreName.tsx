import AppInput from "components/redesign/input/AppInput";
import { useFormikContext } from "formik";
import SectionContent from "pages/settings/components/common/SectionContent";
import { ISettings } from "pages/settings/utils/formConfigs";
import React from "react";

export default function StoreName() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();

    return (
        <SectionContent
            title="Store Name"
            description="Enter the store’s name that will appear on the landing page."
            rightContent={
                <AppInput
                    inputProps={{
                        placeholder: "Store Name",
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
