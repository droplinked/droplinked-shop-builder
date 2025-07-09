import { Box } from "@chakra-ui/react";
import React from "react";
import { renderIcon } from "utils/helpers/walletConnectionUtils";

interface CenterIconProps {
    isGreen: boolean;
    isLoading: boolean;
    color: string;
    icon: string;
    variant: string;
    centerIconSize: number;
    centerIconSizeSm: number;
}

const CenterIcon: React.FC<CenterIconProps> = ({
    isGreen,
    isLoading,
    color,
    icon,
    variant,
    centerIconSize,
    centerIconSizeSm
}) => {
    return (
        <Box
            width={{ base: `${centerIconSizeSm}px`, md: `${centerIconSize}px` }}
            height={{ base: `${centerIconSizeSm}px`, md: `${centerIconSize}px` }}
            borderRadius="full"
            background={
                isGreen
                    ? "radial-gradient(100% 100% at 50% 0%, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.08) 100%)"
                    : "radial-gradient(100% 100% at 50% 0%, rgba(255, 34, 68, 0.08) 0%, rgba(255, 34, 68, 0.16) 100%)"
            }
            boxShadow={
                isGreen
                    ? "0px 0px 160px 0px rgba(43, 207, 161, 0.24), 0px -4px 16px 0px rgba(43, 207, 161, 0.40) inset"
                    : "0px 0px 160px 0px rgba(255, 34, 68, 0.24), 0px -4px 16px 0px rgba(255, 34, 68, 0.40) inset"
            }
            backdropFilter="blur(20px)"
            border={!isLoading ? "1px solid" : undefined}
            borderColor={isGreen ? "#2D9275" : color}
        >
            {renderIcon(icon, variant, isGreen, color)}
        </Box>
    );
};

export default CenterIcon; 