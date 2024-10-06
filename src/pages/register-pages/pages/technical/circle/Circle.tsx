import { Box, Image, Input } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import Button from "pages/invoice-management/components/Button";
import React from "react";

const Circle = () => {
    return (
        <Box display="flex" width="full" alignItems="center" borderRadius="8px" background="#1C1C1C">
            <Image src="https://upload-file-droplinked.s3.amazonaws.com/0ed7113f38aa1fdd77fef89b65c1928a0d265d9fc8aa26d57bc7424344bd1bf8.png" width={"320px"} height={"full"} objectFit={"cover"} />
            <Box display="flex" padding="36px" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="8px" flex="1 0 0">
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="36px" alignSelf="stretch">
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="16px" alignSelf="stretch">
                            <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                                <AppTypography color="#FFF" alignSelf="stretch" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                                    Circle Wallet
                                </AppTypography>
                                <AppTypography color="#7B7B7B" alignSelf="stretch" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                    Activate the merchant wallet by Circle to enable USDC acceptance. Circle’s programmable wallet offers a secure and seamless way to manage revenue while minimizing
                                    merchant processing fees.
                                </AppTypography>
                            </Box>
                            <Box display="flex" alignItems="flex-start" gap="36px" alignSelf="stretch">
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleShield />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Secure
                                    </AppTypography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleDashboard />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Instant Access
                                    </AppTypography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleRefresh />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Automatic Conversion
                                    </AppTypography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" height="48px" alignItems="flex-start" gap="16px" alignSelf="stretch" position={"relative"}>
                            <Box display="flex" alignItems="flex-start" flex="1 0 0">
                                <Box display="flex" padding="12px 16px" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px" border="1px solid #3C3C3C">
                                    <Input
                                        display="-webkit-box"
                                        style={{ WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}
                                        color="#BCBCBC"
                                        textOverflow="ellipsis"
                                        padding={"0px"}
                                        height={"auto"}
                                        border={"none"}
                                        focusBorderColor="transparent"
                                        fontFamily="Inter"
                                        fontSize="16px"
                                        fontWeight="400"
                                        value={"0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245"}
                                    />
                                    <AppIcons.CircleCopy />
                                </Box>
                                <Box
                                    display="flex"
                                    padding="0px 4px"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="4px"
                                    position="absolute"
                                    left="12px"
                                    top="-8px"
                                    borderRadius="4px"
                                    background="#1C1C1C"
                                >
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                                        Wallet Address
                                    </AppTypography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="flex-start" gap="16px">
                        <Button
                            display="flex"
                            border="none"
                            color="#000"
                            textAlign="center"
                            fontFamily="Inter"
                            fontSize="14px"
                            fontStyle="normal"
                            fontWeight="500"
                            lineHeight="16px"
                            padding="12px 16px"
                            justifyContent="center"
                            alignItems="center"
                            gap="6px"
                            borderRadius="8px"
                            background="#2BCFA1"
                        >
                            Manage Wallet
                        </Button>
                        <Button
                            display="flex"
                            border="none"
                            color="#FFF"
                            textAlign="center"
                            fontFamily="Inter"
                            fontSize="14px"
                            fontStyle="normal"
                            fontWeight="500"
                            lineHeight="16px"
                            padding="12px 16px"
                            justifyContent="center"
                            alignItems="center"
                            gap="6px"
                            borderRadius="8px"
                            background="#262626"
                        >
                            Charge Wallet
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Circle;
