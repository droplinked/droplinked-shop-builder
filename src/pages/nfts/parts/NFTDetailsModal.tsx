import { Box, Flex, Link } from '@chakra-ui/react'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppImage from 'components/common/image/AppImage'
import AppModal from 'components/common/modal/AppModal'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'
import React from 'react'

interface Props {
    open: boolean
    close: () => void
    nft: any
}

function NFTDetailsModal({ open, close, nft }: Props) {
    const { shop: { currency } } = useAppStore();
    const nftAttributes = [
        { label: "NFT Name", value: nft.name },
        { label: "Creator", value: nft.creator?.email },
        { label: "Network", value: !nft.network || nft.network === "NONE" ? undefined : nft.network }
    ]

    let tableColumns: any = {
        quantity: { value: nft.productQuantity, caption: "Quantity" },
        price: { value: `${currency?.symbol}${currencyConvertion(nft.productPrice, currency?.conversionRateToUSD, false)} ${currency?.abbreviation}`, caption: "Price" },
    }
    if (nft.productSize && nft.productSize !== "not found")
        tableColumns.size = { value: nft.productSize, caption: "Size" }

    if (nft.productColor && nft.productColor !== "not found")
        tableColumns.color = {
            value: <Flex alignItems={"center"} gap={"8px"}>
                <Box
                    backgroundColor={nft.productColor}
                    width="20px"
                    height="20px"
                    borderRadius="100%">
                </Box>
            </Flex>,
            caption: "Color"
        }

    return <AppModal
        open={open}
        close={close}
        contentProps={{ padding: "36px", maxWidth: "95%", width: "900px" }}
    >
        <Flex alignItems={"flex-start"} gap={"36px"}>
            <AppImage src={nft.image} objectFit={"cover"} width={"250px"} height={"250px"} borderRadius={"8px"} />
            <Flex gap={"36px"} flexDirection={"column"}>
                <Flex gap={"24px"} flexDirection={"column"}>
                    <AppTypography fontSize={"16px"} color={"#fff"}>NFT Information</AppTypography>
                    <Flex flexDirection={"column"} gap={"16px"}>
                        {
                            nftAttributes.filter(attr => attr.value).map((attr, index) =>
                                <Flex key={index} alignItems={"center"}>
                                    <AppTypography width={"150px"} fontSize={"14px"} color={"#C2C2C2"}>{attr.label}</AppTypography>
                                    {
                                        attr.label === "Network" ?
                                            <Flex alignItems={"center"} gap={2}>
                                                <BlockchainDisplay show='icon' props={{ width: "20px", height: "20px" }} blockchain={attr.value} />
                                                <AppTypography fontSize={"14px"} color={"#fff"}>{attr.value}</AppTypography>
                                            </Flex> :
                                            <AppTypography fontSize={"14px"} color={"#fff"}>{attr.value}</AppTypography>
                                    }
                                </Flex>
                            )
                        }
                    </Flex>
                </Flex>
                <Flex gap={"24px"} flexDirection={"column"}>
                    <AppTypography fontSize={"16px"} color={"#fff"}>Product Detail</AppTypography>

                    {
                        nft.productAddress &&
                        <Flex>
                            <AppTypography width={"150px"} fontSize={"14px"} color={"#C2C2C2"}>Product Address</AppTypography>
                            <Link
                                href={nft.productAddress}
                                target={"_blank"}
                                textDecoration={"underline"}
                                textDecorationColor={"#33A9EC"}
                                color={"#33A9EC"}
                            >
                                {nft.productAddress}
                            </Link>
                        </Flex>
                    }

                    <AppTable rows={[tableColumns]} />
                </Flex>
            </Flex>
        </Flex>
    </AppModal>
}

export default NFTDetailsModal