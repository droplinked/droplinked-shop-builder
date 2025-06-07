import { Flex, Text } from "@chakra-ui/react";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import React from "react";
import { subscriptionPlans } from "utils/constants/subscriptionPlans";
import { getSubscriptionPlanIcon } from "utils/helpers";

interface Props {
    currentPlan: string;
    status: string;
}

export default function CurrentPlanBanner({ currentPlan, status }: Props) {
    const currentSubData = getSubscriptionPlanIcon(currentPlan);
    const isActive = status === "ACTIVE";
    const IconComponent = currentSubData.icon;

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
                icon={<IconComponent color="#2BCFA1" stroke="#2BCFA1" />}
                background="label.primary"
                border="1px solid"
                borderColor="label.primary"
            />
            <Flex flexDirection="column" gap={1}>
                <DotSeparatedList>
                    <Text color="#fff" fontSize={16} fontWeight="700">
                        {subscriptionPlans[currentPlan].title} Plan
                    </Text>
                    <Text color={isActive ? "#2BCFA1" : "#f24"} fontSize={16} fontWeight={500}>
                        {isActive ? "Active" : "Inactive"}
                    </Text>
                </DotSeparatedList>
                {isActive && (
                    <Text color="#7B7B7B" fontSize={14} fontWeight={400}>
                        {subscriptionPlans[currentPlan].title} Plan is active! Enjoy exclusive features.
                    </Text>
                )}
            </Flex>
        </Flex>
    );
}
