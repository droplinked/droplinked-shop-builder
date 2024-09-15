import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";

const AffiliateItem = ({ image, name, price, commission }: { image: string; name: string; price: number; commission: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            position="relative"
            display="flex"
            width="288px"
            height="360px"
            padding="8px"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="center"
            gap="10px"
            borderRadius="8px"
            overflow="hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={{
                "&::before": {
                    transform: "scale(1)",
                },
            }}
            _before={{
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transition: "transform 0.3s ease",
                zIndex: -1,
                transform: "scale(1.1)",
            }}
        >
            <Box display="flex" padding="12px 16px 16px 16px" borderRadius="8px" background="rgba(255, 255, 255, 0.10)" backdropFilter="blur(25px)" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="16px" alignSelf="stretch" position="relative" transition="opacity 0.3s ease">
                <Box width={"full"} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="8px">
                    <AppTypography
                        display="-webkit-box"
                        alignSelf="stretch"
                        overflow="hidden"
                        color="#FFF"
                        textOverflow="ellipsis"
                        fontFamily="Inter"
                        fontSize="16px"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="24px"
                        style={{ WebkitBoxOrient: "vertical", WebkitLineClamp: "1" }}
                    >
                        {name}
                    </AppTypography>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" alignSelf="stretch">
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                            <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">Price</AppTypography>
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">${price} USD</AppTypography>
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                            <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">Commission</AppTypography>
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">%{commission}</AppTypography>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            maxHeight: isHovered ? "100px" : "0px",
                            transition: "max-height 0.4s linear",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "16px",
                            gap: "16px",
                            alignItems: "flex-start",
                            width: "100%",
                        }}
                    >
                        <Divider height={"0.5px"} color={"white"} />
                        <Flex alignItems={"center"} justifyContent={"center"} gap={"12px"}>
                            <AppImage src={image} width={"36px"} height={"36px"} rounded={"full"} objectFit={"cover"} />
                            <Flex alignItems={"flex-start"} flexDir={"column"} justifyContent={"center"}>
                                <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">Producer</AppTypography>
                                <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">Unstoppable Domain</AppTypography>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AffiliateItem;
