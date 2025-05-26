import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import { TopSeller } from 'services/dashboard/interfaces'
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
            description='Click on the tasks, complete them to grow your shop, and increase your sales.'
        />
    )

    return (
        <RuledGrid columns={1} nested borderColor="neutral.gray.1000">
            {topSellers.map((product) => (
                <ProductItem key={product.productID} product={product} />
            ))}
        </RuledGrid>
    )
}

export default BestSellingProductsList