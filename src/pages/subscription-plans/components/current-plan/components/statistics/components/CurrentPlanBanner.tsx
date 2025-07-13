import { Flex, Text } from "@chakra-ui/react";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";
import { getPlanDetails } from "utils/helpers";

interface Props {
    currentPlan: string;
    status: string;
}

interface IconProps {
    color?: string;
    stroke?: string;
    width?: string;
    height?: string;
}

export default function CurrentPlanBanner({ currentPlan, status }: Props) {
    const { t } = useLocaleResources('subscription');
    const { title, icon: IconComponent } = getPlanDetails(currentPlan, t);
    const IconWithProps = IconComponent as React.ComponentType<IconProps>;
    const isActive = status === "ACTIVE";

    return (
        <Flex
            gap={4}
            p={4}
            alignItems="center"
            background="#1C1C1C"
            border="1px solid"
            borderColor="#292929"
            borderRadius={16}
        >
            <IconWrapper
                icon={<IconWithProps color="#2BCFA1" stroke="#2BCFA1" />}
                background="label.primary"
                border="1px solid"
                borderColor="label.primary"
            />
            <Flex flexDirection="column" gap={1}>
                <DotSeparatedList>
                    <Text color="#fff" fontSize={16} fontWeight="700">
                        {title} {t('detailsTab.planSuffix')}
                    </Text>
                    <Text color={isActive ? "#2BCFA1" : "#f24"} fontSize={16} fontWeight={500}>
                        {isActive ? t('currentPlan.status') : t('currentPlan.inactive')}
                    </Text>
                </DotSeparatedList>
                {isActive && (
                    <Text color="#7B7B7B" fontSize={14} fontWeight={400}>
                        {t('currentPlan.activeMessage', { plan: title })}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
}
