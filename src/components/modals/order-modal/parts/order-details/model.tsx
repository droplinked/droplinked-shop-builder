import { Flex, Link } from "@chakra-ui/react";
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
            "Publisher": [
                {
                    title: "Shipping",
                    rows: [
                        { label: "Service 1 (Droplinked’s share)", value: formattedPrice(123) },
                        { label: "Service 2 (Producer’s share)", value: formattedPrice(32) },
                        { label: "Printfull (Droplinked’s share)", value: formattedPrice(32) },
                        { label: "Printfull (Droplinked’s share)", value: formattedPrice(32) },
                        { label: "Total Shipping", value: formattedPrice(32) },
                    ]
                },
                {
                    title: "Tax",
                    rows: [
                        { label: "Shop", value: formattedPrice(165) },
                        { label: "Droplinked", value: formattedPrice(180) },
                        { label: "Total Tax", value: formattedPrice(20) },
                    ]
                },
                {
                    title: "Gift Card",
                    rows: [
                        { label: "Applied Gift Cart / Discount", value: formattedPrice(165) },
                        { label: "Applied Ruleset", value: formattedPrice(180) },
                        { label: "Total Net Profit After Discount", value: formattedPrice(20) },
                        { label: "Credit", value: formattedPrice(20) },
                    ]
                },
                {
                    title: "Affiliate",
                    rows: [
                        { label: "Total Affiliated Products", value: formattedPrice(165) },
                        { label: "Publisher Profit", value: formattedPrice(180) },
                        {
                            label: "Publisher",
                            value: <Link href='https://www.droplinked.com' fontSize={"14px"} color={"#33A9EC"}>Behdad Mansouri Shop</Link>
                        },
                        {
                            label: "Publisher Wallet",
                            value: <AppTypography fontSize={"14px"} color={"#FFFFFF"} >e0327b0924cf37</AppTypography>
                        },
                    ]
                },
                {
                    title: "Commission",
                    rows: [
                        { label: "Droplinked Commission", value: formattedPrice(20) },
                        { label: "Stripe Commission", value: formattedPrice(20) },
                    ]
                },
                {
                    title: "Payment Detail",
                    rows: [
                        { label: "Total Products", value: formattedPrice(123) },
                        { label: "Total Shipping", value: formattedPrice(123) },
                        { label: "Total Tax", value: formattedPrice(123) },
                        { label: "Total Cart", value: formattedPrice(123) },
                        { label: "Total Cost", value: formattedPrice(123) },
                        { label: "Net Profit", value: formattedPrice(123) },
                        {
                            label: "Paid with",
                            value: <Flex alignItems={"center"} gap={"5px"}>
                                <BlockchainDisplay show="icon" blockchain="CASPER" props={{ width: "16px", height: "16px" }} />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>Casper payment</AppTypography>
                            </Flex>
                        }
                    ]
                }
            ],
            "Producer": [
                {
                    title: "Payment Detail",
                    rows: [
                        { label: "Total Products", value: formattedPrice(123) },
                        { label: "Net Profit", value: formattedPrice(123) },
                        {
                            label: "Paid with",
                            value: <Flex alignItems={"center"} gap={"5px"}>
                                <BlockchainDisplay show="icon" blockchain="CASPER" props={{ width: "16px", height: "16px" }} />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>Casper payment</AppTypography>
                            </Flex>
                        }
                    ]
                }
            ]
        };

        return detailsMap["Publisher"]
    }
}

export default OrderDetailsModel