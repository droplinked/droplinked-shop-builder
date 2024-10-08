import React from "react";
import { Box } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import { IWalletStatusProps, renderIcon, renderSVGContent, renderSVGDefs, spinAnimation } from "./_components/WalletStatusComponents";
const WalletStatusSideIcons: React.FC<IWalletStatusProps> = ({ variant = "green", isLoading = false, icon = "wallet" }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";
    const centerIconSize = 152;
    const centerIconSizeSm = 88;
    const sideIconsSize = 72;
    const sideIconsSizeSm = 44;

    const SideIcons = ({ children }: { children: React.ReactNode }) => {
        return (
            <Box width={"full"} height={"full"} position="relative" overflow="hidden" display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"0px"}>
                <Box width={{ base: "55px", md: "96px" }} height={{ base: "55px", md: "96px" }}>
                    {isGreen ? <AppIcons.D3DroplinkedBorder width={"full"} height={"full"} /> : <AppIcons.D3DroplinkedBorderRed width={"full"} height={"full"} />}
                </Box>
                <Box
                    display="flex"
                    width={{ base: `${sideIconsSizeSm}px`, md: `${sideIconsSize}px` }}
                    height="2px"
                    rounded={"full"}
                    alignItems="flex-start"
                    gap="8px"
                    flexShrink="0"
                    background={`linear-gradient(270deg, ${isGreen ? "#2D9275" : color} 0%, rgba(34, 34, 34, 0.00) 100%)`}
                />
                {children}
                <Box
                    display="flex"
                    width={{ base: `${sideIconsSizeSm}px`, md: `${sideIconsSize}px` }}
                    height="2px"
                    rounded={"full"}
                    alignItems="flex-start"
                    gap="8px"
                    flexShrink="0"
                    background={`linear-gradient(90deg, ${isGreen ? "#2D9275" : color} 0%, rgba(34, 34, 34, 0.00) 100%)`}
                />
                <Box width={{ base: "55px", md: "96px" }} height={{ base: "55px", md: "96px" }}>
                    {isGreen ? <AppIcons.D3D3Border width={"full"} height={"full"} /> : <AppIcons.D3D3BorderRed width={"full"} height={"full"} />}
                </Box>
            </Box>
        );
    };

    return (
        <Box width={"full"} height={{ base: "230px", md: "400px" }} position="relative" overflow="hidden" display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
                {renderSVGDefs(variant, color)}
                {renderSVGContent(variant)}
            </Box>

            {Array.from({ length: 9 }).map((_, index) => (
                <Box
                    key={index}
                    position="absolute"
                    borderRadius="full"
                    border={{ base: `${index === 0 ? "1px" : "0.5px"} solid ${isGreen ? "white" : color}`, md: `${index === 0 ? "2px" : "1px"} solid ${isGreen ? "white" : color}` }}
                    width={{ base: `${220 + index * 30}px`, md: `${390 + index * 50}px` }}
                    height={{ base: `${220 + index * 30}px`, md: `${390 + index * 50}px` }}
                    opacity={index === 0 ? (isLoading ? 0.08 : 0.16) : isGreen ? (5 - index) * 0.01 : (14 - index) * 0.01}
                    borderWidth={{ base: index === 0 && "1px", md: index === 0 && "2px" }}
                />
            ))}

            {isGreen && isLoading && (
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
            )}
            <SideIcons>
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
            </SideIcons>
        </Box>
    );
};

export default WalletStatusSideIcons;
