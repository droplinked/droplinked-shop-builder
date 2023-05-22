import React, { useCallback, useContext } from 'react'
import { Box, HStack, Image } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import { IRecordModalProduct } from '../recordModal/RecordModal'
import editIcon from "assest/icon/edit-icon.svg";
import tearIcon from "assest/icon/tear-icon.svg";
import infoIcon from "assest/icon/info-icon.svg";
import deleteIcon from "assest/icon/delete-icon.svg";
import { Isku } from 'lib/apis/product/interfaces'
import introductionClass from 'pages/product/single/parts/general/model'
import AppErrors from 'lib/utils/statics/errors/errors'
import useAppToast from 'hooks/toast/useToast'

interface IProps {
    element: Isku
    elementKey: number
    updateSku: Function
    modals: {
        editModal: any
        recordMoal: any
    }
}

function SkuTableOptions({ element, elementKey, updateSku, modals: { editModal, recordMoal } }: IProps) {
    const { state, methods: { updateState }, productID } = useContext(productContext)
    const { showToast } = useAppToast()

    // Delete sku
    const DeleteSku = useCallback((key: number) => {
        const remove = state.sku.filter((el, index) => index !== key && el)
        updateState("sku", remove)
        showToast(AppErrors.product.variant_has_been_deleted, "info")
    }, [state.sku])

    // make data for "Record Modal"
    const RecordModalData = useCallback((): IRecordModalProduct => {
        return {
            title: state.title,
            description: state.description,
            media: introductionClass.defactorImage(introductionClass.refactorImage(state.media)),
            shippingType: state.shippingType,
            sku: element
        }
    }, [element, state])

    return (
        <>
            <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                <>
                    {productID && (
                        <Box>
                            <Image
                                onClick={() => {
                                    recordMoal()
                                    updateSku(RecordModalData())
                                }}
                                src={tearIcon} width={"16px"} height={"16px"} cursor={"pointer"} />
                        </Box>
                    )}
                    <Box>
                        <Image src={editIcon} width={"16px"} height={"16px"} cursor={"pointer"} onClick={() => {
                            updateSku(element)
                            editModal()
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
        </>
    )
}

export default SkuTableOptions