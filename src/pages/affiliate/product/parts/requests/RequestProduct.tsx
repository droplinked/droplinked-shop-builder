import { Box, HStack, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu'
import AppTable from 'components/common/table/AppTable'
import React, { useContext, useState } from 'react'
import { ShopProductContext } from '../../context'
import RequestProductModel from './model'
import ModalRequest from './parts/modalRequest/ModalRequest'

function RequestProduct() {
    const { product, shop } = useContext(ShopProductContext)
    const [Sku, setSku] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(`1.product`, product)
    return (
        <>
            <AppTable
                rows={product.skuIDs.map((el: any) => ({
                    ...RequestProductModel.makeOptions(el.options),
                    Inventory: {
                        value: el?.recorded_quantity || "---"
                    },
                    Price: {
                        value: `$${el?.price.toFixed(2)} USD`
                    },
                    Button: {
                        caption: "",
                        props: {
                            width: "200px"
                        },
                        value: (
                            <HStack gap={2}>
                                <Box>
                                    <BasicButton onClick={() => {
                                        onOpen()
                                        setSku(el)
                                    }}>
                                        Request
                                    </BasicButton>
                                </Box>
                                <Box>
                                    <PopOverMenu items={[
                                        {
                                            caption: "view details",
                                            onClick: () => { }
                                        }
                                    ]} />
                                </Box>
                            </HStack>
                        )
                    }
                }))}
            />
            <ModalRequest product={product} sku={Sku} open={isOpen} shop={shop} close={onClose} />
            {/* <RequestDetail /> */}
        </>
    )
}

export default RequestProduct