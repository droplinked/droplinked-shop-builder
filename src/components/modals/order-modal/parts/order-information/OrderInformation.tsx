import { Flex, Link } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from 'components/common/typography/AppTypography';
import React, { useContext } from "react";
import orderModalContext from "../context";
import OrderInformationModel from "./model";

const OrderInformation = () => {
    const { order } = useContext(orderModalContext)
    const information = [
        { label: "Status", value: order?.orderInformation?.status, style: { color: OrderInformationModel.getOrderStatusColor(order?.orderInformation?.status) } },
        { label: "Order ID", value: order?.orderInformation?.orderId },
        { label: "Transaction ID", value: order?.orderInformation?.transactionId, style: { color: "#33A9EC", cursor: "pointer" } },
    ]

    return (
        <Flex direction={"column"} gap={"16px"}>
            <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Order Information</AppTypography>
            <Flex direction={"column"} gap={"12px"} as="dl">
                {information.filter(row => row.value).map((row, index) =>
                    <Flex key={index} alignItems={"center"}>
                        <AppTypography flexShrink={0} width={"200px"} fontSize={"14px"} color={"#C2C2C2"} as="dt">{row.label}</AppTypography>
                        <AppTypography
                            fontSize={"14px"}
                            fontWeight={500}
                            color={row.style?.color || "#FFFFFF"}
                            cursor={row.style?.cursor || "auto"}
                            as="dd"
                        >
                            {
                                row.label !== "Transaction ID" ?
                                    row.value
                                    :
                                    <Link
                                        href={OrderInformationModel.getTransactionLink(order)}
                                        target={"_blank"}
                                        textDecoration={"underline"}
                                        isExternal
                                    >
                                        {row.value.slice(0, 40) + "..."}
                                    </Link>
                            }
                        </AppTypography>
                    </Flex>
                )}
            </Flex>
            {order?.transactionId && <Flex alignItems={"center"} gap={"8px"}>
                <AppIcons.InfoIcon />
                <AppTypography color={"#C2C2C2"}>To track the transaction status, click on your transaction ID.</AppTypography>
            </Flex>}
        </Flex>
    );
};
export default OrderInformation;