import { Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import { currencyConvertion } from "lib/utils/helpers/currencyConvertion";
import React from "react";
import { IShopCurrency } from "types/interface/shopCurrency.interface";

namespace OrderDetailsModel {
    function formattedPrice(price: number, currency: IShopCurrency) {
        return <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
            {`${currency?.symbol}${currencyConvertion(price, currency?.conversionRateToUSD, false)}`}{" "}
            <span style={{ color: "#808080" }}>{currency?.abbreviation}</span>
        </AppTypography>
    }

    export const getOrderDetails = (order: any, currency: IShopCurrency) => {
        const detailsMap = {
            shippings: {
                order: 1,
                title: "Shipping",
                rows: order?.shippings?.
                    filter(shipping => shipping.title !== "Total")
                    .map(item => ({ label: item.title, value: formattedPrice(item.value, currency) }))
            },
            tax: {
                order: 2,
                title: "Tax",
                rows: [
                    { label: "Shop", value: formattedPrice(order?.tax?.shop || 0, currency) },
                    { label: "Droplinked", value: formattedPrice(order?.tax?.droplinked || 0, currency) },
                    { label: "Total Tax", value: formattedPrice(order?.tax?.total || 0, currency) },
                ]
            },
            giftCard: {
                order: 3,
                title: "Gift Card",
                rows: [
                    { label: "Applied Gift Cart / Discount", value: formattedPrice(order?.giftCard?.amount || 0, currency) },
                    { label: "Applied Ruleset", value: formattedPrice(order?.giftCard?.ruleset || 0, currency) },
                    { label: "Total Net Profit After Discount", value: formattedPrice(order?.giftCard?.netProfit || 0, currency) },
                    { label: "Credit", value: formattedPrice(order?.giftCard?.credit || 0, currency) },
                ]
            },
            affiliates: {
                order: 4,
                title: "Affiliate",
                rows: [
                    { label: "Total Affiliated Products", value: formattedPrice(order?.affiliates?.[0].total || 0, currency) },
                    { label: "Publisher Profit", value: formattedPrice(order?.affiliates?.[0].publisherProfit || 0, currency) },
                    { label: "Publisher", value: <AppTypography fontSize={"14px"} color={"#FFFFFF"}>{order?.affiliates?.[0].publisher}</AppTypography> },
                    {
                        label: "Publisher Wallet",
                        value: <AppTypography fontSize={"14px"} color={"#FFFFFF"}>{order?.affiliates?.[0].publisherWallet}</AppTypography>
                    },
                ]
            },
            commision: {
                order: 5,
                title: "Commission",
                rows: [
                    { label: "Droplinked Commission", value: formattedPrice(order?.commision?.droplinked || 0, currency) },
                    { label: "Stripe Commission", value: formattedPrice(order?.commision?.stripe || 0, currency) },
                ]
            },
            details: {
                order: 6,
                title: "Payment Detail",
                rows: [
                    { label: "Total Products", value: formattedPrice(order?.details?.products || 0, currency) },
                    { label: "Total Shipping", value: formattedPrice(order?.details?.shipping || 0, currency) },
                    { label: "Total Tax", value: formattedPrice(order?.details?.tax || 0, currency) },
                    { label: "Total Cart", value: formattedPrice(order?.details?.cart || 0, currency) },
                    { label: "Total Cost", value: formattedPrice(order?.details?.cost || 0, currency) },
                    { label: "Net Profit", value: formattedPrice(order?.details?.profit || 0, currency) },
                    {
                        label: "Paid with",
                        value:
                            <Flex alignItems={"center"} gap={"5px"}>
                                <BlockchainDisplay show="icon" blockchain={order?.details?.paidWith} props={{ width: "20px", height: "20px" }} />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
                                    {order?.details?.paidWith && <BlockchainDisplay show="name" blockchain={order?.details?.paidWith} />}{" "}
                                    payment
                                </AppTypography>
                            </Flex>
                    }
                ]
            },
        }

        return Object.keys(order || {}).filter(section => detailsMap[section])
            .map(key => {
                const targetSection = detailsMap[key]
                return {
                    order: targetSection?.order,
                    title: targetSection?.title,
                    rows: targetSection?.rows
                }
            })
            .sort((a, b) => a.order - b.order)
    };

}

export default OrderDetailsModel