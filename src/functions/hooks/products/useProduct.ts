import { productService } from 'lib/apis/shop/shopServices'
import { useQuery } from 'react-query'

export default function useProduct(productId: string) {
    return useQuery(['PRODUCT', productId], () => productService(productId),
        {
            enabled: !!productId
        }
    )
}
