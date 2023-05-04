import AppTable from 'components/shared/table/AppTable'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import SkuTableModal from './parts/skuModal/SkuTableModal'
import { Box, Flex, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import SkuTableModel from './model';
import { productContext } from 'pages/product/single/context';
import { toast } from 'react-toastify';
import SkeletonProduct from '../../../skeleton/SkeletonProduct';
import SkuTableOptions from './parts/options/SkuTableOptions';

function SkuTable() {
    const { state: { sku } } = useContext(productContext)

    const { getRows } = SkuTableModel

    const rows = useMemo(() => {
        if (!sku.length) return null

        return sku.map((el, key) => {

            return {
                ...getRows(el),
                controls: {
                    caption: "",
                    value: (
                        <>
                            {
                                el?.record ?
                                    <Flex justifyContent={"center"}><Text backgroundColor={"#000"} borderRadius="100px" fontSize={"xs"} padding="4px 20px">Record</Text></Flex>
                                    :
                                    <SkuTableOptions element={el} elementKey={key} />
                            }
                        </>
                    )
                }
            }
        })
    }, [sku])

    return (
        <>
            <SkeletonProduct>
                {rows && <AppTable rows={rows} />}
            </SkeletonProduct>
        </>
    )
}

export default SkuTable