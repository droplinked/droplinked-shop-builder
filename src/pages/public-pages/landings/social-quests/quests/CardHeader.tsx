import { Box, Flex, Text } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import React from "react";
import TitleRightContent from "./TitleRightContent";

interface CardHeaderProps {
    title: string;
    isLoggedIn: boolean;
    isFollowed: boolean;
    isreadyToClaim: boolean;
    isLoading: boolean;
}

export default function CardHeader({
    title,
    isLoggedIn,
    isFollowed,
    isreadyToClaim,
    isLoading
}: CardHeaderProps) {
    return (
        <Flex alignItems="center" gap="6px">
            <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="text.white">
                {title}
            </Text>
            {isLoggedIn ? (
                <TitleRightContent
                    isFollowed={isFollowed}
                    isreadyToClaim={isreadyToClaim}
                    isLoading={isLoading}
                />
            ) : (
                <Box className="link-arrow" opacity={0}>
                    <AppIcons.ExternalArrow />
                </Box>
            )}
        </Flex>
    );
}
