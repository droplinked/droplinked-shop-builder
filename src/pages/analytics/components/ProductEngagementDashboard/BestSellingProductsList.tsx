import { Flex } from '@chakra-ui/react'
import { TopSeller } from 'lib/apis/dashboard/interfaces'
import React from 'react'
import EmptyState from './EmptyState'
import ProductItem from './ProductItem'

interface Props {
    topSellers?: TopSeller[]
}

function BestSellingProductsList({ topSellers }: Props) {
    if (!topSellers?.length) return (
        <EmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/b85b980eb09c0b9045230c4aa97bd24326e1a00730b164105f9cef034d8712f0.png'
            title='Grow with droplinked!'
            description='Click on the tasks and done them to increase grow your shop and increase your sell.'
        />
    )

    return (
        <Flex direction="column">
            {topSellers.map((product, index) => (
                <ProductItem
                    key={product.productID}
                    product={product}
                    isLastItem={index === topSellers.length - 1}
                />
            ))}
        </Flex>
    )
}

export default BestSellingProductsList