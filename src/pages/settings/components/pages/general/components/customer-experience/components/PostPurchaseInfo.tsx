import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import AppInput from 'components/redesign/input/AppInput';
import { useHasPermission } from 'stores/app/appStore';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/formConfigs';
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge';

export default function PostPurchaseInfo() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();
    const hasPermission = useHasPermission()

    return (
        <SectionContent
            title="Post-Purchase Information"
            description="Create custom fields for collecting additional information after a customer makes a purchase."
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <AppInput
                    inputProps={{
                        value: values.pre_purchase_data_fetch,
                        onChange: handleChange,
                        placeholder: "Add a note for your purchase",
                        isDisabled: !hasPermission("post_purchase_data_gathering"),
                        name: "pre_purchase_data_fetch",
                    }}
                    {...errors.pre_purchase_data_fetch && { state: "error" }}
                    message={errors.pre_purchase_data_fetch}
                />
            }
        />
    )
}
