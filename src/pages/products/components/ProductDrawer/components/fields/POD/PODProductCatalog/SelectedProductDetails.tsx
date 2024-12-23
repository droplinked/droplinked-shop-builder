import { podProductService } from 'lib/apis/pod/services'
import React from 'react'
import { useQuery } from 'react-query'
import BaseProductCard from './ProductList/BaseProductCard'
import ProductLoading from './ProductList/ProductLoading'

const SelectedProductDetails = ({ product, onBack }) => {
    const { data, isFetching } = useQuery({
        queryKey: ['POD_PRODUCT_DETAILS', product.id],
        queryFn: () => podProductService({ pod_blank_product_id: product.id }),
        enabled: !!product.id
    })
    const fetchedProduct = data?.data?.data
    console.log(fetchedProduct)

    if (isFetching) return <ProductLoading h="83px" />

    return (
        <BaseProductCard
            product={product}
            showShippingPopover
            onProductDelete={onBack}
        />
    )
}

export default SelectedProductDetails