import React, { useCallback, useContext } from 'react'
import { Box, HStack, Image } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import { IRecordModalProduct } from '../recordModal/RecordModal'
import { Isku } from 'lib/apis/product/interfaces'
import introductionClass from 'pages/product/single/parts/general/model'
import AppIcons from 'assest/icon/Appicons';

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
                            <AppIcons.tearIcon
                                onClick={() => {
                                    recordMoal()
                                    updateSku(RecordModalData())
                                }}
                                width={"16px"} height={"16px"} cursor={"pointer"} />
                        </Box>
                    )}
                </>
            </HStack>
        </>
    )
}

export default SkuTableOptions