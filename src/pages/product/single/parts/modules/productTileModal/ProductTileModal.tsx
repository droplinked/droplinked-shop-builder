import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTable from 'components/common/table/AppTable';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { createProductTileService, editProductTileService } from 'lib/apis/product/productServices';
import { useCheckPermission } from 'lib/stores/app/appStore';
import { typesProperties } from 'lib/utils/statics/types';
import { productContext } from 'pages/product/single/context';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';

interface Props {
    isOpen: boolean;
    close: () => void;
    selectedTile?: any;
}

function ProductTileModal({ isOpen, close, selectedTile }: Props) {
    const checkPermissionAndShowToast = useCheckPermission()
    const { state: { sku, productTile }, methods: { updateState } } = useContext(productContext)
    const createProductTile = useMutation(() => createProductTileService({ skuIDs }))
    const editProductTile = useMutation(() => editProductTileService(selectedTile?._id!, { skuIDs }))
    const [skuIDs, setSkuIDs] = useState<string[]>(() => selectedTile?.skuIDs.map(sku => sku._id) ?? [])
    const { showToast } = useAppToast()
    const rows = sku.map(el => {
        const option = (type: 'color' | 'Size') => el.options.find(option => option?.variantID === typesProperties[type === "color" ? 0 : 1]._id)
        return {
            _data: el as any,
            variant: {
                value: (
                    <Flex alignItems="center" gap={1}>
                        {option('color') && <Box backgroundColor={option('color')?.value} width="16px" height="16px" borderRadius="100%"></Box>}
                        {option('Size') && <AppTypography color="#C2C2C2">{option('Size')?.value}</AppTypography>}
                    </Flex>
                )
            },
            cost: {
                caption: "Product Cost",
                value: <AppTypography fontSize={12} color="#C2C2C2">
                    ${el.price} {" "}
                    <Box as="span" color="#808080">USD</Box>
                </AppTypography>
            }
        }
    })
    const handleSave = async () => {
        try {
            if (!checkPermissionAndShowToast("product_tile_display")) return
            if (selectedTile?._id) {
                const { data } = await editProductTile.mutateAsync()
                const newTiles = productTile.map(tile => tile._id === selectedTile._id ? data.data : tile)
                updateState("productTile", newTiles)
            }
            else {
                const { data } = await createProductTile.mutateAsync()
                updateState("productTile", [...(productTile || []), data.data])
            }
            discard()
        } catch (error) {
            showToast({ message: "Something went wrong!", type: "error" })
        }
    }

    const discard = () => {
        setSkuIDs([])
        close()
    }

    return (
        <AppModal open={isOpen} close={discard} size="3xl" isCentered={true} contentProps={{ paddingX: 3, paddingY: 6 }}>
            <Flex direction="column" gap={6}>
                <Flex direction="column" gap={2}>
                    <AppTypography fontSize={16} fontWeight={600} color="#fff">Create a new tile</AppTypography>
                    <AppTypography fontSize={14} color="#fff">Selects all SKUs you want to generate a product tile.</AppTypography>
                </Flex>

                <AppTable
                    checkbox={{
                        state: skuIDs,
                        update: (skuIDs) => {
                            if (skuIDs.length === 0) {
                                return
                            }
                            setSkuIDs([...skuIDs])
                        }
                    }}
                    rows={rows}
                />

                <Flex justify="flex-end" align="center" gap={4}>
                    <BasicButton variant='outline' onClick={discard}>Discard</BasicButton>
                    <BasicButton
                        onClick={handleSave}
                        isLoading={createProductTile.isLoading || editProductTile.isLoading}
                        isDisabled={skuIDs.length === 0 || createProductTile.isLoading || editProductTile.isLoading}
                    >
                        {selectedTile?._id ? "Edit" : "Create New Tile"}
                    </BasicButton>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default ProductTileModal