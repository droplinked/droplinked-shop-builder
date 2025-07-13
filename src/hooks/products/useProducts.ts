import { getShopProductsService } from 'services/product/productServices'
import { ProductType } from 'pages/products/utils/types'
import { useInfiniteQuery } from 'react-query'
import useLocaleResources from '../useLocaleResources/useLocaleResources'

export default function useProducts(searchTerm: string) {
    return useInfiniteQuery({
        queryKey: ["PRODUCTS", searchTerm],
        queryFn: ({ pageParam = 1 }) => getShopProductsService({
            page: pageParam,
            limit: 15,
            filter: searchTerm
        }),
        getNextPageParam: (lastPage) => lastPage?.data?.data?.nextPage ?? null
    })
}

export const useProductTypeMap = () => {
    const { t } = useLocaleResources('common')
    
    return {
        "DIGITAL": t('hooks.productTypes.digital'),
        "NORMAL": t('hooks.productTypes.physical'),
        "PRINT_ON_DEMAND": t('hooks.productTypes.pod'),
        "EVENT": t('hooks.productTypes.event')
    }
}