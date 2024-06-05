import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import plans_constant from "./constants/plans.json";
import React from "react";
import { IPlansInterface } from "./plans.interface";
import BasicButton from "components/common/BasicButton/BasicButton";

const PlansTableCard = ({ plan }: { plan: "starter" | "business" | "premium" | "enterprise" }) => {
    const { label, price, description, base_feature, features }: IPlansInterface = plans_constant?.[plan];
    const label_icon = { starter: <AppIcons.Starter />, business: <AppIcons.Business />, premium: <AppIcons.Premium />, enterprise: <AppIcons.Enterprise /> };
    return (
        <VStack padding="16px" gap="10px" alignItems="flex-start" width="full" rounded="8px" backgroundColor="#262626">
            <HStack alignSelf="stretch" alignItems="center" justifyContent="space-between">
                <HStack spacing="8px" alignItems="center">
                    {label_icon?.[plan]}
                    <AppTypography color="white" fontSize="18px" fontWeight="700">
                        {label}
                    </AppTypography>
                </HStack>
                <Flex paddingX="8px" alignItems="center" backgroundColor={price?.background} justifyContent={"center"} rounded={"18px"} alignSelf={"stretch"}>
                    <AppTypography fontSize="12px" fontWeight="500" textAlign={"center"} width={"full"} color={price?.foreground}>
                        {price?.amount}
                    </AppTypography>
                </Flex>
            </HStack>
            <AppTypography fontSize="12px" fontWeight="400" color="white">
                {description}
            </AppTypography>
            <BasicButton sizes="large">Apply</BasicButton>
            <AppTypography fontSize="12px" fontWeight="600" color="white">
                Features: {base_feature}
            </AppTypography>
            <VStack spacing="8px" alignItems="flex-start">
                {features?.map((feature, key) => (
                    <VStack key={key} justifyContent="center" alignItems="flex-start" spacing="8px">
                        <AppTypography fontSize="12px" fontWeight="500" color="white">
                            {feature?.label}
                        </AppTypography>
                        {feature?.specific_features?.map((specific_feature) => (
                            <HStack alignItems="center" spacing="8px">
                                <AppIcons.Tick />
                                <AppTypography fontSize="12px" fontWeight="400" color="white">
                                    {specific_feature}
                                </AppTypography>
                            </HStack>
                        ))}
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );
};

export default PlansTableCard;
