import { Box, Checkbox, Flex, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import useHookStore from 'functions/hooks/store/useHookStore'
import useAppToast from 'functions/hooks/toast/useToast'
import { retrieveNFTs } from 'lib/apis/user/services'
import { appDevelopment } from 'lib/utils/app/variable'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import NFTDetailsModal from './parts/NFTDetailsModal'

function NFTs() {
    const { app: { user: { wallets } } } = useHookStore()
    const [pageData, setPageData] = useState({
        isLoading: false,
        searchTerm: "",
        myProducts: false,
        selectedChain: wallets ? wallets[0].type : null,
        nfts: [],
        selectedNFT: null
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showToast } = useAppToast()
    const selectItems = useMemo(() => wallets ? wallets.map(wallet => ({ caption: wallet.type, value: wallet.type })) : [], [wallets])
    const debouncedSearchTerm = useDebounce(pageData.searchTerm, 500)

    const updatePageData = <K extends keyof typeof pageData>(key: K, value: typeof pageData[K]) => {
        if (key === "searchTerm" && pageData.isLoading) return
        setPageData({ ...pageData, [key]: value })
    }

    const generateSkeletons = () => Array.from({ length: 6 }).map((_, key) =>
        <AppSkeleton key={key} width={"196px"} height={"241px"} isLoaded={false}>{" "}</AppSkeleton>
    )

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                if (!selectItems.length) return
                updatePageData("isLoading", true)
                const { selectedChain, myProducts } = pageData
                const chainData = wallets.find(w => w.type === selectedChain)
                const nfts = await retrieveNFTs({
                    myProducts,
                    search: debouncedSearchTerm,
                    body: { address: chainData?.address || "", chain: chainData?.type || "", network: appDevelopment ? "TESTNET" : "MAINNET" }
                })
                updatePageData("nfts", nfts.data.data)
            }
            catch (e) {
                showToast({ message: "Oops! Something went wrong.", type: "error" })
            }
            finally {
                updatePageData("isLoading", false)
            }
        })()
        return controller.abort()
    }, [pageData.selectedChain, pageData.myProducts, debouncedSearchTerm])

    if (!selectItems.length) return (
        <AppCard>
            <AppTypography width={"100%"} paddingBlock={3} textAlign={"center"} color={"#fff"} fontSize={"14px"}>
                Looks like you haven't connected a wallet yet!
                To get started, connect a wallet by clicking {" "}
                <Box as={"span"} color={"#33A9EC"} textDecoration={"underline"}>
                    <Link to={"/dashboard/settings/technical"}>here</Link>
                </Box>
            </AppTypography>
        </AppCard>
    )

    return (
        <>
            <AppCard>
                <VStack align={"stretch"} spacing={"24px"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <SearchDatagrid value={pageData.searchTerm} onChange={e => updatePageData("searchTerm", e.target.value)} />
                        <Flex alignItems={"center"} gap={"36px"}>
                            <AppSelectBox name={"NFT"} items={selectItems} onChange={e => updatePageData("selectedChain", e.target.value)} />
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
                    {
                        pageData.isLoading ?
                            <SimpleGrid
                                columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
                                gap={4}
                            >
                                {generateSkeletons()}
                            </SimpleGrid> :
                            !pageData.nfts.length ?
                                <AppTypography width={"100%"} paddingBlock={3} textAlign={"center"} color={"#fff"} fontSize={"14px"}>No NFT was found in your wallet.</AppTypography> :
                                <SimpleGrid
                                    columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
                                    gap={4}
                                >
                                    {
                                        pageData.nfts.map((nft, index) => {
                                            const { myProducts } = pageData
                                            return <Box
                                                key={index}
                                                width={"196px"}
                                                borderRadius={"8px"}
                                                overflow={"hidden"}
                                                backgroundColor={"#262626"}
                                                cursor={pageData.myProducts ? "pointer" : "default"}
                                                onClick={() => {
                                                    if (myProducts) {
                                                        updatePageData("selectedNFT", nft)
                                                        onOpen()
                                                    }
                                                }}
                                            >
                                                <AppImage src={myProducts ? nft.image : nft.imageUrl} objectFit={"cover"} width={"196px"} height={"196px"} />
                                                <Box padding={"12px 16px"}>
                                                    <AppTypography fontSize={"14px"} fontWeight={"600"}>{myProducts ? nft.name : nft.collectionName}</AppTypography>
                                                </Box>
                                            </Box>
                                        })
                                    }
                                </SimpleGrid>
                    }

                </VStack>
            </AppCard >
            {isOpen && <NFTDetailsModal open={isOpen} close={onClose} nft={pageData.selectedNFT} />}
        </>

    )
}

export default NFTs