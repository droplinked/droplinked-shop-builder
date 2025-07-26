import { productService } from 'services/shop/shopServices'
import { useQuery } from 'react-query'

export default function useProduct(productId: string) {
    return useQuery(({
        queryKey: ['PRODUCT', productId],
        queryFn: () => productService(productId),
        enabled: !!productId,
    }))
}
