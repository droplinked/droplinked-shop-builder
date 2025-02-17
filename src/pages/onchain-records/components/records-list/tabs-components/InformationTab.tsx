import React from "react";
import ContainerCard from "../../ContainerCard";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";

export default function InformationTab({ item }: { item: ICombinedNft }) {
    const { getFormattedPrice } = useCurrencyConverter();
    const { name, description, quantity, ownerAddress, tokenAddress, tokenId, price, chain, productAddress } = item ?? {};
    const slicedText = (text: string) => {
        return text?.slice(0, 25) + (text?.length > 25 ? "..." : "");
    }

    const informationData = [
        {
            title: "Name",
            content: name,
        },
        {
            ...description && {
                title: "Description",
                content: slicedText(description),
            }
        },
        {
            title: "Quantity",
            content: quantity,
        },
        {
            ...tokenAddress && {
                title: "Token Address",
                content: slicedText(tokenAddress),
            }
        },
        {
            ...tokenId && {
                title: "Token ID",
                content: tokenId,
            }
        },
        {
            ...price && {
                title: "Price",
                content: getFormattedPrice({ amount: price, toFixed: true }),
            }
        },
        {
            title: "Network",
            content: (
                <Flex gap={2} alignItems="center">
                    <BlockchainDisplay blockchain={chain} show="icon" props={{ style: { width: "20px", height: "20px" } }} />
                    <AppTypography color={"#fff"} fontSize={14}>
                        <BlockchainDisplay blockchain={chain} show="name" />
                    </AppTypography>
                </Flex>
            ),
        },
        {
            title: "Owner Address",
            content: slicedText(ownerAddress),
        },
    ];

    const productDetails = [
        {
            title: "Address",
            content: (
                <ExternalLink
                    fontSize={14}
                    fontWeight={500}
                    href={productAddress}
                    hasArrow={true}
                >
                    {slicedText(productAddress)}
                </ExternalLink>
            ),
        },
    ];

    return (
        <Flex flexDirection={"column"} gap={4}>
            <ContainerCard title="Information" items={informationData} />
            {productAddress && <ContainerCard title="Product Details" items={productDetails} />}
        </Flex>
    );
}
