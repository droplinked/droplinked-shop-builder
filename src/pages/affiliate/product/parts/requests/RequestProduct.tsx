import { Box, HStack, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import AppTable from 'components/shared/table/AppTable'
import React, { useContext, useState } from 'react'
import ModalRequest from './parts/modalRequest/ModalRequest'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'
import { ShopProductContext } from '../../context'
import RequestProductModel from './model'

function RequestProduct() {
    const { product } = useContext(ShopProductContext)
    const [Sku, setSku] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <AppTable
                rows={product.skuIDs.map((el: any) => ({
                    ...RequestProductModel.makeOptions(el.options),
                    Inventory: {
                        value: el.quantity
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
            <ModalRequest product={product} sku={Sku} open={isOpen} close={onClose} />
            {/* <RequestDetail /> */}
        </>
    )
}

export default RequestProduct