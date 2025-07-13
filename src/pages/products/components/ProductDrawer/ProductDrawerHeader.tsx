import { DrawerHeader as ChakraDrawerHeader, DrawerCloseButton, Heading } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ProductType } from 'pages/products/utils/types'
import React, { useMemo } from 'react'

const ProductDrawerHeader = () => {
    const { t } = useLocaleResources('products');
    const { values: { _id: editingProductId, product_type: productType } } = useProductForm()

    const productTitleMap: Record<ProductType, string> = useMemo(() => ({
        NORMAL: t('productTypes.physicalItems.title'),
        DIGITAL: t('productTypes.digitalGoods.title'),
        PRINT_ON_DEMAND: t('productTypes.pod.title'),
        EVENT: t('productTypes.events.title')
    }), [t])

    const productTitle = productTitleMap[productType] || t('productDrawer.title')
    const actionText = editingProductId ? t('common.update') : t('common.add')

    return (
        <ChakraDrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
        >
            <Heading as="h3" fontSize={24} fontWeight={700} color="neutral.white">
                {actionText} {productTitle}
            </Heading>
            <DrawerCloseButton position="static" color="white" />
        </ChakraDrawerHeader>
    )
}

export default ProductDrawerHeader