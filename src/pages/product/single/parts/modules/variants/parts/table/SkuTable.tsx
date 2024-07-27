import { Flex, Text, useDisclosure, Input, Button } from '@chakra-ui/react';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppTable from 'components/common/table/AppTable';
import useAppToast from 'functions/hooks/toast/useToast';
import productTypeLegalUsageMap from 'lib/utils/heper/productTypeLegalUsageMap';
import { productContext } from 'pages/product/single/context';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import SkeletonProduct from '../../../skeleton/SkeletonProduct';
import SkuTableModel from './model/model';
import DetailsModal from './parts/detailsModal/DetailsModal';
import SkuTableOptions from './parts/options/SkuTableOptions';
import RecordModal from './parts/recordModal/RecordModal';
import SkuTableModal from './parts/skuModal/SkuTableModal';
import AppTypography from 'components/common/typography/AppTypography';

function SkuTable() {
    const { showToast } = useAppToast();
    const { state, store: { state: { available_variant } }, methods: { fetch, updateState } } = useContext(productContext);
    const [Sku, setSku] = useState(null)
    const { getRows } = SkuTableModel;
    const recordModal = useDisclosure();
    const editModal = useDisclosure();
    const detailsModal = useDisclosure();
    const [generalPrice, setGeneralPrice] = useState();
    const [generalQuantity, setGeneralQuantity] = useState(0);

    const handleGeneralPriceChange = (e) => {
        const newPrice = e.target.value;
        setGeneralPrice(newPrice);
        const updatedSku = state.sku.map(sku => ({
            ...sku,
            price: newPrice
        }));
        updateState("sku", updatedSku);
    };

    const handleGeneralQuantityChange = (e) => {
        const newQuantity = e.target.value;
        setGeneralQuantity(newQuantity);
        const updatedSku = state.sku.map(sku => ({
            ...sku,
            quantity: newQuantity
        }));
        updateState("sku", updatedSku);
    };

    const checkDropLegalUsage = () => {
        const { errorMessage, key } = productTypeLegalUsageMap["drop"]
        const legalUsage = state.legalUsage.find(obj => obj.key === key)
        if ((legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0))
            return recordModal.onOpen()
        showToast({ message: errorMessage, type: "error" })
    }

    const setAllSku = () => {
        setSku(state.sku);
    };

    const rows = useMemo(() => {
        if (!state.sku.length) return null

        return state.sku.map((el, key) => {
            return {
                ...getRows({ sku: el, state, key, available_variant, onPriceChange: handleGeneralPriceChange, generalPrice, onQuantityChange: handleGeneralQuantityChange, generalQuantity }),
                controls: {
                    caption:
                        <Flex flexDirection={"column"} alignItems={"center"} gap={"16px"}>
                            <AppTypography>Drop</AppTypography>
                            {el.recordData.status !== "RECORDED" && 
                            <SkuTableOptions
                                element={el}
                                updateSku={setAllSku}
                                elementKey={key}
                                modals={{
                                    editModal: editModal.onOpen,
                                    recordMoal: checkDropLegalUsage
                                }}
                            />}
                        </Flex>,
                    props: {
                        style: { textAlign: "center" }
                    },
                    value: (
                        <>
                            {
                                el?.recordData ?
                                    el.recordData.status === "RECORDED" ?
                                        <Flex justifyContent={"center"}>
                                            <BlockchainDisplay
                                                blockchain={el.recordData.recordNetwork}
                                                show="icon"
                                                props={{
                                                    width: "25px",
                                                    height: "25px",
                                                    cursor: "pointer",
                                                    onClick: () => {
                                                        setSku(el)
                                                        detailsModal.onOpen()
                                                    }
                                                }}
                                            />
                                        </Flex>
                                        :
                                        el.recordData.status !== "NOT_RECORDED"
                                            ?
                                            <Flex justifyContent={"center"}>
                                                <Text backgroundColor={"#000"} borderRadius="100px" fontSize={"xs"} padding="4px 20px">
                                                    {el?.recordData.status}
                                                </Text>
                                            </Flex>
                                            :
                                            <SkuTableOptions
                                                element={el}
                                                updateSku={(sku: any) => setSku(sku)}
                                                elementKey={key}
                                                modals={{
                                                    editModal: editModal.onOpen,
                                                    recordMoal: checkDropLegalUsage
                                                }}
                                            />
                                    : <SkuTableOptions
                                        element={el}
                                        updateSku={(sku: any) => setSku(sku)}
                                        elementKey={key}
                                        modals={{
                                            editModal: editModal.onOpen,
                                            recordMoal: checkDropLegalUsage
                                        }}
                                    />
                            }
                        </>
                    )
                }
            }
        })
    }, [state.sku, state.artwork, state.artwork2, state.m2m_positions, state.product_type, available_variant, state.prodviderID])

    const closeModal = useCallback(async () => {
        const skues = await fetch()
        updateState("sku", skues.sku)
        recordModal.onClose()
    }, [])

    return (
        <>
            <SkeletonProduct>
                {rows && <AppTable rows={rows} />}
            </SkeletonProduct>
            <SkuTableModal open={editModal.isOpen} close={editModal.onClose} skuData={Sku} />
            <RecordModal open={Sku && recordModal.isOpen} product={state} sku={Sku} close={closeModal} />
            {detailsModal.isOpen && <DetailsModal open={detailsModal.isOpen} close={detailsModal.onClose} sku={Sku} />}
        </>
    )
}

export default SkuTable;
