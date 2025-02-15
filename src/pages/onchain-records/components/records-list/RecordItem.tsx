import { Box, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import RecordDetails from './RecordDetails'
import { ICombinedNft } from 'pages/onchain-records/utils/interface'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppTooltip from 'components/common/tooltip/AppTooltip'

export default function RecordItem({ item }: { item: ICombinedNft }) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { chain, imageUrl, name, ownerAddress } = item ?? {};
    const endCount = isSmallerThan768 ? 9 : 17;
    const walletAddress = ownerAddress && ownerAddress?.slice(0, endCount) + "...";

    return (
        <Flex flexDirection={"column"} gap={3} cursor={"pointer"} onClick={onOpen}>
            <Box>
                <AppImage
                    borderRadius={"8px"}
                    src={imageUrl}
                    alt='productImage'
                    width={"100%"}
                    height={"100%"}
                    aspectRatio={1}
                    userSelect={"none"}
                    objectFit={"cover"}
                />
            </Box>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <AppTooltip label={chain}>
                    <Flex gap={2} alignItems={"center"}>
                        <BlockchainDisplay
                            blockchain={chain}
                            show='icon'
                            props={{ style: { width: "20px", height: "20px" } }}
                        />
                        <AppTypography color={"#fff"} fontSize={14}>
                            <BlockchainDisplay blockchain={chain} show='name' />
                        </AppTypography>
                    </Flex>
                </AppTooltip>
                <AppTypography color={"#7b7b7b"}>{walletAddress}</AppTypography>
            </Flex>
            <AppTypography color={"#fff"} fontSize={{ base: 14, lg: 16 }} lineHeight={{ base: "20px", lg: "24px" }}>
                {name}
            </AppTypography>
            <RecordDetails item={item} isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}
