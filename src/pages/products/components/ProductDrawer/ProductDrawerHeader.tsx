import { DrawerHeader as ChakraDrawerHeader, DrawerCloseButton, Heading } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ProductType } from 'pages/products/utils/types'
import React, { useMemo } from 'react'

const ProductDrawerHeader = () => {
    const { values: { _id: editingProductId, product_type: productType } } = useProductForm()

    const productTitleMap: Record<ProductType, string> = useMemo(() => ({
        NORMAL: 'Physical Product',
        DIGITAL: 'Digital Product',
        PRINT_ON_DEMAND: 'POD Product',
        EVENT: 'Event'
    }), [])

    const productTitle = productTitleMap[productType] || 'Product'
    const actionText = editingProductId ? 'Update' : 'Add'

    return (
        <ChakraDrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #292929"
            padding={9}
        >
            <Heading as="h3" fontSize={24} fontWeight={700} color="#FFF">
                {actionText} {productTitle}
            </Heading>
            <DrawerCloseButton position="static" color="white" />
        </ChakraDrawerHeader>
    )
}

export default ProductDrawerHeader