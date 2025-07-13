import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import EmptyState from './EmptyState'
import ProductItem from './ProductItem'

interface Props {
    topSellers?: any[]
}

function BestSellingProductsList({ topSellers }: Props) {
    const { t } = useLocaleResources("analyticsPage")

    if (!topSellers?.length) return (
        <EmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/b85b980eb09c0b9045230c4aa97bd24326e1a00730b164105f9cef034d8712f0.png'
            title={t('growWithDroplinked')}
            description={t('growWithDroplinkedDesc')}
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