import { Box } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import React from "react";
import { spinAnimation } from "utils/helpers/walletConnectionUtils";

interface LoadingSpinnerProps {
    isGreen: boolean;
    isLoading: boolean;
    centerIconSize: number;
    centerIconSizeSm: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    isGreen, 
    isLoading, 
    centerIconSize, 
    centerIconSizeSm 
}) => {
    if (!isGreen || !isLoading) return null;

    return (
        <Box
            position="absolute"
            width={{ base: `${centerIconSizeSm + 1}px`, md: `${centerIconSize + 2}px` }}
            height={{ base: `${centerIconSizeSm + 1}px`, md: `${centerIconSize + 2}px` }}
            overflow="hidden"
            animation={`${spinAnimation} 2s linear infinite`}
            transformOrigin="center"
        >
            <AppIcons.D3Spinner style={{ width: "100%", height: "100%" }} />
        </Box>
    );
};

export default LoadingSpinner; 