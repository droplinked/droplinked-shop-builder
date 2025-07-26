import { getShopProductsService } from 'services/product/productServices'
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
    const { t } = useLocaleResources('products')
    
    return {
        "DIGITAL": t('useProductTypeMap.digital'),
        "NORMAL": t('useProductTypeMap.physical'),
        "PRINT_ON_DEMAND": t('useProductTypeMap.pod'),
        "EVENT": t('useProductTypeMap.event')
    }
}