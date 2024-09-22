import { Box, Divider, Flex, Skeleton } from "@chakra-ui/react";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import React from "react";

export const LAffiliateItem = () => (
    <Box width="288px" height="360px" position="relative">
        <Skeleton height="100%" width="100%" borderRadius="8px" />
        <Box position="absolute" bottom="0" left="0" right="0" padding="12px 16px 16px 16px" borderRadius="8px" background="rgba(255, 255, 255, 0.10)" backdropFilter="blur(25px)">
            <Skeleton height="24px" width="80%" mb="8px" />
            <Flex justifyContent="space-between">
                <Box>
                    <Skeleton height="16px" width="40px" mb="4px" />
                    <Skeleton height="20px" width="60px" />
                </Box>
                <Box>
                    <Skeleton height="16px" width="40px" mb="4px" />
                    <Skeleton height="20px" width="60px" />
                </Box>
            </Flex>
        </Box>
    </Box>
);

const AffiliateItem = ({
    image,
    name,
    price,
    commission,
    ownerName,
    logo,
    slug,
}: {
    image: string;
    name: string;
    price: number;
    commission: number;
    ownerName?: string;
    logo?: string;
    slug?: string;
}) => {
    const { shopNavigate } = useCustomNavigate();
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
            cursor="pointer"
            onClick={() => shopNavigate(`affiliate/products/${slug}`)}
            sx={{
                "&::before": {
                    content: '""',
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
                },
                "&:hover::before": {
                    transform: "scale(1)",
                },
                ".hover-content": {
                    maxHeight: "0",
                    transition: "max-height 0.4s linear",
                    overflow: "hidden",
                },
                "&:hover .hover-content": {
                    maxHeight: "100px",
                },
            }}
        >
            <Box
                display="flex"
                padding="12px 16px 16px 16px"
                borderRadius="8px"
                background="rgba(255, 255, 255, 0.10)"
                backdropFilter="blur(25px)"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gap="16px"
                alignSelf="stretch"
                position="relative"
            >
                <Box width="full" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="8px">
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
                            <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                                Price
                            </AppTypography>
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">
                                ${price} USD
                            </AppTypography>
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                            <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                                Commission
                            </AppTypography>
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">
                                %{commission}
                            </AppTypography>
                        </Box>
                    </Box>
                    <Box
                        className="hover-content"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "16px",
                            gap: "16px",
                            alignItems: "flex-start",
                            width: "100%",
                        }}
                    >
                        <Divider height="0.5px" color="white" />
                        <Flex alignItems="center" justifyContent="center" gap="12px">
                            <AppImage src={logo} width="36px" height="36px" rounded="full" objectFit="cover" />
                            <Flex alignItems="flex-start" flexDir="column" justifyContent="center">
                                <AppTypography color="#FFFFFFBF" textAlign="right" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                                    Producer
                                </AppTypography>
                                <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">
                                    {ownerName}
                                </AppTypography>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AffiliateItem;
