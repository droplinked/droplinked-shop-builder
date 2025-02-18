import React from "react";
import ContainerCard from "../../ContainerCard";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import SKURow from "../../SKURow";

export default function InformationTab({ item }: { item: ICombinedNft }) {
    const { getFormattedPrice } = useCurrencyConverter();
    const { name, description, quantity, ownerAddress, tokenAddress, tokenId, price, chain, productAddress, sku } = item ?? {};
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
                content: <AppTypography
                    color={"#fff"}
                    fontSize={14}
                    dangerouslySetInnerHTML={{ __html: description }}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                />,
            }
        },
        {
            title: "Quantity",
            content: quantity,
        },
        {
            ...tokenAddress && {
                title: "Token Address",
                content: <AppTypography
                    color={"#fff"}
                    fontSize={14}
                    flex={1}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {tokenAddress}
                </AppTypography>,
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
            ...ownerAddress && {
                title: "Owner Address",
                content: <AppTypography
                    color={"#fff"}
                    fontSize={14}
                    flex={1}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {ownerAddress}
                </AppTypography>,
            }
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
            {productAddress && sku &&
                <ContainerCard title="Product Details" items={productDetails}>
                    {sku.map((item, index) => {
                        return (
                            <SKURow key={item._id} item={item} />
                        )
                    })}
                </ContainerCard>
            }
        </Flex>
    );
}
