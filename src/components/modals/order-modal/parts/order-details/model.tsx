import { Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import { PriceConversionParams } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";

interface ICurrencyConverter {
    convertPrice: (params: PriceConversionParams) => void,
    getFormattedPrice: (params: PriceConversionParams) => void
    abbreviation: string,
    symbol: string
}

namespace OrderDetailsModel {
    function formattedPrice(price: number, currencyConverter: ICurrencyConverter) {
        const { abbreviation, convertPrice, symbol } = currencyConverter;

        return <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
            {`${symbol}${convertPrice({ amount: price, toFixed: true })}`}{" "}
            <span style={{ color: "#808080" }}>{abbreviation}</span>
        </AppTypography>
    }

    export const getOrderDetails = (order: any, currencyConverter: ICurrencyConverter) => {
        const detailsMap = {
            shippings: {
                order: 1,
                title: "Shipping",
                rows: order?.shippings?.
                    filter(shipping => shipping.title !== "Total")
                    .map(item => ({ label: item.title, value: formattedPrice(item.value, currencyConverter) }))
            },
            tax: {
                order: 2,
                title: "Tax",
                rows: [
                    { label: "Shop", value: formattedPrice(order?.tax?.shop || 0, currencyConverter) },
                    { label: "Droplinked", value: formattedPrice(order?.tax?.droplinked || 0, currencyConverter) },
                    { label: "Total Tax", value: formattedPrice(order?.tax?.total || 0, currencyConverter) },
                ]
            },
            giftCard: {
                order: 3,
                title: "Gift Card",
                rows: [
                    { label: "Applied Gift Cart / Discount", value: formattedPrice(order?.giftCard?.amount || 0, currencyConverter) },
                    { label: "Applied Ruleset", value: formattedPrice(order?.giftCard?.ruleset || 0, currencyConverter) },
                    { label: "Total Net Profit After Discount", value: formattedPrice(order?.giftCard?.netProfit || 0, currencyConverter) },
                    { label: "Credit", value: formattedPrice(order?.giftCard?.credit || 0, currencyConverter) },
                ]
            },
            affiliates: {
                order: 4,
                title: "Affiliate",
                rows: [
                    { label: "Total Affiliated Products", value: formattedPrice(order?.affiliates?.[0].total || 0, currencyConverter) },
                    { label: "Publisher Profit", value: formattedPrice(order?.affiliates?.[0].publisherProfit || 0, currencyConverter) },
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
                    { label: "Droplinked Commission", value: formattedPrice(order?.commision?.droplinked || 0, currencyConverter) },
                    { label: "Stripe Commission", value: formattedPrice(order?.commision?.stripe || 0, currencyConverter) },
                ]
            },
            details: {
                order: 6,
                title: "Payment Detail",
                rows: [
                    { label: "Total Products", value: formattedPrice(order?.details?.products || 0, currencyConverter) },
                    { label: "Total Shipping", value: formattedPrice(order?.details?.shipping || 0, currencyConverter) },
                    { label: "Total Tax", value: formattedPrice(order?.details?.tax || 0, currencyConverter) },
                    { label: "Total Cart", value: formattedPrice(order?.details?.cart || 0, currencyConverter) },
                    { label: "Total Cost", value: formattedPrice(order?.details?.cost || 0, currencyConverter) },
                    { label: "Net Profit", value: formattedPrice(order?.details?.profit || 0, currencyConverter) },
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