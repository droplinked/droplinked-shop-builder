import { getShopProductsService } from 'lib/apis/product/productServices'
import { ProductType, PublishStatus } from 'pages/products/utils/types'
import { useInfiniteQuery } from 'react-query'

export default function useProducts(searchTerm: string) {
    return useInfiniteQuery({
        queryKey: ["PRODUCTS", searchTerm],
        queryFn: ({ pageParam = 1 }) => getShopProductsService({
            page: pageParam,
            limit: 15,
            filter: searchTerm
        }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage
    })
}

export const productTypeMap: Record<ProductType, string> = {
    "DIGITAL": "Digital",
    "NORMAL": "Physical",
    "PRINT_ON_DEMAND": "POD",
    "EVENT": "Event"
}

export const productStatusMap: Record<PublishStatus, string> = {
    "PUBLISHED": "Public",
    "DRAFTED": "Draft"
}