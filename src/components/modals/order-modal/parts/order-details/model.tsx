import { Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

namespace OrderDetailsModel {
    type title = "Shipping" | "Tax" | "Gift Card" | "Affiliate" | "Commission" | "Payment Detail"

    function formattedPrice(price: number) {
        return <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
            {`$${price.toFixed(2)}`}{" "}
            <span style={{ color: "#808080" }}>USD</span>
        </AppTypography>
    }

    export const getOrderDetails = (order: any) => {
        const detailsMap: { title: title, renderCondition?: boolean, rows: { label: string, value: React.ReactNode }[] }[] = [
            {
                title: "Shipping",
                renderCondition: !!order?.shippings,
                rows: order?.shippings?.map(item => ({ label: item.title, value: formattedPrice(item.value) })) || []
            },
            {
                title: "Tax",
                renderCondition: !!order?.tax?.total,
                rows: [
                    { label: "Shop", value: formattedPrice(order?.tax?.shop || 0) },
                    { label: "Droplinked", value: formattedPrice(order?.tax?.droplinked || 0) },
                    { label: "Total Tax", value: formattedPrice(order?.tax?.total || 0) },
                ]
            },
            {
                title: "Gift Card",
                renderCondition: !!order?.giftCard?.amount,
                rows: [
                    { label: "Applied Gift Cart / Discount", value: formattedPrice(order?.giftCard?.amount || 0) },
                    { label: "Applied Ruleset", value: formattedPrice(order?.giftCard?.ruleset || 0) },
                    { label: "Total Net Profit After Discount", value: formattedPrice(order?.giftCard?.netProfit || 0) },
                    { label: "Credit", value: formattedPrice(order?.giftCard?.credit || 0) },
                ]
            },
            {
                title: "Affiliate",
                renderCondition: !!order?.affiliates,
                rows: [
                    { label: "Total Affiliated Products", value: formattedPrice(order?.affiliates?.[0].total || 0) },
                    { label: "Publisher Profit", value: formattedPrice(order?.affiliates?.[0].publisherProfit || 0) },
                    { label: "Publisher", value: <AppTypography fontSize={"14px"} color={"#FFFFFF"}>{order?.affiliates?.[0].publisher}</AppTypography> },
                    {
                        label: "Publisher Wallet",
                        value: <AppTypography fontSize={"14px"} color={"#FFFFFF"}>{order?.affiliates?.[0].publisherWallet}</AppTypography>
                    },
                ]
            },
            {
                title: "Commission",
                rows: [
                    { label: "Droplinked Commission", value: formattedPrice(order?.commision?.droplinked || 0) },
                    { label: "Stripe Commission", value: formattedPrice(order?.commision?.stripe || 0) },
                ]
            },
            {
                title: "Payment Detail",
                rows: [
                    { label: "Total Products", value: formattedPrice(order?.details?.products || 0) },
                    { label: "Total Shipping", value: formattedPrice(order?.details?.shipping || 0) },
                    { label: "Total Tax", value: formattedPrice(order?.details?.tax || 0) },
                    { label: "Total Cart", value: formattedPrice(order?.details?.cart || 0) },
                    { label: "Total Cost", value: formattedPrice(order?.details?.cost || 0) },
                    { label: "Net Profit", value: formattedPrice(order?.details?.profit || 0) },
                    {
                        label: "Paid with",
                        value: <Flex alignItems={"center"} gap={"5px"}>
                            <BlockchainDisplay show="icon" blockchain={order?.details?.paidWith} props={{ width: "20px", height: "20px" }} />
                            <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
                                {order?.details?.paidWith && <BlockchainDisplay show="name" blockchain={order?.details?.paidWith} />}{" "}
                                payment
                            </AppTypography>
                        </Flex>
                    }
                ]
            },
        ]

        return detailsMap
    };

}

export default OrderDetailsModel