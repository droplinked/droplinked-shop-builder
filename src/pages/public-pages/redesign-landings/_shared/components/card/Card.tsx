import { Box, Flex, Text } from "@chakra-ui/react";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import React, { useState } from "react";
import CardHoverEffect from "./CardHoverEffect";

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    children?: React.ReactNode;
    gridColumn?: string | { base?: string; md?: string; lg?: string };
    hasHoverEffect?: boolean;
    hasBackgroundOverlay?: boolean
}

export default function Card({ icon, title, description, children, gridColumn, hasHoverEffect, hasBackgroundOverlay }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const hovered = isHovered && hasHoverEffect;

    return (
        <Flex
            role="group"
            position="relative"
            overflow="hidden"
            flexDirection="column"
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            gridColumn={gridColumn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cursor="default"
        >
            {(hasHoverEffect || hasBackgroundOverlay) && <CardHoverEffect isStatic={hasBackgroundOverlay} />}
            <Flex flexDirection="column" gap={4} p={6} position="relative" zIndex={1}>
                <IconWrapper
                    border="1px solid"
                    borderColor={hovered ? "label.primary.success" : "neutral.gray.900"}
                    background={hovered ? "label.primary.success" : "neutral.background"}
                    transition="all 0.3s ease-in-out"
                    icon={icon}
                />
                <Box>
                    <Text fontSize={{ base: 16, lg: 20 }} fontWeight={500} color="text.white" mb={1}>
                        {title}
                    </Text>
                    <Text
                        fontSize={{ base: 14, lg: 16 }}
                        fontWeight={400}
                        color="text.subtext.placeholder.dark"
                        mb={1}
                    >
                        {description}
                    </Text>
                </Box>
            </Flex>
            {children && <Box height="100%" position="relative" zIndex={1}>{children}</Box>}
        </Flex>
    );
}