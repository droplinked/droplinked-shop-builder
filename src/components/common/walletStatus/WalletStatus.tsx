import React from "react";
import { Box } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import { IWalletStatusProps, renderIcon, renderSVGContent, renderSVGDefs, spinAnimation } from "./_components/WalletStatusComponents";

const WalletStatus: React.FC<IWalletStatusProps> = ({ variant = "green", isLoading = false, icon = "wallet" }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";
    const centerIconSize = 152;
    const centerIconSizeSm = 88;

    return (
        <Box width={"full"} height={{ base: "230px", md: "400px" }} position="relative" overflow="hidden" display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
                {renderSVGDefs(variant, color)}
                {renderSVGContent(variant)}
            </Box>

            {Array.from({ length: 6 }).map((_, index) => (
                <Box
                    key={index}
                    position="absolute"
                    borderRadius="full"
                    border={{ base: `${index === 0 ? "1px" : "0.5px"} solid ${color}`, md: `${index === 0 ? "2px" : "1px"} solid ${color}` }}
                    width={{ base: `${180 + index * 20}px`, md: `${245 + index * 35}px` }}
                    height={{ base: `${180 + index * 20}px`, md: `${245 + index * 35}px` }}
                    opacity={index === 0 ? (isLoading ? 0.1 : 0.2) : isGreen ? (8 - index) * 0.01 : (18 - index) * 0.01}
                    borderWidth={{ base: index === 0 && "1px", md: index === 0 && "2px" }}
                    {...index === 0 && icon === "tick" && { opacity: 1 }}
                />
            ))}

            {isGreen && isLoading && (
                <Box
                    position="absolute"
                    width={{ base: "180px", md: "245px" }}
                    height={{ base: "180px", md: "245px" }}
                    overflow="hidden"
                    animation={`${spinAnimation} 2s linear infinite`}
                    transformOrigin="center"
                >
                    <AppIcons.D3Spinner style={{ width: "100%", height: "100%" }} />
                </Box>
            )}
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
        </Box>
    );
};

export default WalletStatus;
