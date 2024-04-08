import { Flex } from '@chakra-ui/react'
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
    const { methods: { updateState }, params: { skus, orderId } } = useContext(productOrderContext)
    const { mutate, data } = useMutation((param: IproductService) => productService(param))
    const params = useParams()
    const product = data?.data?.data
    const [SkuesIDs, setSkuesIDs] = useState([])

    // Get product service
    useEffect(() => { if (params?.productID) mutate({ productID: params?.productID }) }, [params])

    const updateSkus = (list: string[]) => {
        const result = {}
        Object.keys(skus).forEach(el => {
            if (list.includes(el)) result[el] = skus[el]
        })
        updateState("skus", result);
    }

    // Handle rows appTable
    const rows = useMemo((): ITableRows => productOrderSkuesModel.rows({ product, SkuesIDs, updateState, skus, orderId }), [product, SkuesIDs, skus, orderId])

    return (
        <ProductOrderCard title="Product">
            {product ?
                <Flex direction={"column"} gap={8}>
                    <Flex alignItems="center" gap={4}>
                        <AppImage src={product?.media.find(el => el.isMain === "true")?.url} width="48px" height="48px" />
                        <AppTypography>{product?.title}</AppTypography>
                    </Flex>
                    <AppTable
                        checkbox={
                            {
                                state: SkuesIDs, update: (value) => {
                                    setSkuesIDs(value)
                                    updateSkus(value)
                                },
                                isDisabled: !!orderId
                            }
                        }
                        rows={rows}
                    />
                </Flex>
                : null
            }
        </ProductOrderCard>
    )
}

export default ProductOrderSkues