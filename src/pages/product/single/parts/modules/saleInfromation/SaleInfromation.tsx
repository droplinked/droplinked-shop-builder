import { Box, Flex, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect } from 'react'
import AlertProduct from '../alert/AlertProduct'

function SaleInfromation() {
    const { loading, methods: { updateState }, state: { sku } } = useContext(productContext)

    useEffect(() => {
        updateState('sku', [{
            "externalID": "",
            "price": 0,
            "quantity": 0,
            "recorded_quantity": 0,
            "commision": 0,
            "deploy_hash": 0
        }])
    }, [])

    const change = useCallback((key: string, value: number) => {
        updateState('sku', [{
            ...sku[0],
            [key]: value
        }])
    }, [sku])

    return (
        <VStack align="stretch" spacing="20px">
            <VStack align="stretch">
                <FieldLabel label='Sale Information' isRequired loading={loading} />
                <AppTypography size='14px' color={"#808080"}>??? sale fields</AppTypography>
            </VStack>
            <AppSkeleton isLoaded={loading}>
                <AppTable
                    rows={[
                        {
                            quantity: {
                                caption: 'Quantity',
                                props: {
                                    width: "33%"
                                },
                                value: <AppInput onChange={(e: any) => change('quantity', parseInt(e.target.value))} value={sku.length ? sku[0].quantity : ''} name='Quantity' placeholder='0' width="104px" />
                            },
                            extenalID: {
                                caption: 'Extenal ID',
                                props: {
                                    width: "33%"
                                },
                                value: <AppInput onChange={(e: any) => change('externalID', parseInt(e.target.value))} value={sku.length ? sku[0].externalID : ''} name='externalID' placeholder='0' width="104px" />
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
            <AlertProduct text='Once you publish your product these information can not be changed' />
        </VStack>
    )
}

export default SaleInfromation