import SectionContent from 'pages/settings/components/SectionContent';
import React, { useState } from 'react';
import PremiumBadge from './PremiumBadge';
import Input from 'components/redesign/input/Input';
import { useHasPermission } from 'lib/stores/app/appStore';

export default function PostPurchaseInfo() {
    const [value, setValue] = useState("");
    const hasPermission = useHasPermission()

    return (
        <SectionContent
            title="Post-Purchase Information"
            description="Create custom fields for collecting additional information after a customer makes a purchase."
            badge={<PremiumBadge />}
            rightContent={
                <Input
                    inputProps={{
                        value: value,
                        onChange: (event) => setValue(event.target.value),
                        placeholder: "Add a note for your purchase",
                        isDisabled: !hasPermission("post_purchase_data_gathering")
                    }}
                />
            }
        />
    )
}
