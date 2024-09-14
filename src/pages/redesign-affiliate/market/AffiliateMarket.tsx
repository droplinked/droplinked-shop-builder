import { Box, Image, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

const AffiliateMarket = () => {
    return (
        <VStack spacing={"8px"}>
            <VStack
                alignItems="center"
                width="full"
                justifyContent="center"
                height="424px"
                background="radial-gradient(305.12% 110.25% at 13.65% 81.01%, #182522 1.56%, rgba(48, 48, 48, 0.08) 23.53%, rgba(46, 73, 63, 0.42) 44.64%, #171717 79.55%, #000 100%), linear-gradient(rgba(255, 255, 255, 0.16) .1em, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, 0.16) .1em, transparent .1em), #060606"
                backgroundPosition="center, 0 0, 0 0"
                backgroundSize="cover, 3em 3em, 3em 3em"
                backgroundRepeat="no-repeat, repeat, repeat"
            >
                <Box width="100%" height="auto">
                    <svg width="1525" height="419" viewBox="0 0 1525 419" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group">
                            <rect id="Rectangle" x="216" y="250.932" width="380.932" height="547.709" transform="rotate(-90 216 250.932)" fill="url(#paint0_angular_23717_5356)" />
                            <rect id="Rectangle_2" width="380.932" height="547.709" transform="matrix(-1.58551e-07 -1 -1 1.08459e-07 1309 250.932)" fill="url(#paint1_angular_23717_5356)" />
                            <g id="Rectangle_3" filter="url(#filter0_bf_23717_5356)">
                                <rect x="132" y="135" width="1261" height="284" fill="black" fillOpacity="0.01" />
                            </g>
                        </g>
                        <defs>
                            <filter id="filter0_bf_23717_5356" x="-68" y="-65" width="1661" height="684" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="100" />
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23717_5356" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_23717_5356" result="shape" />
                                <feGaussianBlur stdDeviation="66" result="effect2_foregroundBlur_23717_5356" />
                            </filter>
                            <radialGradient
                                id="paint0_angular_23717_5356"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(406.466 524.786) rotate(90) scale(256.84 53.8636)"
                            >
                                <stop stopColor="#2BCFA1" />
                                <stop offset="0.2114" stopColor="#035A42" />
                                <stop offset="0.336422" stopColor="#18131A" stopOpacity="0.131006" />
                                <stop offset="0.835338" stopColor="#071612" stopOpacity="0" />
                                <stop offset="0.971482" stopOpacity="0" />
                                <stop offset="0.993151" stopColor="#528EE7" stopOpacity="0.18" />
                            </radialGradient>
                            <radialGradient
                                id="paint1_angular_23717_5356"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(190.466 273.854) rotate(90) scale(256.84 53.8636)"
                            >
                                <stop stopColor="#2BCFA1" />
                                <stop offset="0.2114" stopColor="#035A42" />
                                <stop offset="0.336422" stopColor="#18131A" stopOpacity="0.131006" />
                                <stop offset="0.835338" stopColor="#071612" stopOpacity="0" />
                                <stop offset="0.971482" stopOpacity="0" />
                                <stop offset="0.993151" stopColor="#528EE7" stopOpacity="0.18" />
                            </radialGradient>
                        </defs>
                    </svg>
                </Box>
                <VStack display="inline-flex" flexDirection="column" alignItems="center" gap="16px">
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="32px" fontStyle="normal" fontWeight="400" lineHeight="48px">
                        Unlock Savings
                    </AppTypography>
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="48px" fontStyle="normal" fontWeight="700" lineHeight="64px">
                        Explore Top Affiliate Picks!
                    </AppTypography>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default AffiliateMarket;
