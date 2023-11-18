import { HStack } from '@chakra-ui/react'
import FiltersDatagrid, { IFiltersDatagridItems } from 'components/common/datagrid/parts/filters/FiltersDatagrid'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import { productCategoryervices } from 'lib/apis/product/productServices'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

function AffiliateProductsFilters({ addQuery }) {
    const { data, isLoading } = useQuery({
        queryFn: productCategoryervices,
        queryKey: "product_category",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const category = data?.data?.data
    const [searchParams] = useSearchParams()

    const filters: Array<IFiltersDatagridItems> = useMemo(() => {
        const getSubs = category && category.find(el => el._id === searchParams.get('category'))
        const items = [
            {
                title: "Category",
                list: category ? category.map(el => ({
                    title: el.title,
                    onClick: () => addQuery('category', el._id),
                    isActive: searchParams.get('category') === el._id
                })) : []
            }
        ]
        
        if (getSubs) items.push({
            title: "Sub category",
            list: getSubs ? getSubs.subCategories.map(el => ({
                title: el.title,
                onClick: () => addQuery('subcategory', el._id),
                isActive: searchParams.get('subcategory') === el._id
            })) : []
        })

        return items
    }, [category, searchParams])

    return (
        <HStack spacing={7}>
            <SearchDatagrid value={searchParams.get('title')} onChange={(e) => addQuery('title', e.target.value)} />
            <FiltersDatagrid item={filters} />
        </HStack>
    )
}

export default AffiliateProductsFilters