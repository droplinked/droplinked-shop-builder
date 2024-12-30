import { podProductService } from 'lib/apis/pod/services'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { useQuery } from 'react-query'
import LoadingPlaceholder from '../../../common/LoadingPlaceholder'
import BaseProductCard from './ProductList/BaseProductCard'

const SelectedProductDetails = ({ product, onBack }) => {
    const updateProductPageState = useProductPageStore(s => s.updateProductPageState)
    const { setFieldValue } = useProductForm()
    const { isFetching } = useQuery({
        queryKey: ['POD_PRODUCT_DETAILS', product.id],
        queryFn: () => podProductService({ pod_blank_product_id: product.id }),
        enabled: !!product.id,
        onSuccess: (data) => {
            const fetchedProduct = data.data.data
            updateProductPageState("selectedPODProduct", fetchedProduct)
            setFieldValue('pod_blank_product_id', product.id)
        }
    })

    const deleteProduct = () => {
        updateProductPageState("selectedPODProduct", null)
        setFieldValue("pod_blank_product_id", null)
        onBack()
    }

    if (isFetching) return <LoadingPlaceholder h="83px" />

    return (
        <BaseProductCard
            product={product}
            showShippingPopover
            onProductDelete={deleteProduct}
        />
    )
}

export default SelectedProductDetails