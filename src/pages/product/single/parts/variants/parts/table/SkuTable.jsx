import AppTable from 'components/shared/table/AppTable'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import SkuTableModal from './parts/modal/SkuTableModal'
import { Box, HStack, Image, useDisclosure } from '@chakra-ui/react'
import editIcon from "assest/icon/edit-icon.svg";
import tearIcon from "assest/icon/tear-icon.svg";
import infoIcon from "assest/icon/info-icon.svg";
import deleteIcon from "assest/icon/delete-icon.svg";
import SkuTableModel from './model';
import { productContext } from 'pages/product/single/context';
import { toast } from 'react-toastify';
import SkeletonProduct from '../../../skeleton/SkeletonProduct';

function SkuTable({ sku }) {
    const { methods: { updateState }, productID } = useContext(productContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SkuData, setSkuData] = useState(null)

    const { getRows } = SkuTableModel

    // Delete sku
    const DeleteSku = useCallback((key) => {
        const remove = sku.filter((el, index) => index !== key && el)
        updateState("sku", remove)
        toast.info("Skue delete")
    }, [sku])

    const rows = useMemo(() => {
        if (!sku.length) return null

        return sku.map((el, key) => {

            return {
                ...getRows(el),
                controls: {
                    caption: "",
                    value: (
                        <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                            <Box><Image src={tearIcon} width={"16px"} height={"16px"} cursor={"pointer"} /></Box>
                            <Box>
                                <Image src={editIcon} width={"16px"} height={"16px"} cursor={"pointer"} onClick={() => {
                                    setSkuData(el)
                                    onOpen()
                                }} />
                            </Box>
                            <Box><Image src={infoIcon} width={"16px"} height={"16px"} cursor={"pointer"} /></Box>
                            {!productID ?
                                <Box>
                                    <Image onClick={() => DeleteSku(key)} src={deleteIcon} width={"16px"} height={"16px"} cursor={"pointer"} />
                                </Box>
                                : null}
                        </HStack>
                    )
                }
            }
        })
    }, [sku])

    return (
        <>
            <SkuTableModal open={isOpen} close={onClose} skuData={SkuData} />
            <SkeletonProduct>
                {rows && <AppTable rows={rows} />}
            </SkeletonProduct>
        </>
    )
}

export default SkuTable