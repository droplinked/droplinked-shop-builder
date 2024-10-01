import React from "react";
import { Box, ChakraProps, keyframes } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";

interface ID3WalletProps {
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

const D3Wallet: React.FC<ID3WalletProps> = ({ width = "625px", height = "400px", variant = "red", isLoading = false, icon = "wallet" }) => {
    const isGreen = variant === "green";
    const color = isGreen ? "#2BCFA1" : "#FF2244";

    return (
        <Box width={width} height={height} position="relative" overflow={"hidden"}>
            <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
                <rect width="625" height="400" fill="#1C1C1C" />
                <rect width="625" height="400" fill={`url(#paint0_radial_20314_11046_${variant})`} />
                <rect width="625" height="400" fill="url(#paint1_linear_20314_11046)" />
                <rect width="77" height="2" transform="translate(160 199)" fill="url(#paint6_linear_20474_640)" />
                <rect width="77" height="2" transform="translate(388 199)" fill="url(#paint7_linear_20474_640)" />
                <g filter="url(#filter1_bii_20474_640)">
                    <rect x="64" y="152" width="96" height="96" rx="48" fill="url(#paint7_radial_20474_640)" />
                    <rect x="64.5" y="152.5" width="95" height="95" rx="47.5" stroke="url(#paint8_radial_20474_640)" />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M136 200C136 213.255 125.255 224 112 224C98.7452 224 88 213.255 88 200C88 186.745 98.7452 176 112 176C125.255 176 136 186.745 136 200ZM103.25 200C103.25 195.152 107.152 191.25 112 191.25C116.848 191.25 120.75 195.27 120.75 200.118V208.75H112C107.152 208.75 103.25 204.848 103.25 200Z"
                        fill="white"
                    />
                </g>
                <g filter="url(#filter2_bi_20474_640)">
                    <rect x="465" y="152" width="96" height="96" rx="48" fill="url(#paint9_radial_20474_640)" />
                    <rect x="465.5" y="152.5" width="95" height="95" rx="47.5" stroke="url(#paint10_radial_20474_640)" />
                    <path
                        d="M503.417 176C505.549 182.164 507.673 188.33 509.825 194.488C510 194.988 509.949 195.242 509.518 195.568C507.888 196.807 507.207 198.529 507.362 200.888C500.914 202.972 494.45 205.062 487.869 207.19C487.696 206.334 487.512 205.52 487.374 204.699C487.225 203.826 487.122 202.945 487 202.067C487 201.262 487 200.456 487 199.651C491.99 198.05 496.98 196.449 501.996 194.84C501.933 194.633 501.897 194.493 501.85 194.356C500.388 190.103 498.927 185.849 497.46 181.597C496.83 179.769 496.786 179.708 498.394 178.713C499.982 177.734 501.656 176.899 503.294 176C503.335 176 503.377 176 503.417 176Z"
                        fill="white"
                    />
                    <path
                        d="M530.215 219.807C528.378 221.494 526.387 222.813 524.224 223.858C524.088 223.924 523.786 223.822 523.663 223.695C520.728 220.676 517.808 217.643 514.885 214.611C514.29 213.995 513.7 213.371 513.177 212.823C511.891 214.084 510.629 215.273 509.417 216.516C507.063 218.931 504.741 221.378 502.39 223.796C502.255 223.935 501.93 224.049 501.781 223.979C499.604 222.962 497.619 221.64 495.774 219.975C496.748 218.957 497.697 217.963 498.649 216.972C502.321 213.151 505.998 209.333 509.66 205.502C509.999 205.149 510.25 205.016 510.754 205.248C512.333 205.975 513.936 205.909 515.498 205.151C515.799 205.006 515.992 204.986 516.249 205.255C520.819 210.016 525.4 214.766 529.977 219.519C530.048 219.593 530.107 219.677 530.213 219.809L530.215 219.807Z"
                        fill="white"
                    />
                    <path
                        d="M522.947 176.153C525.231 177.088 527.294 178.318 529.174 179.864C529.29 179.96 529.333 180.277 529.275 180.444C527.801 184.714 526.309 188.98 524.82 193.245C524.633 193.783 524.449 194.321 524.241 194.92C524.439 195.002 524.618 195.09 524.804 195.15C529.326 196.602 533.846 198.059 538.376 199.484C538.867 199.638 539.006 199.852 539 200.363C538.97 202.675 538.551 205.777 538.003 207.252C531.541 205.178 525.077 203.101 518.622 201.03C518.622 200.762 518.617 200.554 518.622 200.344C518.671 198.465 517.997 196.913 516.587 195.711C516.319 195.483 516.2 195.32 516.339 194.93C518.477 188.857 520.594 182.776 522.717 176.697C522.777 176.524 522.86 176.359 522.947 176.154V176.153Z"
                        fill="white"
                    />
                    <ellipse cx="512.939" cy="200.136" rx="2.88227" ry="2.94648" fill="white" />
                </g>
                <defs>
                    <radialGradient id={`paint0_radial_20314_11046_${variant}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(32.6192) scale(742.041 557.08)">
                        <stop stopColor={color} stopOpacity="0.08" />
                        <stop offset="0.722881" stopColor={color} stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="paint1_linear_20314_11046" x1="313" y1="-5.81566e-08" x2="312.5" y2="400" gradientUnits="userSpaceOnUse">
                        <stop offset="0.502162" stopColor="#1C1C1C" stopOpacity="0" />
                        <stop offset="1" stopColor="#1C1C1C" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_20474_640" x1={!isLoading ? "76" : "2.83123e-07"} y1="1" x2={!isLoading ? "0" : "76"} y2="1" gradientUnits="userSpaceOnUse">
                        <stop stop-color={isGreen ? "#2D9275" : color} />
                        <stop offset="1" stop-color="#222222" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_20474_640" x1={!isLoading ? "2.83123e-07" : "76"} y1="1" x2={!isLoading ? "76" : "0"} y2="1" gradientUnits="userSpaceOnUse">
                        <stop stop-color={isGreen ? "#2D9275" : color} />
                        <stop offset="1" stop-color="#222222" stop-opacity="0" />
                    </linearGradient>
                    <filter id="filter1_bii_20474_640" x="52" y="140" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_20474_640" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_20474_640" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="-4" />
                        <feGaussianBlur stdDeviation="8" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.24 0" />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_20474_640" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="-4" />
                        <feGaussianBlur stdDeviation="8" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
                        <feBlend mode="normal" in2="effect2_innerShadow_20474_640" result="effect3_innerShadow_20474_640" />
                    </filter>
                    <radialGradient id="paint7_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(112 152) rotate(90) scale(96)">
                        <stop stop-color="white" stop-opacity="0.02" />
                        <stop offset="1" stop-color="white" stop-opacity="0.08" />
                    </radialGradient>
                    <radialGradient id="paint8_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 200) rotate(180) scale(48)">
                        <stop stop-color={color} stop-opacity="0.64" />
                        <stop offset="1" stop-color={color} stop-opacity="0.04" />
                    </radialGradient>
                    <filter id="filter2_bi_20474_640" x="453" y="140" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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
                    <radialGradient id="paint9_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(513 152) rotate(90) scale(96)">
                        <stop stop-color="white" stop-opacity="0.02" />
                        <stop offset="1" stop-color="white" stop-opacity="0.08" />
                    </radialGradient>
                    <radialGradient id="paint10_radial_20474_640" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(465 200) scale(48)">
                        <stop stop-color={color} stop-opacity="0.64" />
                        <stop offset="1" stop-color={color} stop-opacity="0.04" />
                    </radialGradient>
                </defs>
            </Box>
            <CircleBox top="-149.5px" left="-37.5px" width="699px" height="699px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.01 : 0.09} />
            <CircleBox top="-114.5px" left="-2.5px" width="629px" height="629px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.01 : 0.1} />
            <CircleBox top="-82.5px" left="30.5px" width="564px" height="564px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.02 : 0.11} />
            <CircleBox top="-52.5px" left="60.5px" width="504px" height="504px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.03 : 0.12} />
            <CircleBox top="-24.5px" left="87.5px" width="449px" height="449px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.04 : 0.13} />
            {/* opacity={isGreen ? 0.05 : 0.14}  */}
            <CircleBox top="0.5px" left="112.5px" width="399px" height="399px" borderColor={isGreen ? "white" : color} opacity={isLoading ? 0.08 : 0.16}  borderWidth="2px" />
            {/* <CircleBox top="22.5px" left="135.5px" width="354px" height="354px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.06 : 0.15} /> */}
            {/* <CircleBox top="42.5px" left="155.5px" width="314px" height="314px" borderColor={isGreen ? "white" : color} opacity={isGreen ? 0.07 : 0.16} /> */}
            {/* <CircleBox top="61px" left="173px" width="278px" height="278px" borderColor={isLoading && isGreen ? "white" : color} opacity={isLoading ? 0.08 : 0.16} borderWidth="2px" /> */}

            {isGreen && isLoading && (
                <Box position="absolute" top="123px" left="235px" width="154px" height="154px" overflow="hidden" animation={`${spinAnimation} 2s linear infinite`} transformOrigin="center">
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
                background="radial-gradient(100% 100% at 50% 0%, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.08) 100%)"
                boxShadow="0px 0px 160px 0px rgba(43, 207, 161, 0.24), 0px -4px 16px 0px rgba(43, 207, 161, 0.40) inset"
                backdropFilter="blur(20px)"
                border={!isLoading && "1px solid"}
                {...(!isGreen && {
                    border: "1px solid #F24",
                    background: "radial-gradient(100% 100% at 50% 0%, rgba(255, 34, 68, 0.08) 0%, rgba(255, 34, 68, 0.16) 100%)",
                    boxShadow: "0px 0px 160px 0px rgba(255, 34, 68, 0.24), 0px -4px 16px 0px rgba(255, 34, 68, 0.40) inset",
                })}
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

export default D3Wallet;
