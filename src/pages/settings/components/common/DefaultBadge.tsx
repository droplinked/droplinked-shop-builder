import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";

interface Props {
    isDefault?: boolean;
    onClick?: () => void;
}

export default function DefaultBadge({ isDefault, onClick }: Props) {
    const { t } = useLocaleResources('settings');

    const handleClick = () => {
        if (!isDefault) {
            onClick()
        }
    }

    return (
        <Flex
            {...(!isDefault && { sx: { path: { stroke: "#fff" } } })}
            cursor={isDefault ? "auto" : "pointer"}
            onClick={handleClick}
            borderRadius={"4px"}
            alignItems={"center"}
            py={1}
            bg={isDefault ? "#FFD9511A" : "neutral.gray.800"}
            px={2}
            gap={"6px"}
        >
            {isDefault ? <AppIcons.GoldenStar style={{ width: "16px", height: "16px" }} /> : <AppIcons.OutlinedStar style={{ width: "16px", height: "16px" }} />}
            <AppTypography fontSize={14} color={isDefault ? "#ffd951" : "#fff"}>
                {isDefault ? t("DefaultBadge.default") : t("DefaultBadge.setAsDefault")}
            </AppTypography>
        </Flex>
    );
}
