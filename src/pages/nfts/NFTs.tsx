import { Box, Checkbox, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useHookStore from 'functions/hooks/store/useHookStore'
import { retrieveNFTs } from 'lib/apis/nft/nftServices'
import React, { useEffect, useState } from 'react'
import NFTDetailsModal from './parts/NFTDetailsModal'
import { appDevelopment } from 'lib/utils/app/variable'
import useAppToast from 'functions/hooks/toast/useToast'

function NFTs() {
    const { app: { user: { wallets } } } = useHookStore()
    const [pageData, setPageData] = useState({
        isLoading: false,
        searchTerm: "",
        myProducts: false,
        selectedWallet: wallets[0].address,
        nfts: [],
        selectedNFT: null
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showToast } = useAppToast()

    const updatePageData = <K extends keyof typeof pageData>(key: K, value: typeof pageData[K]) =>
        setPageData({ ...pageData, [key]: value })

    const generateSkeletons = () => Array.from({ length: 6 }).map((_, key) =>
        <AppSkeleton key={key} width={"196px"} height={"241px"} isLoaded={false}>{" "}</AppSkeleton>
    )

    useEffect(() => {
        (async () => {
            try {
                updatePageData("isLoading", true)
                const { selectedWallet, myProducts } = pageData
                const selectedChain = wallets.find(w => w.address === selectedWallet)
                const nfts = await retrieveNFTs({ myProducts, body: { address: selectedChain.address, chain: selectedChain.type, network: appDevelopment ? "TESTNET" : "MAINNET" } })
                updatePageData("nfts", nfts.data.data)
            }
            catch {
                showToast({ message: "Oops! Something went wrong.", type: "error" })
            }
            finally {
                updatePageData("isLoading", false)
            }
        })()
    }, [pageData.selectedWallet, pageData.myProducts])

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
                            <AppSelectBox name={"NFT"} items={wallets.map(wallet => ({ caption: wallet.type, value: wallet.address }))} onChange={e => updatePageData("selectedWallet", e.target.value)} />
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
                        {pageData.isLoading ? generateSkeletons()
                            :
                            pageData.nfts.map((nft, index) => (
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