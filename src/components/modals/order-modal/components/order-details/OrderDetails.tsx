import { Flex, Link } from '@chakra-ui/layout'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import orderModalContext from '../../context'

type title = "Shipping" | "Tax" | "Gift Card" | "Affiliate" | "Commission" | "Payment Detail"

export default function OrderDetails({ title }: { title: title }) {
    const { order } = useContext(orderModalContext)
    const DetailsMap: Record<title, { label: string, value: any }[]> = {
        "Shipping": [
            { label: "Service 1 (Droplinked’s share)", value: formattedPrice(123) },
            { label: "Service 2 (Producer’s share)", value: formattedPrice(32) },
            { label: "Printfull (Droplinked’s share)", value: formattedPrice(32) },
            { label: "Printfull (Droplinked’s share)", value: formattedPrice(32) },
            { label: "Total Shipping", value: formattedPrice(32) },
        ],
        "Tax": [
            { label: "Shop", value: formattedPrice(165) },
            { label: "Droplinked", value: formattedPrice(180) },
            { label: "Total Tax", value: formattedPrice(20) },
        ],
        "Gift Card": [
            { label: "Applied Gift Cart / Discount", value: formattedPrice(165) },
            { label: "Applied Ruleset", value: formattedPrice(180) },
            { label: "Total Net Profit After Discount", value: formattedPrice(20) },
            { label: "Credit", value: formattedPrice(20) },
        ],
        "Affiliate": [
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
        ],
        "Commission": [
            { label: "Droplinked Commission", value: formattedPrice(20) },
            { label: "Stripe Commission", value: formattedPrice(20) },
        ],
        "Payment Detail": [
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
            },
        ],
    };
    const rows = DetailsMap[title]

    return (
        <Flex direction={"column"} gap={"16px"}>
            <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>{title}</AppTypography>
            <Flex direction={"column"} gap={"12px"}>
                {rows.map((row, index) =>
                    <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize={"14px"} color={"#C2C2C2"}>{row.label}</AppTypography>
                        {row.value}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

function formattedPrice(price: number) {
    return <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>
        {`$${price.toFixed(2)}`}{" "}
        <span style={{ color: "#808080" }}>USD</span>
    </AppTypography>
}
