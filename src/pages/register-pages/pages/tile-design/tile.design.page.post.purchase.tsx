import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import React, { useContext } from "react";
import { TileDesignContext } from "./context/tile.design.context";


const TileDesignPagePostPurchase = () => {
    const {
        state: {
            design: {
                PRODUCT: { IMAGE, CONTAINER, BUTTON, VARIANTS, TITLE, PRICE },
            },
            current,
        },
    } = useContext(TileDesignContext);
    const grey_if_dark_mode = CONTAINER.darkMode ? "#C2C2C2" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#000000" : "#FFFFFF";
    return (
        <Box bg={black_if_dark_mode} color={grey_if_dark_mode} width={"full"} maxW={"70%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <VStack spacing={"10px"} padding={"16px"} rounded={"8px"} bg={"#1E9473"} alignItems={"flex-start"}>
                <AppTypography fontSize={"16px"} fontWeight={"700"} color={"white"}>
                    Payment Completed!
                </AppTypography>
                <AppTypography fontSize={"14px"} fontWeight={"400"} color={"white"}>
                    Please allow 1-2 minutes for the transaction to be confirmed. We appreciate your patience while we finalize your order.{" "}
                </AppTypography>
            </VStack>
            <VStack rounded={"8px"} spacing={"24px"} alignItems={"flex-start"} width={"full"}>
                <AppTypography fontSize={"16px"} fontWeight={"600"}>
                    Order Information
                </AppTypography>
                <VStack spacing={"16px"} width={"full"}>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>Order ID</AppTypography>
                        <AppTypography fontWeight={"600"}>46321</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>Transaction ID</AppTypography>
                        <AppTypography fontWeight={"600"} color={"#179EF8"} cursor={"pointer"} textTransform={"uppercase"} textDecoration={"underline"}>e0327b0924cf37e0327b0924cf37e0327b0924cf37a3284c</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>Shipping Method</AppTypography>
                        <AppTypography fontWeight={"600"}>Express shipping</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>Shipping Address</AppTypography>
                        <AppTypography fontWeight={"600"}>US - Los Angeles - 811 West &th Street - 90017</AppTypography>
                    </HStack>
                    <HStack justify={"space-between"} width={"full"}>
                        <AppTypography fontWeight={"600"}>Total Payment</AppTypography>
                        <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                    </HStack>
                </VStack>
            </VStack>
            <BasicButton variant="outline" color={grey_if_dark_mode}>Close</BasicButton>
        </Box>
    );
};

export default TileDesignPagePostPurchase;
