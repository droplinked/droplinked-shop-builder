import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { IShopRecordedService } from 'lib/apis/shop/interfaces'
import { ShopRecordedService } from 'lib/apis/shop/shopServices'
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import AffiliateProduct from '../parts/product/AffiliateProduct'
import AffiliateProductsFilters from './parts/filter/AffiliateProductsFilters'
import AffiliateProductsLoading from './parts/loading/AffiliateProductsLoading'

function AffiliateProducts() {
    const { data, mutate, isLoading } = useMutation((params: IShopRecordedService) => ShopRecordedService(params))
    const [searchParams] = useSearchParams()
    const { shopNavigate } = useCustomNavigate()
    const products = data?.data?.data

    const fetch = useCallback(() => {
        mutate({
            categoryIds: searchParams.get('category') ? [searchParams.get('category')] : null,
            page: searchParams.get('page') || 1,
            subCategoryIds: searchParams.get('subcategory') ? [searchParams.get('subcategory')] : null,
            title: searchParams.get('title') || null,
        })
    }, [searchParams])

    useEffect(() => fetch(), [searchParams])

    const addQuery = useCallback((key, value) => {
        const filter = searchParams
        filter.set("page", '1')
        if (filter.get(key) === value || !value.length) {
            filter.delete(key)
        } else {
            filter.set(key, value)
        }
        shopNavigate(`affiliate/products?${filter.toString()}`)
    }, [searchParams])

    return (
        <AppCard>
            <VStack align={"stretch"} spacing={7}>
                <AffiliateProductsFilters addQuery={addQuery} />
                {isLoading ? <AffiliateProductsLoading /> : products && products.data.length ? (
                    <VStack align={"stretch"} spacing={7}>
                        <SimpleGrid columns={5} spacing="12px">
                            {products && products.data.map((el, key) => (
                                <AffiliateProduct key={key} image={el.media.find(image => image.isMain === "true")?.thumbnail} link={`${el.shopName}/${el._id}`} title={el.title} shop={{ icon: el.shopLogo, name: el.shopName }} />
                            ))}
                        </SimpleGrid>
                        <Pagination current={products?.currentPage} lastPage={products?.totalPages ? parseInt(products?.totalPages) : 1} nextPage={products?.hasNextPage || false} prevPage={products?.hasPreviousPage || false} />
                    </VStack>
                ) : <AppEmptyPage title='No result' />}
            </VStack>
        </AppCard>
    )
}

export default AffiliateProducts