import { Box, Flex, Text } from "@chakra-ui/react";
import { PriceplanLg } from "assets/icons/Finance/PricePlan/PriceplanLg";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import React from "react";
import CardsOverlay from "./components/CardsOverlay";
import useROICalculation from "../hooks/useROICalculation";

interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function Plans({ roiCalculationVariables }: Props) {
    const { plans, handlePlanChange, selectedPlan } = roiCalculationVariables;

    const skuChip = (name: string, value: number, isSelected: boolean) => (
        <DotSeparatedList
            border="1px solid"
            borderColor={isSelected ? "label.primary" : "neutral.gray.900"}
            px={4}
            py={1}
            borderRadius="full"
        >
            <Text
                color="text.subtext.placeholder.dark"
                fontSize={{ base: 12, md: 14 }}
                fontWeight={400}
            >
                {name}
            </Text>
            <Text color="text.white" fontSize={{ base: 12, md: 14 }} fontWeight={400}>
                {value}
            </Text>
        </DotSeparatedList>
    );

    return (
        <CardsOverlay title="Plans" icon={<PriceplanLg color="#fff" />}>
            {plans.map((plan, index) => {
                const isSelected = selectedPlan?.title === plan.title;

                return (
                    <Box
                        padding={4}
                        borderRadius={16}
                        border="1px solid"
                        borderColor={isSelected ? "main.primary" : "neutral.gray.900"}
                        key={index}
                        onClick={() => handlePlanChange(plan)}
                        background={isSelected ? "label.primary" : "neutral.websiteBackground"}
                        cursor={isSelected ? "default" : "pointer"}
                        transition="all 0.2s ease"
                    >
                        <Flex gap={3} alignItems="center">
                            <Text fontSize={{ base: 14, md: 18 }} fontWeight={500} color="text.white">
                                {plan.title}
                            </Text>
                            <Box
                                borderRadius={24}
                                border="1px solid"
                                borderColor={isSelected ? "label.primary" : "neutral.gray.900"}
                                paddingInline="12px"
                                paddingBlock="2px"
                                background={isSelected ? "label.primary" : "neutral.background"}
                            >
                                <Text
                                    color={isSelected ? "text.primary" : "text.white"}
                                    fontSize={{ base: 12, md: 14 }}
                                >
                                    {plan.duration} Days
                                </Text>
                            </Box>
                        </Flex>
                        <Flex gap={2} flexWrap="wrap" alignItems="center" mt={3}>
                            {skuChip("SKUs", plan.skus, isSelected)}
                            {skuChip("Product Records", plan.productRecords, isSelected)}
                            {skuChip("Base Commitment", plan.baseCommitment, isSelected)}
                        </Flex>
                    </Box>
                );
            })}
        </CardsOverlay>
    );
}
