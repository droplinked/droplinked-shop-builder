import { Box } from "@chakra-ui/react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";

interface BackgroundIconProps {
    icon: React.JSX.Element;
    isFollowed: boolean;
}

export default function BackgroundIcon({ icon, isFollowed }: BackgroundIconProps) {
    const { isRTL } = useLocaleResources('public-pages/landings/social-quests');

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
                    background={
                        isRTL
                            ? "linear-gradient(135deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 100%)"
                            : "linear-gradient(225deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 100%)"
                    }
                    zIndex={1}
                    borderRadius="16px"
                />
            )}

            {/* Background Icon Layer with Gradient */}
            <Box
                className="bg-icon"
                position="absolute"
                top="-20px"
                {...isRTL ? { left: "-20px" } : { right: "-20px" }}
                opacity={0.05}
                sx={{
                    "svg": {
                        w: "140px",
                        h: "140px",
                        maskImage: isRTL
                            ? "radial-gradient(circle at 121px 107px, black 0%, transparent 100%)"
                            : "radial-gradient(circle at 19px 107px, black 0%, transparent 100%)",
                        WebkitMaskImage: isRTL
                            ? "radial-gradient(circle at 121px 107px, black 0%, transparent 100%)"
                            : "radial-gradient(circle at 19px 107px, black 0%, transparent 100%)",
                        filter: "brightness(20%)"
                    }
                }}
            >
                {icon}
            </Box>
        </>
    );
}
