import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import PremiumBadge from 'pages/settings/components/common/PremiumBadge';
import Input from 'components/redesign/input/Input';
import { useHasPermission } from 'lib/stores/app/appStore';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/formConfigs';

export default function PostPurchaseInfo() {
    const { errors, values, handleChange } = useFormikContext<ISettings>();
    const hasPermission = useHasPermission()

    return (
        <SectionContent
            title="Post-Purchase Information"
            description="Create custom fields for collecting additional information after a customer makes a purchase."
            badge={<PremiumBadge />}
            rightContent={
                <Input
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
