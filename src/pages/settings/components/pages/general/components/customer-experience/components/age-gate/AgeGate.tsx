import SectionContent from 'pages/settings/components/common/SectionContent';
import React, { useState } from 'react';
import useAppStore from 'lib/stores/app/appStore';
import { Flex } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';

export default function AgeGate() {
    const { shop } = useAppStore()
    const [value, setValue] = useState<boolean>(shop.isAgeRestricted);

    return (
        <SectionContent
            title="Age Gate"
            description="Filter visitors based on setting a minimum age criteria to grant access to a storefront or particular products."
            rightContent={
                <Flex alignItems={"center"} gap={4}>
                    <SwitchBox isChecked={value} title='Restrict Users Under 18' description='' onToggle={(e) => setValue(e.target.checked)} />
                </Flex>
            }
        />
    )
}
