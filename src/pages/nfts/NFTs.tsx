import { Box, Checkbox, Flex, Select, useDisclosure, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import NFTDetailsModal from './parts/NFTDetailsModal'

function NFTs() {
    const [searchTerm, setSearchTerm] = useState("")
    const [myProducts, setMyProducts] = useState(false)
    const [selectedNFT, setSelectedNFT] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isLoading = false;
    const nfts = [
        { image: "./Image Placeholder.png", title: "Distant Galaxy" },
        { image: "./Image Placeholder2.png", title: "Distant Galaxy" },
        { image: "./Image Placeholder (1).png", title: "Distant Galaxy" },
        { image: "./Image Placeholder4.png", title: "Distant Galaxy" },
        { image: "./Image Placeholder.png", title: "Distant Galaxy" },
        { image: "./Image Placeholder2.png", title: "Distant Galaxy" },
        { image: "./Image Placeholder (1).png", title: "Distant Galaxy" },
        { image: "./Image Placeholder4.png", title: "Distant Galaxy" },
    ]

    const selectOptions = [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ]

    const generateSkeletons = () => Array.from({ length: 6 }).map((_, key) =>
        <AppSkeleton key={key} width={"196px"} height={"241px"} isLoaded={false}>{" "}</AppSkeleton>)

    return (
        <>
            <AppCard>
                <VStack align={"stretch"} spacing={"24px"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <SearchDatagrid onChange={(e) => setSearchTerm(e.currentTarget.value)} value={searchTerm} />
                        <Flex alignItems={"center"} gap={"36px"}>
                            <Checkbox
                                size='md'
                                alignItems="center"
                                colorScheme='green'
                                checked={myProducts}
                                onChange={e => setMyProducts(e.currentTarget.checked)} >
                                <AppTypography fontSize="12px" color="#C2C2C2">My Products</AppTypography>
                            </Checkbox>
                        </Flex>
                    </Flex>
                    <Flex gap={"16px"} flexWrap={"wrap"}>
                        {isLoading ? generateSkeletons()
                            :
                            nfts.map((nft, index) => (
                                <Box
                                    key={index}
                                    borderRadius={"8px"}
                                    overflow={"hidden"}
                                    backgroundColor={"#262626"}
                                    cursor={"pointer"}
                                    onClick={() => {
                                        setSelectedNFT(nft)
                                        onOpen()
                                    }}
                                >
                                    <AppImage src={nft.image} width={"196px"} height={"196px"} />
                                    <Box paddingBlock={"12px"} paddingInline={"16px"}>
                                        <AppTypography fontSize={"14px"} fontWeight={"600"}>{nft.title}</AppTypography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Flex>
                </VStack>
            </AppCard >
            {isOpen && <NFTDetailsModal open={isOpen} close={onClose} />}
        </>

    )
}

export default NFTs