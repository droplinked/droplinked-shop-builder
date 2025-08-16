import { Box } from "@chakra-ui/react";
import { usePartnerLanding } from "pages/public-pages/landings/partner-pages/context/PartnerLandingContext";
import React from "react";
import { IWalletStatusProps } from "utils/helpers/walletConnectionUtils";
import AnimatedCircles from "./AnimatedCircles";
import BackgroundSVG from "./BackgroundSVG";
import CenterIcon from "./CenterIcon";
import LoadingSpinner from "./LoadingSpinner";
import SideIcons from "./SideIcons";

const WalletStatusDisplay: React.FC<IWalletStatusProps> = ({ variant = "green", isLoading = false, icon = "wallet" }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";
    const centerIconSize = 152;
    const centerIconSizeSm = 88;
    const sideIconsSize = 72;
    const sideIconsSizeSm = 44;

    const { partnerId } = usePartnerLanding();

    return (
        <Box
            width="full"
            height={{ base: "230px", md: "400px" }}
            position="relative"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <BackgroundSVG variant={variant} color={color} />

            <AnimatedCircles isGreen={isGreen} isLoading={isLoading} color={color} />

            <LoadingSpinner
                isGreen={isGreen}
                isLoading={isLoading}
                centerIconSize={centerIconSize}
                centerIconSizeSm={centerIconSizeSm}
            />

            <SideIcons
                isGreen={isGreen}
                color={color}
                partnerId={partnerId}
                sideIconsSize={sideIconsSize}
                sideIconsSizeSm={sideIconsSizeSm}
            >
                <CenterIcon
                    isGreen={isGreen}
                    isLoading={isLoading}
                    color={color}
                    icon={icon}
                    variant={variant}
                    centerIconSize={centerIconSize}
                    centerIconSizeSm={centerIconSizeSm}
                />
            </SideIcons>
        </Box>
    );
};

export default WalletStatusDisplay;
