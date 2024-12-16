import { Flex, Image } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import EmptyImage from "assest/image/product-page/empty.png"
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function EmptyProductList({ onProductTypeModalOpen }: { onProductTypeModalOpen: () => void }) {
    return (
        <Flex justifyContent="center" gap="64px" alignItems="center" flexDirection="column" width="100%" height="80vh">
            <Image src={EmptyImage} alt='Empty Table' width="420px" height="352px" />
            <Flex alignItems="center" flexDirection="column" gap={4}>
                <AppTypography color="#fff" fontSize="16px">
                    Get started by adding your first product
                </AppTypography>
                <Flex cursor="pointer" onClick={onProductTypeModalOpen} gap="2" alignItems="center">
                    <AppIcons.GreenPlus width="20px" />
                    <AppTypography color="#2BCFA1" fontSize="14px">
                        New Product
                    </AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EmptyProductList