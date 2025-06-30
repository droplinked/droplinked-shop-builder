import { Box, Flex, Text } from "@chakra-ui/react"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import React, { useState } from "react"
import CardHoverEffect from "./CardHoverEffect"
import { CardData } from "./Cards"

interface CardProps extends CardData {
    hasHoverEffect?: boolean
    flexDirection?: 'column' | 'column-reverse'
    hasGradiantOverlay?: boolean
    innerOverlay?: string
}

export default function Card({ icon, title, description, children, gridColumn, hasHoverEffect, hasBackgroundOverlay, flexDirection, hasGradiantOverlay, innerOverlay }: CardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const hovered = isHovered && hasHoverEffect

    // Determine gradient based on flex direction
    const gradientStyle = flexDirection === 'column-reverse'
        ? "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 50%, #0A0A0A 100%)"
        : "linear-gradient(180deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 50%)";

    return (
        <Flex
            role="group"
            position="relative"
            overflow="hidden"
            flexDirection={flexDirection || "column"}
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            gridColumn={gridColumn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            background="neutral.websiteBackground"
            cursor="default"
        >
            {(hasHoverEffect || hasBackgroundOverlay) && <CardHoverEffect isStatic={hasBackgroundOverlay} />}
            <Flex flexDirection="column" gap={4} p={6} position="relative" zIndex={1}>
                {icon &&
                    <IconWrapper
                        border="1px solid"
                        borderColor={hovered ? "label.primary.success" : "neutral.gray.900"}
                        background={hovered ? "label.primary.success" : "neutral.background"}
                        transition="all 0.3s ease-in-out"
                        icon={icon}
                    />
                }
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
            {children && (
                <Box height="100%" position="relative" zIndex={1}>
                    {/* Gradient overlay for children */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgImage={hasGradiantOverlay ? gradientStyle : undefined}
                        zIndex={2}
                        pointerEvents="none"
                    />
                    {/* Inner overlay for PNG image */}
                    {innerOverlay && (
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgImage={`url(${innerOverlay})`}
                            bgSize="cover"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            zIndex={3}
                            pointerEvents="none"
                        />
                    )}
                    <Box position="relative" zIndex={1}>
                        {children}
                    </Box>
                </Box>
            )}
        </Flex>
    )
}