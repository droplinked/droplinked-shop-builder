import { Box, HStack, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTable from 'components/common/table/AppTable'
import React, { useContext, useState } from 'react'
import ModalRequest from './parts/modalRequest/ModalRequest'
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu'
import { ShopProductContext } from '../../context'
import RequestProductModel from './model'

function RequestProduct() {
    const { product, shop } = useContext(ShopProductContext)
    const [Sku, setSku] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <AppTable
                rows={product.skuIDs.map((el: any) => ({
                    ...RequestProductModel.makeOptions(el.options),
                    Inventory: {
                        value: el?.quantity
                    },
                    Price: {
                        value: el?.price
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