import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/utils/formConfigs';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

export default function AgeGate() {
    const { t } = useLocaleResources('settings');
    const { values, setFieldValue } = useFormikContext<ISettings>();

    return (
        <SectionContent
            title={t("CustomerExperience.ageGate.title")}
            description={t("CustomerExperience.ageGate.description")}
            rightContent={
                <Flex alignItems={"center"} gap={4}>
                    <SwitchBox
                        isChecked={values.isAgeRestricted}
                        title={t("CustomerExperience.ageGate.restrictUsersUnder18")}
                        description=''
                        onToggle={(e) => setFieldValue("isAgeRestricted", e.target.checked)}
                    />
                </Flex>
            }
        />
    )
}
