import { Grid } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'

export type ProductTypeObj = {
    icon: React.ReactNode
    title: string
    description: string,
    productType: ProductType
}

const productTypes: ProductTypeObj[] = [
    {
        icon: <AppIcons.HeaderProductBox />,
        title: "Physical Items",
        description: "Sell tangible goods and merchandise currently in stock.",
        productType: "NORMAL"
    },
    {
        icon: <AppIcons.HeaderImage />,
        title: "Digital Goods",
        description: "Sell digital items like files, in-game assets and NFTs.",
        productType: "DIGITAL"
    },
    {
        icon: <AppIcons.HeaderShirt />,
        title: "POD",
        description: "Offer custom produced items on-demand, such as apparel and mugs.",
        productType: "PRINT_ON_DEMAND"
    },
    {
        icon: <AppIcons.EventTicket />,
        title: "Events",
        description: "Sell tickets for events, concerts, and other gatherings.",
        productType: "EVENT"
    }
]

function ProductTypes() {
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