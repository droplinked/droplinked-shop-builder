import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { ShirtLg } from 'assets/icons/Items/Shirt/ShirtLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { TicketLg } from 'assets/icons/System/Ticket/TicketLg'
import { ProductTypeOption } from 'pages/products/utils/types'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { Grid } from '@chakra-ui/react'

function ProductTypeList() {
    const { t } = useLocaleResources('products')
    
    const productTypes: ProductTypeOption[] = [
        {
            icon: <BoxLg color='#fff' />,
            title: t('ProductTypeSelector.physicalItems.title'),
            description: t('ProductTypeSelector.physicalItems.description'),
            productType: "NORMAL"
        },
        {
            icon: <ImageLg color='#fff' />,
            title: t('ProductTypeSelector.digitalGoods.title'),
            description: t('ProductTypeSelector.digitalGoods.description'),
            productType: "DIGITAL"
        },
        {
            icon: <ShirtLg color='#fff' />,
            title: t('ProductTypeSelector.pod.title'),
            description: t('ProductTypeSelector.pod.description'),
            productType: "PRINT_ON_DEMAND"
        },
        {
            icon: <TicketLg color='#fff' />,
            title: t('ProductTypeSelector.events.title'),
            description: t('ProductTypeSelector.events.description'),
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

export default ProductTypeList 