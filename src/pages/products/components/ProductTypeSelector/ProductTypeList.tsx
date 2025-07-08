import { Grid } from '@chakra-ui/react'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { ShirtLg } from 'assets/icons/Items/Shirt/ShirtLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { TicketLg } from 'assets/icons/System/Ticket/TicketLg'
import { ProductTypeOption } from 'pages/products/utils/types'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'

const productTypes: ProductTypeOption[] = [
    {
        icon: <BoxLg color='#fff' />,
        title: "Physical Items",
        description: "Sell tangible goods and merchandise currently in stock.",
        productType: "NORMAL"
    },
    {
        icon: <ImageLg color='#fff' />,
        title: "Digital Goods",
        description: "Sell digital items like files, in-game assets and NFTs.",
        productType: "DIGITAL"
    },
    {
        icon: <ShirtLg color='#fff' />,
        title: "POD",
        description: "Offer custom produced items on-demand, such as apparel and mugs.",
        productType: "PRINT_ON_DEMAND"
    },
    {
        icon: <TicketLg color='#fff' />,
        title: "Events",
        description: "Sell tickets for events, concerts, and other gatherings.",
        productType: "EVENT"
    }
]

function ProductTypeList() {
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