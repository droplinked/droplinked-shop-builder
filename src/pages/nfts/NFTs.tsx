import { Box, Checkbox, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppCard from 'components/common/card/AppCard'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import NFTDetailsModal from './parts/NFTDetailsModal'

function NFTs() {
    const [pageData, setPageData] = useState({ searchTerm: "", myProducts: false, selectedNFT: null })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isLoading = false;
    const nfts = Array.from({ length: 8 }).map(() => ({
        image: faker.image.avatar,
        title: faker.lorem.sentence(5)
    }))

    const generateSkeletons = () => Array.from({ length: 6 }).map((_, key) =>
        <AppSkeleton key={key} width={"196px"} height={"241px"} isLoaded={false}>{" "}</AppSkeleton>)

    return (
        <>
            <AppCard>
                <VStack align={"stretch"} spacing={"24px"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <SearchDatagrid
                            value={pageData.searchTerm}
                            onChange={(e) => setPageData({ ...pageData, searchTerm: e.currentTarget.value })}
                        />
                        <Flex alignItems={"center"} gap={"36px"}>
                            <Checkbox
                                size='md'
                                alignItems="center"
                                colorScheme='green'
                                checked={pageData.myProducts}
                                onChange={e => setPageData({ ...pageData, myProducts: e.currentTarget.checked })} >
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
                                    width={"196px"}
                                    borderRadius={"8px"}
                                    overflow={"hidden"}
                                    backgroundColor={"#262626"}
                                    cursor={"pointer"}
                                    onClick={() => {
                                        setPageData({ ...pageData, selectedNFT: nft })
                                        onOpen()
                                    }}
                                >
                                    <AppImage src={nft.image()} objectFit={"cover"} width={"196px"} height={"196px"} />
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