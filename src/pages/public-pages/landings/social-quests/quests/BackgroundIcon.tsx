import { Box, Icon } from "@chakra-ui/react";
import React from "react";

interface BackgroundIconProps {
    gradiantLogo: React.ComponentType;
    isFollowed: boolean;
}

export default function BackgroundIcon({ gradiantLogo, isFollowed }: BackgroundIconProps) {
    return (
        <>
            {/* Gradient Overlay for Fade Effect */}
            {isFollowed && (
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    height="100%"
                    background="linear-gradient(180deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 100%)"
                    zIndex={1}
                    borderRadius="16px"
                />
            )}

            {/* Background Icon Layer with Gradient */}
            <Box
                className="bg-icon"
                position="absolute"
                top="-20px"
                right="-20px"
                filter={isFollowed ? "brightness(3)" : "unset"}
                sx={{
                    "svg": {
                        w: "140px",
                        h: "140px",
                    }
                }}
            >
                <Icon as={gradiantLogo} />
            </Box>
        </>
    );
}
