import AppTable from 'components/shared/table/AppTable'
import React, { useMemo, useState } from 'react'
import SkuTableModal from './parts/modal/SkuTableModal'
import { Box, HStack, Image, useDisclosure } from '@chakra-ui/react'
import editIcon from "assest/icon/edit-icon.svg";
import tearIcon from "assest/icon/tear-icon.svg";
import infoIcon from "assest/icon/info-icon.svg";

function SkuTable({ sku }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SkuData, setSkuData] = useState(null)

    const rows = useMemo(() => {
        if (!sku.length) return null
        return sku.map((el, key) => {
            return {
                quantity: {
                    value: el.quantity
                },
                externalID: {
                    value: el.externalID
                },
                price: {
                    props: {
                        width: "20%"
                    },
                    value: el.price
                },
                options: {
                    value: typeof el.options !== "undefined" ? el.options.length : ""
                },
                controls: {
                    caption: "",
                    value: (
                        <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                            <Box><Image src={tearIcon} width={"16px"} height={"16px"} cursor={"pointer"} /></Box>
                            <Box>
                                <Image src={editIcon} width={"16px"} height={"16px"} cursor={"pointer"} onClick={() => {
                                    setSkuData({
                                        sku : el,
                                        key
                                    })
                                    onOpen()
                                }} />
                            </Box>
                            <Box><Image src={infoIcon} width={"16px"} height={"16px"} cursor={"pointer"} /></Box>
                        </HStack>
                    )
                }
            }
        })
    }, [sku])

    return (
        <>
            <SkuTableModal open={isOpen} close={onClose} skuData={SkuData} />
            {rows && <AppTable rows={rows} />}
        </>
    )
}

export default SkuTable