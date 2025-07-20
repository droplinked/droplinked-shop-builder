import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useContext } from "react";
import { TileDesignContext } from "./context/tile.design.context";


const TileDesignPagePostPurchase = () => {
    const { t } = useLocaleResources('tile-design');
    const {
        state: {
            design: {
                PRODUCT: { IMAGE, CONTAINER, BUTTON, VARIANTS, TITLE, PRICE },
            },
            current,
        },
    } = useContext(TileDesignContext);
    const grey_if_dark_mode = CONTAINER.darkMode ? "#C2C2C2" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#141414" : "#FFFFFF";
    return (
        <Box bg={black_if_dark_mode} color={grey_if_dark_mode} width={"full"} maxW={"70%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <VStack spacing={"10px"} padding={"16px"} rounded={"8px"} bg={"#1E9473"} alignItems={"flex-start"}>
                <AppTypography fontSize={"16px"} fontWeight={"700"} color={"white"}>
                    {t('TileDesignPagePostPurchase.completed')}
                </AppTypography>
                <AppTypography fontSize={"14px"} fontWeight={"400"} color={"white"}>
                    {t('TileDesignPagePostPurchase.confirmation')}
                </AppTypography>
            </VStack>
            <VStack rounded={"8px"} spacing={"24px"} alignItems={"flex-start"} width={"full"}>
                <AppTypography fontSize={"16px"} fontWeight={"600"}>
                    {t('TileDesignPagePostPurchase.title')}
                </AppTypography>
                <VStack spacing={"16px"} width={"full"}>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>{t('TileDesignPagePostPurchase.orderId')}</AppTypography>
                        <AppTypography fontWeight={"600"}>46321</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>{t('TileDesignPagePostPurchase.transactionId')}</AppTypography>
                        <AppTypography fontWeight={"600"} color={"#179EF8"} cursor={"pointer"} textTransform={"uppercase"} textDecoration={"underline"}>e0327b0924cf37e0327b0924cf37e0327b0924cf37a3284c</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>{t('TileDesignPagePostPurchase.shippingMethod')}</AppTypography>
                        <AppTypography fontWeight={"600"}>Express shipping</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>{t('TileDesignPagePostPurchase.shippingAddress')}</AppTypography>
                        <AppTypography fontWeight={"600"}>US - Los Angeles - 811 West &th Street - 90017</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>{t('TileDesignPagePostPurchase.totalPayment')}</AppTypography>
                        <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                    </HStack>
                </VStack>
            </VStack>
            <BasicButton variant="outline" color={grey_if_dark_mode}>{t('common.close')}</BasicButton>
        </Box>
    );
};

export default TileDesignPagePostPurchase;
