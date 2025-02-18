import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/formConfigs';

export default function AgeGate() {
    const { values, setFieldValue } = useFormikContext<ISettings>();

    return (
        <SectionContent
            title="Age Gate"
            description="Filter visitors based on setting a minimum age criteria to grant access to a storefront or particular products."
            rightContent={
                <Flex alignItems={"center"} gap={4}>
                    <SwitchBox
                        isChecked={values.isAgeRestricted}
                        title='Restrict Users Under 18'
                        description=''
                        onToggle={(e) => setFieldValue("isAgeRestricted", e.target.checked)}
                    />
                </Flex>
            }
        />
    )
}
