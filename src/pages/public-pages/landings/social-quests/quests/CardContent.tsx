import { Flex, Icon, Text } from "@chakra-ui/react";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import React from "react";
import CardHeader from "./CardHeader";

interface CardContentProps {
    icon: React.ComponentType;
    title: string;
    description: string;
    duration: string;
    isLoggedIn: boolean;
    isFollowed: boolean;
    isreadyToClaim: boolean;
    isLoading: boolean;
    isHovered: boolean;
}

export default function CardContent({
    icon,
    title,
    description,
    duration,
    isLoggedIn,
    isFollowed,
    isreadyToClaim,
    isLoading,
    isHovered
}: CardContentProps) {
    return (
        <>
            <IconWrapper
                icon={<Icon as={icon} width="24px" height="24px" />}
                className="icon-container"
                style={{ position: "relative", zIndex: 2 }}
            />

            <Flex flexDirection="column" gap={1} position="relative" zIndex={2}>
                <CardHeader
                    title={title}
                    isLoggedIn={isLoggedIn}
                    isFollowed={isFollowed}
                    isreadyToClaim={isreadyToClaim}
                    isLoading={isLoading}
                />
                <DotSeparatedList dotColor={isHovered || isFollowed ? "rgba(255, 255, 255, 0.20)" : "neutral.gray.900"}>
                    <Text className="subtext-color" color="text.subtext.placeholder.dark">{description}</Text>
                    <Text className="subtext-color" color="text.subtext.placeholder.dark">{duration}</Text>
                </DotSeparatedList>
            </Flex>
        </>
    );
}
