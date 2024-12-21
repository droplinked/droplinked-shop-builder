import { Flex, Image } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import ProductTypesPopover from '../ProductTypesPopover/ProductTypesPopover'
interface Props {
    handleProductTypeSelection: (productType: string) => void
}
function EmptyProductList({ handleProductTypeSelection }: Props) {
    return (
        <Flex justifyContent="center" gap="64px" alignItems="center" flexDirection="column" width="100%" height="80vh">
            <Image src="https://upload-file-droplinked.s3.amazonaws.com/34486d750011c9c70ff3a03fce40a866be649d583f049a1dbfa341c551d8e7f6_or.png" alt='Empty Table' width="420px" height="352px" />
            <Flex alignItems="center" flexDirection="column" gap={4}>
                <AppTypography color="#fff" fontSize="16px">
                    Get started by adding your first product
                </AppTypography>
                <ProductTypesPopover onProductTypeSelection={(productType) => handleProductTypeSelection(productType)}>
                    <Flex cursor="pointer" gap="2" alignItems="center">
                        <AppIcons.GreenPlus width="20px" />
                        <AppTypography color="#2BCFA1" fontSize="14px">
                            New Product
                        </AppTypography>
                    </Flex>
                </ProductTypesPopover>
            </Flex>
        </Flex>
    )
}

export default EmptyProductList