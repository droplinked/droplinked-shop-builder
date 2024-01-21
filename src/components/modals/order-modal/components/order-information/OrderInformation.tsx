import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import ClipboardText from "components/common/clipboardText/ClipboardText";
import AppTypography from 'components/common/typography/AppTypography';
import orderModalContext from "components/modals/order-modal/context";
import React, { useContext } from "react";

const OrderInformation = () => {
    const { order } = useContext(orderModalContext)
    const information = [
        { label: "Status", value: "Delivered", style: { color: "#2BCFA1" } },
        { label: "Order ID", value: "46321" },
        { label: "POD ID", value: "e0327b0924cf37" },
        { label: "Transaction ID", value: "sdfl416sd4f6254sdf64asdf54d6sfa", style: { color: "#33A9EC", cursor: "pointer" } },
        { label: "Deploy Hash", value: "wjkenscdfo837ubkenscwjkenscdfo837ubkenscwjkenscdfo837ubkensc12ds", style: { color: "#33A9EC", cursor: "pointer" } },
    ]

    return (
        <Flex direction={"column"} gap={"16px"}>
            <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Order Information</AppTypography>
            <Flex direction={"column"} gap={"12px"} as="dl">
                {information.map((row, index) =>
                    <Flex key={index} justifyContent="space-between" alignItems={"center"}>
                        <Flex alignItems={"start"}>
                            <AppTypography flexShrink={0} width={"200px"} fontSize={"14px"} color={"#C2C2C2"} as="dt">{row.label}</AppTypography>
                            <AppTypography
                                fontSize={"14px"}
                                fontWeight={500}
                                color={row.style?.color || "#FFFFFF"}
                                cursor={row.style?.cursor || "auto"}
                                as="dd"
                            >
                                {row.label !== "Deploy Hash" ? row.value : row.value.slice(0, 40) + "..."}
                            </AppTypography>
                        </Flex>
                        {row.label === 'Deploy Hash' && <ClipboardText text={row.value} />}
                    </Flex>
                )}
            </Flex>
            <Flex alignItems={"center"} gap={"8px"}>
                <AppIcons.InfoIcon />
                <AppTypography color={"#C2C2C2"}>To track the transaction status, click on your transaction ID.</AppTypography>
            </Flex>
        </Flex>
    );
};
export default OrderInformation;