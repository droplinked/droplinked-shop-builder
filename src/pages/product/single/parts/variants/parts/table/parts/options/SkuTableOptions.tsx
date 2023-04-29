import React, { useCallback, useContext, useState } from 'react'
import { Box, HStack, Image, useDisclosure } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import RecordModal from '../recordModal/RecordModal'
import SkuTableModal from '../skuModal/SkuTableModal'
import editIcon from "assest/icon/edit-icon.svg";
import tearIcon from "assest/icon/tear-icon.svg";
import infoIcon from "assest/icon/info-icon.svg";
import deleteIcon from "assest/icon/delete-icon.svg";
import { toast } from 'react-toastify'
import { Isku } from 'lib/apis/product/interfaces'

interface IProps {
    element: Isku
    elementKey: number
}

function SkuTableOptions({ element, elementKey }: IProps) {
    const { state: { sku }, methods: { updateState }, productID } = useContext(productContext)
    const skuModal = useDisclosure()
    const recordModal = useDisclosure()
    const [SkuData, setSkuData] = useState(null)

    // Delete sku
    const DeleteSku = useCallback((key: number) => {
        const remove = sku.filter((el, index) => index !== key && el)
        updateState("sku", remove)
        toast.info("Skue delete")
    }, [sku])


    return (
        <>
            <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                <>
                    {productID && (
                        <Box>
                            <Image
                                onClick={() => {
                                    recordModal.onOpen()
                                    setSkuData(element)
                                }}
                                src={tearIcon} width={"16px"} height={"16px"} cursor={"pointer"} />
                        </Box>
                    )}
                    <Box>
                        <Image src={editIcon} width={"16px"} height={"16px"} cursor={"pointer"} onClick={() => {
                            setSkuData(element)
                            skuModal.onOpen()
                        }} />
                    </Box>
                    <Box><Image src={infoIcon} width={"16px"} height={"16px"} cursor={"pointer"} /></Box>
                    {!productID ?
                        <Box>
                            <Image onClick={() => DeleteSku(elementKey)} src={deleteIcon} width={"16px"} height={"16px"} cursor={"pointer"} />
                        </Box>
                        : null}
                </>
            </HStack>
            <SkuTableModal open={skuModal.isOpen} close={skuModal.onClose} skuData={SkuData} />
            <RecordModal open={SkuData && recordModal.isOpen} skuID={SkuData?._id} close={recordModal.onClose} />
        </>
    )
}

export default SkuTableOptions