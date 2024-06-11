import { Box, Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan } from "lib/apis/subscription/interfaces";
import React from "react";
import PlanHeading from "../PlanHeading";

const PlanCard = ({ plan, showBuyButton }: { plan: SubscriptionPlan, showBuyButton: boolean }) => {
    const isFree = plan.price == "FREE"

    const handleBuy = () => { }

    return (
        <Flex
            direction={"column"}
            gap={4}
            borderRadius={8}
            padding={4}
            bgColor={"#262626"}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <PlanHeading planTitle={plan.type} />
                <Box
                    as="span"
                    borderRadius={16}
                    padding={"4px 12px"}
                    bgColor={isFree ? "rgba(43, 207, 161, 0.25)" : "rgba(156, 78, 255, 0.25)"}
                    color={isFree ? "#2BCFA1" : "#C59CFF"}
                    fontSize={12}
                    fontWeight={500}
                >
                    {isNaN(Number(plan.price)) ? plan.price : `$${plan.price}`}
                </Box>
            </Flex>
            <AppTypography color={"white"}>{plan.description}</AppTypography>
            {showBuyButton && <BasicButton onClick={handleBuy}>Buy</BasicButton>}
            {
                plan.subOptionIds.map(featureGroup =>
                    <Flex key={featureGroup.key} direction={"column"} gap={2}>
                        <AppTypography fontWeight={500} color={"white"}>{featureGroup.title || featureGroup.key}</AppTypography>
                        {
                            featureGroup.value.filter(feature => feature.value).map(feature =>
                                <Flex key={feature.key} alignItems={"center"} gap={2}>
                                    <AppIcons.Tick />
                                    <AppTypography color={"white"}>
                                        {`${feature.title} ${(isNaN(Number(feature.value)) || typeof feature.value === "boolean") ? "" : `: ${feature.value}`}`}
                                    </AppTypography>
                                </Flex>
                            )
                        }
                    </Flex>
                )
            }
        </Flex>
    )
}

export default PlanCard