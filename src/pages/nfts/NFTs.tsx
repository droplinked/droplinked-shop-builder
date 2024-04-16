import { Box, Checkbox, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppCard from 'components/common/card/AppCard'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import NFTDetailsModal from './parts/NFTDetailsModal'

function NFTs() {
    const [pageData, setPageData] = useState({ searchTerm: "", myProducts: false, selectedWallet: null, selectedNFT: null })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isLoading = false;
    const nfts = Array.from({ length: 8 }).map(() => ({
        image: faker.image.avatar(),
        title: faker.lorem.sentence(5)
    }))

    const selectOptions = [
        { caption: "All", value: "all" },
        { caption: "My NFTs", value: "myNFTs" },
        { caption: "My Products", value: "myProducts" }
    ]

    const updatePageData = <K extends keyof typeof pageData>(key: K, value: typeof pageData[K]) =>
        setPageData({ ...pageData, [key]: value })

    const generateSkeletons = () => Array.from({ length: 6 }).map((_, key) =>
        <AppSkeleton key={key} width={"196px"} height={"241px"} isLoaded={false}>{" "}</AppSkeleton>
    )

    return (
        <>
            <AppCard>
                <VStack align={"stretch"} spacing={"24px"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <SearchDatagrid
                            value={pageData.searchTerm}
                            onChange={e => updatePageData("searchTerm", e.target.value)}
                        />
                        <Flex alignItems={"center"} gap={"36px"}>
                            <AppSelectBox name={"NFT"} items={selectOptions} onChange={e => updatePageData("selectedWallet", e.target.value)} />
                            <Checkbox
                                size='md'
                                alignItems="center"
                                colorScheme='green'
                                checked={pageData.myProducts}
                                onChange={e => updatePageData("myProducts", e.target.checked)} >
                                <AppTypography color="#C2C2C2" whiteSpace={"nowrap"}>My Products</AppTypography>
                            </Checkbox>
                        </Flex>
                    </Flex>
                    <Flex gap={"16px"} flexWrap={"wrap"}>
                        {isLoading ? generateSkeletons()
                            :
                            nfts.map((nft, index) => (
                                <Box
                                    key={index}
                                    width={"196px"}
                                    borderRadius={"8px"}
                                    overflow={"hidden"}
                                    backgroundColor={"#262626"}
                                    cursor={"pointer"}
                                    onClick={() => {
                                        updatePageData("selectedNFT", nft)
                                        onOpen()
                                    }}
                                >
                                    <AppImage src={nft.image} objectFit={"cover"} width={"196px"} height={"196px"} />
                                    <Box padding={"12px 16px"}>
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