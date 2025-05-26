import { Flex, useDisclosure } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import { ICombinedNft } from 'pages/onchain-records/utils/interface'
import React from 'react'
import TransferModal from './transfer-modal/TransferModal'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function TransferCard({ item }: { item: ICombinedNft }) {
    const { t } = useLocaleResources("onchainRecords")
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { isDroplinkedProduct, name, description, imageUrl } = item ?? {}
    const productName = name.length > 30 ? name?.slice(0, 15) + "..." : name

    return (
        <Flex
            py={4}
            pr={6}
            pl={4}
            bg="neutral.gray.1000"
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={12}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex alignItems="center" gap={4} width="80%" overflow="hidden">
                <AppImage
                    width="56px"
                    height="56px"
                    borderRadius={6}
                    src={imageUrl}
                    alt={name}
                />
                <Flex flexDirection="column" gap={1}>
                    <AppTypography
                        color="#fff"
                        fontSize={{ base: 14, lg: 16 }}
                        fontWeight={700}
                    >
                        {productName}
                    </AppTypography>
                    {description &&
                        <AppTypography
                            color="text.subtext.placeholder.dark"
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
            <AppButton
                variant='secondary'
                color="#2BCFA1"
                bg="none"
                border="none"
                fontSize={{ base: 14, lg: 16 }}
                onClick={onOpen}
                isDisabled={isDroplinkedProduct || item.quantity === "0"}
                width="20%"
            >
                {t("transfer")}
            </AppButton>
            <TransferModal item={item} isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}
