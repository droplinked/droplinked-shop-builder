import { Flex, Link } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from "react"
import orderModalContext from "../context"
import OrderInformationModel from "./model"

type linkLabel = "Transaction ID" | "Tracking Link"

const OrderInformation = () => {
    const { order } = useContext(orderModalContext)

    const getOrderStatusColor = (status) => {
        return OrderInformationModel.getOrderStatusColor(status)
    }

    const renderLink = (label: linkLabel, value: string) => {
        const link = label === "Transaction ID" ? OrderInformationModel.getTransactionLink(order) : value
        return (
            <Link href={link} target="_blank" textDecoration="underline" isExternal>
                {label === "Transaction ID" ? value.slice(0, 40) + "..." : order.trackingInfo[0].trackings[0].name}
            </Link>
        )
    }

    const renderOrderDetails = () => {
        const information = [
            { label: "Status", value: order?.orderInformation?.status, style: { color: getOrderStatusColor(order?.orderInformation?.status) } },
            { label: "Order ID", value: order?.orderInformation?.orderId },
            { label: "Transaction ID", value: order?.orderInformation?.transactionId, style: { color: "#33A9EC", cursor: "pointer" } },
            { label: "Tracking Link", value: order?.trackingInfo?.[0]?.trackings[0]?.url, style: { color: "#33A9EC", cursor: "pointer" } },
            { label: order?.post_purchase_data_fetch?.title, value: order?.post_purchase_data_fetch?.data },
        ]

        return information.filter(row => row.value).map((row, index) => (
            <Flex key={index} alignItems="start">
                <AppTypography flexShrink={0} width="200px" fontSize="14px" color="#C2C2C2" as="dt">{row.label}</AppTypography>
                <AppTypography
                    fontSize="14px"
                    fontWeight={500}
                    color={row.style?.color || "#FFFFFF"}
                    cursor={row.style?.cursor || "auto"}
                    as="dd"
                >
                    {
                        ["Transaction ID", "Tracking Link"].includes(row.label) ?
                            renderLink(row.label, row.value) :
                            row.value
                    }
                </AppTypography>
            </Flex>
        ))
    }

    return (
        <Flex direction="column" gap="16px">
            <AppTypography fontSize="16px" fontWeight={500} color="#FFFFFF">Order Information</AppTypography>
            <Flex direction="column" gap="12px" as="dl">
                {renderOrderDetails()}
            </Flex>
            {order?.transactionId && (
                <Flex alignItems="center" gap="8px">
                    <AppIcons.InfoIcon />
                    <AppTypography color="#C2C2C2">To track the transaction status, click on your transaction ID.</AppTypography>
                </Flex>
            )}
        </Flex>
    )
}

export default OrderInformation
