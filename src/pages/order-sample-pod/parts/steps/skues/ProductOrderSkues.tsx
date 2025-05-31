import { Flex } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import { productService } from 'services/shop/shopServices'
import productOrderContext from 'pages/order-sample-pod/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import ProductOrderCard from '../../card/ProductOrderCard'
import productOrderSkuesModel from './model'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function ProductOrderSkues() {
    const { methods: { updateState }, params: { skus, orderId } } = useContext(productOrderContext)
    const { mutate, data } = useMutation((productId: string) => productService(productId))
    const currencyConverter = useCurrencyConverter()
    const params = useParams()
    const [SkuesIDs, setSkuesIDs] = useState([])
    const { t } = useLocaleResources("orderSamplePOD")

    const product = data?.data?.data

    // Get product service
    useEffect(() => { if (params?.productID) mutate(params?.productID) }, [params])

    const updateSkus = (list: string[]) => {
        const result = {}
        Object.keys(skus).forEach(el => {
            if (list.includes(el)) result[el] = skus[el]
        })
        updateState("skus", result);
    }

    // Handle rows appTable
    const rows = useMemo(
        (): ITableRows =>
            productOrderSkuesModel.rows(
                { product, SkuesIDs, updateState, skus, orderId, t },
                currencyConverter
            ),
        [product, SkuesIDs, skus, orderId, t]
    )

    return (
        <ProductOrderCard title={t("skues.title")}>
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