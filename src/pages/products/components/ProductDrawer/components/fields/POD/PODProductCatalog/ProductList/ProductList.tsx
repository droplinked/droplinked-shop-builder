import { Flex } from '@chakra-ui/react'
import { podCategoryProductService } from 'lib/apis/pod/services'
import React from 'react'
import { useQuery } from 'react-query'
import BackButton from '../BackButton'
import BaseProductCard from './BaseProductCard'
import ProductLoading from './ProductLoading'

interface Props {
    categoryId: string
    onProductSelect: (product: any) => void
    onBack: () => void
}

function ProductList({ categoryId, onProductSelect, onBack }: Props) {
    const { data, isFetching } = useQuery(
        ['POD_PRODUCTS', categoryId],
        () => podCategoryProductService({ subCategoryId: categoryId }),
        { enabled: Boolean(categoryId) }
    )

    const products = data?.data?.data?.data || []

    function renderContent() {
        if (isFetching) return <ProductLoading numberOfSkeletons={4} h="82px" />

        return (
            <Flex direction="column" gap={3}>
                {products.map((product: any, index: number) => (
                    <BaseProductCard
                        key={index}
                        product={product}
                        onProductSelect={() => onProductSelect(product)}
                    />
                ))}
            </Flex>
        )
    }

    return (
        <Flex direction="column" gap={4}>
            <BackButton onBackClick={onBack} />
            {renderContent()}
        </Flex>
    )
}

export default ProductList