import { Flex, useDisclosure } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import { ICombinedNft } from 'pages/onchain-records/utils/interface'
import React from 'react'
import TransferModal from './transfer-modal/TransferModal'

export default function TransferCard({ item }: { item: ICombinedNft }) {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { isDroplinkedProduct, name, description, imageUrl } = item ?? {};
    const productName = name.length > 30 ? name?.slice(0, 15) + "..." : name;

    return (
        <Flex
            py={4}
            pr={6}
            pl={4}
            bg={"#1c1c1c"}
            border={"1px solid #292929"}
            borderRadius={12}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Flex alignItems={"center"} gap={4} width={"80%"} overflow="hidden">
                <AppImage
                    width={"56px"}
                    height={"56px"}
                    borderRadius={6}
                    src={imageUrl}
                    alt={name}
                />
                <Flex flexDirection={"column"} gap={1}>
                    <AppTypography
                        color={"#fff"}
                        fontSize={{ base: 14, lg: 16 }}
                        fontWeight={700}
                    >
                        {productName}
                    </AppTypography>
                    {description &&
                        <AppTypography
                            color={"#7b7b7b"}
                            fontSize={{ base: 12, lg: 14 }}
                            dangerouslySetInnerHTML={{ __html: description }}
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: '1',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        />
                    }
                </Flex>
            </Flex>
            <Button
                variant='secondary'
                color={"#2BCFA1"}
                bg={"none"}
                border={"none"}
                fontSize={{ base: 14, lg: 16 }}
                fontWeight={500}
                paddingInline={"14px"}
                onClick={onOpen}
                isDisabled={isDroplinkedProduct || item.quantity === "0"}
                width={"20%"}
            >
                Transfer
            </Button>
            <TransferModal item={item} isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}
