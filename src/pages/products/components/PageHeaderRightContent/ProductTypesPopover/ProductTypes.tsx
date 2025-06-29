import { Grid } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'

export type ProductTypeObj = {
    icon: React.ReactNode
    title: string
    description: string,
    productType: ProductType
}

function ProductTypes() {
    const { t } = useLocaleResources('products');

    const productTypes: ProductTypeObj[] = [
        {
            icon: <AppIcons.HeaderProductBox />,
            title: t('productTypes.physicalItems.title'),
            description: t('productTypes.physicalItems.description'),
            productType: "NORMAL"
        },
        {
            icon: <AppIcons.HeaderImage />,
            title: t('productTypes.digitalGoods.title'),
            description: t('productTypes.digitalGoods.description'),
            productType: "DIGITAL"
        },
        {
            icon: <AppIcons.HeaderShirt />,
            title: t('productTypes.pod.title'),
            description: t('productTypes.pod.description'),
            productType: "PRINT_ON_DEMAND"
        },
        {
            icon: <AppIcons.EventTicket />,
            title: t('productTypes.events.title'),
            description: t('productTypes.events.description'),
            productType: "EVENT"
        }
    ]

    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={4}
        >
            {productTypes.map((productType) => (
                <ProductTypeCard
                    key={productType.title}
                    {...productType}
                />
            ))}
        </Grid>
    )
}

export default ProductTypes