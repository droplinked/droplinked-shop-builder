import { Box, keyframes } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import React from "react";

interface IWalletStatusProps {
    width?: string | number;
    height?: string | number;
    variant?: "green" | "red";
    isLoading?: boolean;
    icon?: "wallet" | "tick";
    sideIcons?: boolean;
}

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const IconFilter = ({ right = true }: { right: boolean }) => {
    return (
        <filter
            id={`filter1_bii_20474_640_${right}`}
            {...(right ? { x: "453", y: "140" } : { x: "52", y: "140" })}
            width="120"
            height="120"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_20474_640" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_20474_640" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="-4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_20474_640" />
        </filter>
    );
};

const WalletStatus: React.FC<IWalletStatusProps> = ({ variant = "green", isLoading = false, icon = "wallet", sideIcons = true }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";
    const centerIconSize = 152;
    const centerIconSizeSm = 88;
    const sideIconsSize = 72;
    const sideIconsSizeSm = 44;

    const renderSVGDefs = () => (
        <defs>
            <radialGradient id={`paint0_radial_20314_11046_${variant}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(32.6192) scale(742.041 557.08)">
                <stop stopColor={color} stopOpacity="0.08" />
                <stop offset="0.722881" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="paint1_linear_20314_11046" x1="313" y1="-5.81566e-08" x2="312.5" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0.502162" stopColor="#1C1C1C" stopOpacity="0" />
                <stop offset="1" stopColor="#1C1C1C" />
            </linearGradient>
            <IconFilter right={false} />
            <radialGradient id="paint7_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(112 152) rotate(90) scale(96)">
                <stop stop-color="white" stop-opacity="0.02" />
                <stop offset="1" stop-color="white" stop-opacity="0.08" />
            </radialGradient>
            <radialGradient id="paint8_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 200) rotate(180) scale(48)">
                <stop stop-color={color} stop-opacity="0.64" />
                <stop offset="1" stop-color={color} stop-opacity="0.04" />
            </radialGradient>
            <IconFilter right={true} />
            <radialGradient id="paint9_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(513 152) rotate(90) scale(96)">
                <stop stop-color="white" stop-opacity="0.02" />
                <stop offset="1" stop-color="white" stop-opacity="0.08" />
            </radialGradient>
            <radialGradient id="paint10_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(465 200) scale(48)">
                <stop stop-color={color} stop-opacity="0.64" />
                <stop offset="1" stop-color={color} stop-opacity="0.04" />
            </radialGradient>
        </defs>
    );

    const renderSVGContent = () => (
        <>
            <rect width="625" height="400" fill="#1C1C1C" />
            <rect width="625" height="400" fill={`url(#paint0_radial_20314_11046_${variant})`} />
            <rect width="625" height="400" fill="url(#paint1_linear_20314_11046)" />
        </>
    );

    const renderIcon = () => {
        const iconPath =
            icon === "wallet"
                ? "M53.833 76.957V66.293C53.833 63.517 55.537 61.043 58.127 60.063L76.653 53.063C79.547 51.967 82.65 54.113 82.65 57.217V66.083M64.333 76H80.667M90.093 79.617C89.113 80.573 88.553 81.95 88.693 83.42C88.903 85.94 91.213 87.783 93.733 87.783H98.167V90.56C98.167 95.39 94.223 99.333 89.393 99.333H62.607C57.777 99.333 53.833 95.39 53.833 90.56V74.857C53.833 70.027 57.777 66.083 62.607 66.083H89.393C94.223 66.083 98.167 70.027 98.167 74.857V78.217H93.453C92.147 78.217 90.957 78.73 90.093 79.617ZM100.637 80.597V85.404C100.637 86.687 99.61 87.737 98.304 87.784H93.73C91.21 87.784 88.9 85.94 88.69 83.42C88.55 81.95 89.11 80.574 90.09 79.617C90.954 78.73 92.144 78.217 93.45 78.217H98.304C99.61 78.264 100.637 79.314 100.637 80.597Z"
                : "M58.3335 78.4259L69.8207 89.8333L95.6668 59.1667";

        return (
            <Box as="svg" width="100%" height="100%" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={iconPath} stroke={`url(#paint3_linear_20314_11046_${variant})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id={`paint3_linear_20314_11046_${variant}`} x1="53.564" y1="53.229" x2="104.101" y2="95.013" gradientUnits="userSpaceOnUse">
                        <stop stopColor={isGreen ? "#80EDCF" : color} />
                        <stop offset="1" stopColor={isGreen ? "#80EDCF" : color} stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_20474_640" x1={!isLoading ? "76" : "2.83123e-07"} y1="1" x2={!isLoading ? "0" : "76"} y2="1" gradientUnits="userSpaceOnUse">
                        <stop stop-color={isGreen ? "#2D9275" : color} />
                        <stop offset="1" stop-color="#222222" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_20474_640" x1={!isLoading ? "2.83123e-07" : "76"} y1="1" x2={!isLoading ? "76" : "0"} y2="1" gradientUnits="userSpaceOnUse">
                        <stop stop-color={isGreen ? "#2D9275" : color} />
                        <stop offset="1" stop-color="#222222" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </Box>
        );
    };

    const SideIcons = ({ children }: { children: React.ReactNode }) => {
        return (
            <Box width={"full"} height={"full"} position="relative" overflow="hidden" display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"0px"}>
                {sideIcons ? (
                    <>
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
                    </>
                ) : (
                    children
                )}
            </Box>
        );
    };

    return (
        <Box width={"full"} height={{ base: "230px", md: "400px" }} position="relative" overflow="hidden" display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
                {renderSVGDefs()}
                {renderSVGContent()}
            </Box>

            {Array.from({ length: sideIcons ? 9 : 6 }).map((_, index) =>
                sideIcons ? (
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
                ) : (
                    <Box
                        key={index}
                        position="absolute"
                        borderRadius="full"
                        border={{ base: `${index === 0 ? "1px" : "0.5px"} solid ${color}`, md: `${index === 0 ? "2px" : "1px"} solid ${isGreen ? "white" : color}` }}
                        width={{ base: `${180 + index * 20}px`, md: `${245 + index * 35}px` }}
                        height={{ base: `${180 + index * 20}px`, md: `${245 + index * 35}px` }}
                        opacity={index === 0 ? (isLoading ? 0.1 : 0.2) : isGreen ? (8 - index) * 0.01 : (18 - index) * 0.01}
                        borderWidth={{ base: index === 0 && "1px", md: index === 0 && "2px" }}
                    />
                )
            )}

            {isGreen && isLoading && (
                <Box
                    position="absolute"
                    width={sideIcons ? { base: `${centerIconSizeSm + 1}px`, md: `${centerIconSize + 2}px` } : { base: "180px", md: "245px" }}
                    height={sideIcons ? { base: `${centerIconSizeSm + 1}px`, md: `${centerIconSize + 2}px` } : { base: "180px", md: "245px" }}
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
                    {renderIcon()}
                </Box>
            </SideIcons>
        </Box>
    );
};

export default WalletStatus;
