import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import ProductItem from './ProductItem'

export default function ProductPlaceholder() {
    return (
        <Box width="100%" p={4} background={"#141414"}>
            <Grid
                templateColumns={{
                    base: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)"
                }}
                gap={4}
            >
                {[...Array(15)].map((_, index) => (
                    <ProductItem />
                ))}
            </Grid>
        </Box>
    )
}
