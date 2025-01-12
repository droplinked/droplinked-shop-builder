import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react'

interface Props {
    isDefault?: boolean;
    onClick?: () => void;
}

export default function DefaultBadge({ isDefault, onClick }: Props) {
    return (
        <Flex {...!isDefault && { sx: { path: { stroke: "#fff" } } }} cursor={isDefault ? "auto" : "pointer"} onClick={onClick} borderRadius={"4px"} alignItems={"center"} py={1} bg={isDefault ? "#FFD9511A" : "#292929"} px={2} gap={"6px"}>
            {
                isDefault ?
                    <AppIcons.GoldenStar style={{ width: "16px", height: "16px" }} />
                    :
                    <AppIcons.OutlinedStar style={{ width: "16px", height: "16px" }} />
            }
            <AppTypography fontSize={14} color={isDefault ? "#ffd951" : "#fff"}>
                {isDefault ? "Default" : "Set As Default"}
            </AppTypography>
        </Flex>
    )
}
