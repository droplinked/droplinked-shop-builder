import React from "react"
import ContainerCard from "../../ContainerCard"
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter"
import { Flex } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import ExternalLink from "components/redesign/external-link/ExternalLink"
import { ICombinedNft } from "pages/onchain-records/utils/interface"
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay"
import SKURow from "../../SKURow"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"

export default function InformationTab({ item }: { item: ICombinedNft }) {
    const { t } = useLocaleResources("onchainRecords")
    const { getFormattedPrice } = useCurrencyConverter()

    const { name, description, quantity, ownerAddress, tokenAddress, tokenId, price, chain, productAddress, sku } = item ?? {}

    const slicedText = (text: string) => {
        return text?.slice(0, 25) + (text?.length > 25 ? "..." : "")
    }

    const informationData = [
        {
            title: t("name"),
            content: slicedText(name),
        },
        {
            ...description && {
                title: t("description"),
                content: <AppTypography
                    color="#fff"
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
            title: t("quantity"),
            content: quantity,
        },
        {
            ...tokenAddress && {
                title: t("token_address"),
                content: <AppTypography
                    color="#fff"
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
                title: t("token_id"),
                content: slicedText(tokenId),
            }
        },
        {
            ...price && {
                title: t("price"),
                content: getFormattedPrice({ amount: price, toFixed: true }),
            }
        },
        {
            title: t("network"),
            content: (
                <Flex gap={2} alignItems="center">
                    <BlockchainDisplay blockchain={chain} show="icon" props={{ style: { width: "20px", height: "20px" } }} />
                    <AppTypography color="#fff" fontSize={14}>
                        <BlockchainDisplay blockchain={chain} show="name" />
                    </AppTypography>
                </Flex>
            ),
        },
        {
            ...ownerAddress && {
                title: t("owner_address"),
                content: <AppTypography
                    color="#fff"
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
    ]

    const productDetails = [
        {
            title: t("address"),
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
    ]

    return (
        <Flex flexDirection="column" gap={4}>
            <ContainerCard title={t("information")} items={informationData} />
            {productAddress && sku &&
                <ContainerCard title={t("product_details")} items={productDetails}>
                    {sku.map((item, index) => {
                        return (
                            !!item.options.length && <SKURow key={item._id} item={item} />
                        )
                    })}
                </ContainerCard>
            }
        </Flex>
    )
}
