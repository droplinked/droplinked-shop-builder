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
        const detailsMap: Record<string, { title: title, rows: { label: string, value: React.ReactNode }[] }[]> = {
            "PRODUCER": [
                {
                    title: "Shipping",
                    rows: order?.shippings?.map(item => ({ label: item.title, value: formattedPrice(item.value) }))
                },
                {
                    title: "Tax",
                    rows: [
                        { label: "Shop", value: formattedPrice(order?.tax?.shop ? order.tax.shop : 0) },
                        { label: "Droplinked", value: formattedPrice(order?.tax?.droplinked ? order.tax.droplinked : 0) },
                        { label: "Total Tax", value: formattedPrice(order?.tax?.total ? order.tax.total : 0) },
                    ]
                },
                {
                    title: "Gift Card",
                    rows: [
                        { label: "Applied Gift Cart / Discount", value: formattedPrice(order?.giftCard?.amount ? order.giftCard.amount : 0) },
                        { label: "Applied Ruleset", value: formattedPrice(order?.giftCard?.ruleset ? order.giftCard.ruleset : 0) },
                        { label: "Total Net Profit After Discount", value: formattedPrice(order?.giftCard?.netProfit ? order.giftCard.netProfit : 0) },
                        { label: "Credit", value: formattedPrice(order?.giftCard?.credit ? order.giftCard.credit : 0) },
                    ]
                },
                // {
                //     title: "Affiliate",
                //     rows: [
                //         { label: "Total Affiliated Products", value: formattedPrice(165) },
                //         { label: "Publisher Profit", value: formattedPrice(180) },
                //         {
                //             label: "Publisher",
                //             value: <Link href='https://www.droplinked.com' fontSize={"14px"} color={"#33A9EC"}>Behdad Mansouri Shop</Link>
                //         },
                //         {
                //             label: "Publisher Wallet",
                //             value: <AppTypography fontSize={"14px"} color={"#FFFFFF"} >e0327b0924cf37</AppTypography>
                //         },
                //     ]
                // },
                {
                    title: "Commission",
                    rows: [
                        { label: "Droplinked Commission", value: formattedPrice(order?.commision?.droplinked ? order.commision.droplinked : 0) },
                        { label: "Stripe Commission", value: formattedPrice(order?.commision?.stripe ? order.commision.stripe : 0) },
                    ]
                },
                {
                    title: "Payment Detail",
                    rows: [
                        { label: "Total Products", value: formattedPrice(order?.details?.products ? order.details.products : 0) },
                        { label: "Total Shipping", value: formattedPrice(order?.details?.shipping ? order.details.shipping : 0) },
                        { label: "Total Tax", value: formattedPrice(order?.details?.tax ? order.details.tax : 0) },
                        { label: "Total Cart", value: formattedPrice(order?.details?.cart ? order.details.cart : 0) },
                        { label: "Total Cost", value: formattedPrice(order?.details?.cost ? order.details.cost : 0) },
                        { label: "Net Profit", value: formattedPrice(order?.details?.profit ? order.details.profit : 0) },
                        {
                            label: "Paid with",
                            value: <Flex alignItems={"center"} gap={"5px"}>
                                <BlockchainDisplay show="icon" blockchain={order?.details?.paidWith} props={{ width: "16px", height: "16px" }} />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>{`${order?.details?.paidWith} payment`}</AppTypography>
                            </Flex>
                        }
                    ]
                }
            ],
            "PUBLISHER": [
                {
                    title: "Payment Detail",
                    rows: [
                        { label: "Total Products", value: formattedPrice(order?.details?.products ? order.details.products : 0) },
                        { label: "Total Profit", value: formattedPrice(order?.details?.profit ? order.details.profit : 0) },
                        {
                            label: "Paid with",
                            value: <Flex alignItems={"center"} gap={"5px"}>
                                <BlockchainDisplay show="icon" blockchain={order?.details?.paidWith} props={{ width: "16px", height: "16px" }} />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>{`${order?.details?.paidWith} payment`}</AppTypography>
                            </Flex>
                        }
                    ]
                }
            ]
        };

        return detailsMap[order?.type]
    }
}

export default OrderDetailsModel