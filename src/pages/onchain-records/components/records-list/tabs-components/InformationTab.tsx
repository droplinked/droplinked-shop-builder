import React from "react";
import ContainerCard from "../../ContainerCard";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import ExternalLink from "components/redesign/external-link/ExternalLink";

export default function InformationTab() {
    const { getFormattedPrice } = useCurrencyConverter();
    const informationData = [
        {
            title: "Name",
            content: "Poker Face Monkey",
        },
        {
            title: "Description",
            content: "This is a description",
        },
        {
            title: "Quantity",
            content: "12",
        },
        {
            title: "Creator",
            content: "0x1234567890",
        },
        {
            title: "Deploy Hash",
            content: "0x1234567890",
        },
        {
            title: "NFT Address",
            content: "0x1234567890",
        },
        {
            title: "Token ID",
            content: "0x1234567890",
        },
        {
            title: "Price",
            content: getFormattedPrice({ amount: 20, toFixed: true }),
        },
        {
            title: "Network",
            content: (
                <Flex gap={2} alignItems="center">
                    <AppIcons.ETHOutlined color="#6782EB" />
                    <AppTypography color={"#fff"} fontSize={14}>
                        Ethereum
                    </AppTypography>
                </Flex>
            ),
        },
        {
            title: "Wallet",
            content: "0x1234567890",
        },
    ];

    const productDetails = [
        {
            title: "Address",
            content: (
                <ExternalLink
                    fontSize={14}
                    fontWeight={500}
                    href="https://droplinked.io/bedi"
                    hasArrow={true}
                >
                    https://droplinked.io/bedi/pr...
                </ExternalLink>
            ),
        },
    ];

    return (
        <Flex flexDirection={"column"} gap={4}>
            <ContainerCard title="Information" items={informationData} />
            <ContainerCard title="Product Details" items={productDetails} />
        </Flex>
    );
}
