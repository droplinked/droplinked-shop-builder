import { Box, Flex, Text } from "@chakra-ui/react";
import { ExternalarrowLg } from "assets/icons/Navigation/ExternalArrow/ExternalarrowLg";
import { ExternalarrowleftLg } from "assets/icons/Navigation/ExternalArrowLeft/ExternalArrowLeftLg";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
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
    const { isRTL } = useLocaleResources('public-pages/landings/social-quests')

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
                    {isRTL ? <ExternalarrowleftLg color="#fff" /> : <ExternalarrowLg color="#fff" />}
                </Box>
            )}
        </Flex>
    );
}
