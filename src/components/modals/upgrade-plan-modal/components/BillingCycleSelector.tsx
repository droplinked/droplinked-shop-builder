import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import { BillingCycleSelectorProps } from "../types/upgradePlan.types";
import { useBillingOptions } from "../hooks/useBillingOptions";
import { BillingOptionCard } from "./BillingOptionCard";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

export default function BillingCycleSelector({
    plan,
    isDrawer = false,
    canActivateTrial,
}: BillingCycleSelectorProps) {
    const { t } = useLocaleResources("common");
    const { billingOptions, loading, error, handleOptionSelect } =
        useBillingOptions(plan, canActivateTrial);

    if (loading) return <LoadingState isDrawer={isDrawer} />;
    if (error) return <ErrorState error={error} isDrawer={isDrawer} />;

    return (
        <Box
            w="100%"
            minHeight={isDrawer ? "auto" : "432px"}
            p={12}
            display="flex"
            flexDirection="column"
            gap={12}
        >
            <VStack align="flex-start" gap={4}>
                <Text color="neutral.white" fontSize="base" fontWeight="normal">
                    {t("UpgradePlanModal.BillingCycleSelector.title")}
                </Text>
                <VStack align="flex-start" gap={4} w="100%">
                    {billingOptions.map((option) => (
                        <BillingOptionCard
                            key={option.month}
                            option={option}
                            onSelect={handleOptionSelect}
                        />
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
}
