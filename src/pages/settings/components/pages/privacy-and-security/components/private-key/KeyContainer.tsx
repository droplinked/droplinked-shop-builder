import { Box, Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import AppTypography from "components/common/typography/AppTypography";
import { getShopPrivateKeyService } from "lib/apis/shop/shopServices";
import { useHasPermission } from "lib/stores/app/appStore";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function KeyContainer() {
    const hasPermission = useHasPermission();
    const hasPrivateKeyPermission = hasPermission("shopfront_apis");
    const { isFetching, data } = useQuery(
        "shopPrivateKey",
        getShopPrivateKeyService,
        { enabled: hasPermission("shopfront_apis") }
    );

    //we use a fake value to prevent the empty private key when we don't have private key
    const privateKey = data?.data.data.privateKey ?? "1234567890123456";
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        if (!hasPermission("shopfront_apis")) return;
        setIsVisible(!isVisible)
    }

    if (isFetching) {
        return (
            <AppSkeleton isLoaded={!isFetching} width={"400px"} height={"24px"} />
        );
    }

    return (
        <Flex
            alignItems={"center"}
            gap={6}
            cursor={!hasPermission("shopfront_apis") && "not-allowed"}
        >
            <Flex gap={isVisible ? 4 : 2}>
                {Array.from(Array(Math.ceil(privateKey?.length / 4)).keys()).map(
                    (group) => (
                        <Flex
                            key={group}
                            gap={1}
                            mr={group < Math.floor(privateKey?.length / 4) ? 4 : 0}
                        >
                            {privateKey
                                ?.slice(group * 4, (group + 1) * 4)
                                .split("")
                                .map((chars, index) => (
                                    <Box key={index}>
                                        {isVisible ? (
                                            <AppTypography
                                                color="neutral.white"
                                                fontSize={16}
                                                fontWeight={500}
                                            >
                                                {chars}
                                            </AppTypography>
                                        ) : (
                                            <AppIcons.Asterisk
                                                style={{ width: "10.67px", height: "10.67px" }}
                                                stroke={hasPrivateKeyPermission ? "#7B7B7B" : "#4F4F4F"}
                                            />
                                        )}
                                    </Box>
                                ))}
                        </Flex>
                    )
                )}
            </Flex>
            <Box
                onClick={handleVisibility}
                cursor={hasPermission("shopfront_apis") && "pointer"}
            >
                {isVisible ? (
                    <AppIcons.Eye
                        style={{ width: "24px", height: "24px" }}
                        stroke="#fff"
                    />
                ) : (
                    <AppIcons.HidedIcon
                        style={{ width: "24px", height: "24px" }}
                        stroke={hasPrivateKeyPermission ? "#7B7B7B" : "#4F4F4F"}
                    />
                )}
            </Box>
        </Flex>
    );
}
