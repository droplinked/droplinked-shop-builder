import Input from "components/redesign/input/Input";
import { useFormikContext } from "formik";
import SectionContent from "pages/settings/components/common/SectionContent";
import { SettingsPageInterface } from "pages/settings/formConfigs";
import React from "react";

export default function StoreName() {
    const { errors, values, handleChange } = useFormikContext<SettingsPageInterface>();

    return (
        <SectionContent
            title="Store Name"
            description="Enter the store’s name that will appear on the landing page."
            rightContent={
                <Input
                    inputProps={{
                        placeholder: "Store Name",
                        value: values.name,
                        onChange: handleChange,
                        name: "name",
                    }}
                    {...errors.name && { state: "error" }}
                    message={errors.name}
                />
            }
        />
    );
}
