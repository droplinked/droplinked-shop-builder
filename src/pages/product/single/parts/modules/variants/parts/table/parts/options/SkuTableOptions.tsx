import React, { useCallback, useContext } from 'react'
import { Box, HStack, Tooltip } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import { Isku } from 'lib/apis/product/interfaces'
import introductionClass from 'pages/product/single/parts/general/model'
import AppIcons from 'assest/icon/Appicons';
import { useMemo } from 'react'
import classes from './style.module.scss'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import { IRecordModalProduct } from '../recordModal/RecordModal'

interface IProps {
    element: Isku
    elementKey: number
    updateSku: Function
    modals: {
        editModal: any
        recordMoal: any
    }
}

function SkuTableOptions({ element, updateSku, modals: { recordMoal } }: IProps) {
    const { state, productID } = useContext(productContext)

    const isDisable = useMemo(() => !state.publish_product || !productID, [state, productID])

    return (
        <>
            <HStack width={"100%"} spacing={5} justifyContent={"center"}>
                <>
                    <Box className={isDisable ? classes.isDisable : ''}>
                        <AppTooltip label="Product Must Publish First" isDisabled={!isDisable}>
                            <AppIcons.TearIcon
                                onClick={() => {
                                    if (isDisable) return false
                                    recordMoal()
                                    updateSku(element)
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