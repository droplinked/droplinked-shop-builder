import { HStack, VStack } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import { IproductService } from 'lib/apis/shop/interfaces'
import { productService } from 'lib/apis/shop/shopServices'
import productOrderContext from 'pages/product/order/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import ProductOrderCard from '../../card/ProductOrderCard'
import productOrderSkuesModel from './model'

function ProductOrderSkues() {
    const { methods: { updateState }, params: { skus } } = useContext(productOrderContext)
    const { mutate, data } = useMutation((param: IproductService) => productService(param))
    const params = useParams()
    const product = data?.data?.data
    const [SkuesIDs, setSkuesIDs] = useState([])

    // Get service product
    useEffect(() => { if (params?.productID) mutate({ productID: params?.productID }) }, [params])

    const updateSkus = (list: string[]) => {
        const result = {}
        Object.keys(skus).forEach(el => {
            if (list.includes(el)) result[el] = skus[el]
        })
        updateState("skus", result);
    }

    // Handle rows appTable
    const rows = useMemo((): ITableRows => productOrderSkuesModel.rows({ product, SkuesIDs, updateState, skus }), [product, SkuesIDs, skus])

    return (
        <ProductOrderCard title="Product">
            {product ?
                <VStack align="stretch" spacing="40px">
                    <HStack alignItems="center" gap="10px">
                        <AppImage src={product?.media.find(el => el.isMain === "true")?.url} width="48px" height="48px" />
                        <AppTypography>{product?.title}</AppTypography>
                    </HStack>
                    <AppTable checkbox={{
                        state: SkuesIDs, update: (value) => {
                            setSkuesIDs(value)
                            updateSkus(value)
                        }
                    }} rows={rows} />
                </VStack>
                : null}
        </ProductOrderCard>
    )
}

export default ProductOrderSkues