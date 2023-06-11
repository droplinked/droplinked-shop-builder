import AppTable from 'components/common/table/AppTable'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import SkuTableModel from './model';
import { productContext } from 'pages/product/single/context';
import SkeletonProduct from '../../../skeleton/SkeletonProduct';
import SkuTableOptions from './parts/options/SkuTableOptions';
import RecordModal from './parts/recordModal/RecordModal';
import SkuTableModal from './parts/skuModal/SkuTableModal';

function SkuTable() {
    const { state: { sku, product_type } } = useContext(productContext)
    const [Sku, setSku] = useState(null)
    const { getRows } = SkuTableModel
    const recordModal = useDisclosure()
    const editModal = useDisclosure()

    const rows = useMemo(() => {
        if (!sku.length) return null

        return sku.map((el, key) => {

            return {
                ...getRows({ sku: el, product_type, key }),
                controls: {
                    caption: "",
                    value: (
                        <>
                            {
                                el?.recordData && el.recordData.status !== "NOT_RECORDED" ?
                                    <Flex justifyContent={"center"}><Text backgroundColor={"#000"} borderRadius="100px" fontSize={"xs"} padding="4px 20px">{el?.recordData.status}</Text></Flex>
                                    :
                                    <SkuTableOptions
                                        element={el}
                                        updateSku={(sku: any) => setSku(sku)}
                                        elementKey={key}
                                        modals={{
                                            editModal: editModal.onOpen,
                                            recordMoal: recordModal.onOpen
                                        }}
                                    />
                            }
                        </>
                    )
                }
            }
        })
    }, [sku, product_type])

    return (
        <>
            <SkeletonProduct>
                {rows && <AppTable rows={rows} />}
            </SkeletonProduct>
            <SkuTableModal open={editModal.isOpen} close={editModal.onClose} skuData={Sku} />
            <RecordModal open={Sku && recordModal.isOpen} product={Sku} close={recordModal.onClose} />
        </>
    )
}

export default SkuTable