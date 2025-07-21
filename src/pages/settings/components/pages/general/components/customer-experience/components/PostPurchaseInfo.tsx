import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import AppInput from 'components/redesign/input/AppInput';
import { useHasPermission } from 'stores/app/appStore';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/utils/formConfigs';
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

export default function PostPurchaseInfo() {
    const { t } = useLocaleResources('settings');
    const { errors, values, handleChange } = useFormikContext<ISettings>();
    const hasPermission = useHasPermission()

    return (
        <SectionContent
            title={t("CustomerExperience.postPurchaseInfo.title")}
            description={t("CustomerExperience.postPurchaseInfo.description")}
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <AppInput
                    inputProps={{
                        value: values.pre_purchase_data_fetch,
                        onChange: handleChange,
                        placeholder: t("CustomerExperience.postPurchaseInfo.placeholder"),
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
