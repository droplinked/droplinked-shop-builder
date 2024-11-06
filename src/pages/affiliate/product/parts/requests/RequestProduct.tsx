import { HStack, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTable from 'components/common/table/AppTable'
import React, { useContext, useState } from 'react'
import { ShopProductContext } from '../../context'
import RequestProductModel from './model'
import ModalRequest from './parts/modalRequest/ModalRequest'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'

function RequestProduct() {
    const { product, shop } = useContext(ShopProductContext)
    const [Sku, setSku] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shop: { currency } } = useAppStore();
    return (
        <>
            <AppTable
                rows={product.skuIDs.map((el: any) => ({
                    ...RequestProductModel.makeOptions(el.options),
                    Inventory: {
                        value: el?.recorded_quantity || "---"
                    },
                    Price: {
                        value: `${currency.symbol}${currencyConvertion(el?.price, currency.conversionRateToUSD, false)} ${currency.abbreviation}`
                    },
                    Button: {
                        caption: "",
                        props: {
                            width: "200px"
                        },
                        value: (
                            <HStack gap={2}>
                                <BasicButton
                                    onClick={() => {
                                        onOpen()
                                        setSku(el)
                                    }}
                                >
                                    Request
                                </BasicButton>
                            </HStack>
                        )
                    }
                }))}
            />
            <ModalRequest product={product} sku={Sku} open={isOpen} shop={shop} close={onClose} />
        </>
    )
}

export default RequestProduct