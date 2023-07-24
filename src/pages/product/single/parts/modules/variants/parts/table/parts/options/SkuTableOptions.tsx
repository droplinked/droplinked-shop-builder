import React, { useCallback, useContext } from 'react'
import { Box, HStack, Tooltip } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import { IRecordModalProduct } from '../recordModal/RecordModal'
import { Isku } from 'lib/apis/product/interfaces'
import introductionClass from 'pages/product/single/parts/general/model'
import AppIcons from 'assest/icon/Appicons';
import { useMemo } from 'react'
import classes from './style.module.scss'
import AppTooltip from 'components/common/tooltip/AppTooltip'

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
    const { state, productID } = useContext(productContext)

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

    const isDisable = useMemo(() => !state.publish_product || !productID, [state, productID])

    return (
        <>
            <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                <>
                    <Box className={isDisable ? classes.isDisable : ''}>
                        <AppTooltip label="Product Must Publish First" isDisabled={!isDisable}>
                            <AppIcons.tearIcon
                                onClick={() => {
                                    if (isDisable) return false
                                    recordMoal()
                                    updateSku(RecordModalData())
                                }}
                                width={"16px"} height={"16px"} cursor={"pointer"}
                            />
                        </AppTooltip>
                    </Box>
                </>
            </HStack>
        </>
    )
}

export default SkuTableOptions