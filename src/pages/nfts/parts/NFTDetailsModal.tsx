import { Box, Flex, Link } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppModal from 'components/common/modal/AppModal'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import NFTDetailsModalSkeleton from './NFTDetailsModalSkeleton'

interface Props {
    open: boolean
    close: Function
}

function NFTDetailsModal({ open, close }: Props) {
    const isLoading = false
    const nftAttributes = [
        { label: "NFT Name:", value: "Poker Face Monkey" },
        { label: "Creator:", value: "0x3D2861029B27EbBE96E4FDC4BDef03fBf1d9F9D5" },
        { label: "Network:", value: "MetaMask" },
    ]
    return <AppModal
        open={open}
        close={close}
        size={"2xl"}
        contentProps={{
            padding: "36px",
            maxWidth: "95%",
            width: "900px",
        }}
    >
        {isLoading ? <NFTDetailsModalSkeleton /> :
            <Flex alignItems={"flex-start"} gap={"36px"}>
                <AppImage objectFit={"cover"} width={"250px"} height={"250px"} borderRadius={"8px"} />
                <Flex gap={"36px"} flexDirection={"column"}>
                    <Flex gap={"24px"} flexDirection={"column"}>
                        <AppTypography fontSize={"16px"} color={"#FFFFFF"}>NFT Information</AppTypography>
                        <Flex flexDirection={"column"} gap={"16px"} as={"dl"}>
                            {nftAttributes.map((el, index) => <Flex key={index} alignItems={"center"}>
                                <AppTypography width={"150px"} fontSize={"14px"} color={"#C2C2C2"} as={"dt"}>{el.label}</AppTypography>
                                <AppTypography fontSize={"14px"} color={"#FFFFFF"} as={"dd"}>{el.value}</AppTypography>
                            </Flex>)}
                        </Flex>
                    </Flex>
                    <Flex gap={"24px"} flexDirection={"column"}>
                        <AppTypography fontSize={"16px"} color={"#FFFFFF"}>Product Detail</AppTypography>
                        <Flex>
                            <AppTypography width={"150px"} fontSize={"14px"} color={"#C2C2C2"}>Product Address</AppTypography>
                            <Link
                                href='https://www.google.com'
                                textDecorationColor={"#33A9EC"}
                                textDecoration={"underline"}
                                color={"#33A9EC"}
                            >
                                https://trello.com/b/iPcNVjUi/droplinked
                            </Link>
                        </Flex>
                        <AppTable rows={[{
                            color: {
                                value: <Flex alignItems={"center"} gap={"8px"}>
                                    <Box
                                        backgroundColor={"red"}
                                        width="20px"
                                        height="20px"
                                        borderRadius="100%">
                                    </Box>
                                    Red
                                </Flex>,
                                caption: "Color"
                            },
                            size: { value: "Small", caption: "Size" },
                            quantity: { value: 1, caption: "Quantity" },
                            price: { value: "$231.21", caption: "Price" },
                        }]} />
                    </Flex>
                </Flex>
            </Flex>}
    </AppModal>
}

export default NFTDetailsModal