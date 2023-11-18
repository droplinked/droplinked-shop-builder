import { Box, Flex, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import { Isku } from 'lib/apis/product/interfaces'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect } from 'react'
import AlertProduct from '../alert/AlertProduct'
import VariantsUnlimited from '../variants/parts/table/parts/unlimited/VariantsUnlimited'

function SaleInfromation() {
    const { loading, methods: { updateState }, state: { sku }, productID } = useContext(productContext)

    useEffect(() => {
        if (sku.length) return
        let data: any = {
            "externalID": "",
            "price": 0,
            "dimensions": {
                height: 0,
                length: 0,
                width: 0
            },
            "quantity": 0,
            "recorded_quantity": 0,
            "recordData": {
                status: "NOT_RECORDED",
                commision: 0
            },
            "deploy_hash": '',
        }


        if (productID && !sku[0].recordData.commision) data = { ...sku[0], commision: 20 }

        updateState('sku', [data])
    }, [productID, sku])

    const change = useCallback((key: string, value: number) => {
        updateState('sku', [{
            ...sku[0],
            [key]: value,
            ...key === "quantity" && { recorded_quantity: value }
        }])
    }, [sku])

    return (
        <VStack align="stretch" spacing="20px">
            <VStack align="stretch">
                <FieldLabel label='Variants' isRequired loading={loading} />
                <AppTypography size='14px' color={"#808080"}>Enter the quantity and price of the digital item. (External ID is optional)</AppTypography>
            </VStack>
            <AppSkeleton isLoaded={loading}>
                <AppTable
                    rows={[
                        {
                            quantity: {
                                caption: 'Stock',
                                props: {
                                    width: "33%"
                                },
                                value: (
                                    <VariantsUnlimited value={sku.length && sku[0].quantity ? sku[0].quantity : ''} isDisabled={false} onChange={e => change('quantity', parseInt(e))} name={"unlimited"} />
                                )
                            },
                            extenalID: {
                                caption: 'Extenal ID',
                                props: {
                                    width: "33%"
                                },
                                value: <AppInput onChange={(e: any) => change('externalID', e.target.value)} value={sku.length ? sku[0].externalID : ''} name='externalID' placeholder='0' width="104px" />
                            },
                            price: {
                                caption: 'Price',
                                props: {
                                    width: "33%"
                                },
                                value: (
                                    <Flex alignItems="end" gap="10px">
                                        <Box width="100px"><AppInput onChange={(e: any) => change('price', parseInt(e.target.value))} value={sku.length ? sku[0].price : ''} name='price' placeholder='0' width="100%" /></Box>
                                        <AppTypography size='14px' position="relative" bottom="13px" color="#808080">USD</AppTypography>
                                    </Flex>
                                )
                            },
                        }
                    ]}
                />
            </AppSkeleton>
            <AlertProduct text='The variant data will become immutable after the product is dropped and published' />
        </VStack>
    )
}

export default SaleInfromation