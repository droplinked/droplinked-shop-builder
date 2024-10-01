import React from "react";
import { Box, ChakraProps, keyframes, Spinner } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";

interface ID3Props {
    width?: string | number;
    height?: string | number;
    variant?: "green" | "red";
    isLoading?: boolean;
    icon?: "wallet" | "tick";
}

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CircleBox: React.FC<ChakraProps> = (props) => <Box position="absolute" borderRadius="full" border="1px solid" {...props} />;

const D3: React.FC<ID3Props> = ({ width = "625px", height = "400px", variant = "green", isLoading = true, icon = "wallet" }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";

    return (
        <Box width={width} height={height} position="relative">
            {/* Background SVG */}
            <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
                <rect width="625" height="400" fill="#1C1C1C" />
                <rect width="625" height="400" fill={`url(#paint0_radial_20314_11046_${variant})`} />
                <rect width="625" height="400" fill="url(#paint1_linear_20314_11046)" />
                <defs>
                    <radialGradient id={`paint0_radial_20314_11046_${variant}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(32.6192) scale(742.041 557.08)">
                        <stop stopColor={color} stopOpacity="0.16" />
                        <stop offset="0.722881" stopColor={color} stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="paint1_linear_20314_11046" x1="313" y1="-5.81566e-08" x2="312.5" y2="400" gradientUnits="userSpaceOnUse">
                        <stop offset="0.502162" stopColor="#1C1C1C" stopOpacity="0" />
                        <stop offset="1" stopColor="#1C1C1C" />
                    </linearGradient>
                </defs>
            </Box>
            <CircleBox top="-149.5px" left="-37.5px" width="699px" height="699px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.01 : 0.09} />
            <CircleBox top="-114.5px" left="-2.5px" width="629px" height="629px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.01 : 0.1} />
            <CircleBox top="-82.5px" left="30.5px" width="564px" height="564px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.02 : 0.11} />
            <CircleBox top="-52.5px" left="60.5px" width="504px" height="504px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.03 : 0.12} />
            <CircleBox top="-24.5px" left="87.5px" width="449px" height="449px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.04 : 0.13} />
            <CircleBox top="0.5px" left="112.5px" width="399px" height="399px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.05 : 0.14} />
            <CircleBox top="22.5px" left="135.5px" width="354px" height="354px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.06 : 0.15} />
            <CircleBox top="42.5px" left="155.5px" width="314px" height="314px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.07 : 0.16} />
            <CircleBox top="61px" left="173px" width="278px" height="278px" borderColor={isLoading && isGreen ? "white" : color} opacity={isLoading ? 0.08 : 0.16} borderWidth="2px" />

            {isGreen && isLoading && (
                <Box position="absolute" top="77px" left="190px" width="245px" height="245px" overflow="hidden" animation={`${spinAnimation} 2s linear infinite`} transformOrigin="center">
                    <AppIcons.D3Spinner style={{ width: "100%", height: "100%" }} />
                </Box>
            )}

            <Box
                position="absolute"
                top="124px"
                left="236px"
                width="152px"
                height="152px"
                borderRadius="full"
                bgGradient={`radial(${color}14, ${color}3D)`}
                border="1px solid"
                borderColor={isGreen ? "#2D9275" : color}
            >
                <Box as="svg" width="100%" height="100%" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={
                            icon === "wallet"
                                ? "M53.833 76.957V66.293C53.833 63.517 55.537 61.043 58.127 60.063L76.653 53.063C79.547 51.967 82.65 54.113 82.65 57.217V66.083M64.333 76H80.667M90.093 79.617C89.113 80.573 88.553 81.95 88.693 83.42C88.903 85.94 91.213 87.783 93.733 87.783H98.167V90.56C98.167 95.39 94.223 99.333 89.393 99.333H62.607C57.777 99.333 53.833 95.39 53.833 90.56V74.857C53.833 70.027 57.777 66.083 62.607 66.083H89.393C94.223 66.083 98.167 70.027 98.167 74.857V78.217H93.453C92.147 78.217 90.957 78.73 90.093 79.617ZM100.637 80.597V85.404C100.637 86.687 99.61 87.737 98.304 87.784H93.73C91.21 87.784 88.9 85.94 88.69 83.42C88.55 81.95 89.11 80.574 90.09 79.617C90.954 78.73 92.144 78.217 93.45 78.217H98.304C99.61 78.264 100.637 79.314 100.637 80.597Z"
                                : "M58.3335 78.4259L69.8207 89.8333L95.6668 59.1667"
                        }
                        stroke={`url(#paint3_linear_20314_11046_${variant})`}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id={`paint3_linear_20314_11046_${variant}`} x1="53.564" y1="53.229" x2="104.101" y2="95.013" gradientUnits="userSpaceOnUse">
                            <stop stopColor={isGreen ? "#80EDCF" : color} />
                            <stop offset="1" stopColor={isGreen ? "#80EDCF" : color} stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                </Box>
            </Box>
        </Box>
    );
};

export default D3;
