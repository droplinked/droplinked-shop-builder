import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTable from "components/common/table/AppTable";
import AppTypography from "components/common/typography/AppTypography";
import useAppToast from "functions/hooks/toast/useToast";
import { typesProperties } from "lib/utils/statics/types";
import { productContext } from "pages/product/single/context";
import React, { useContext, useState } from "react";
import ProductTileModal from "./product.tile.modal";
import ProductTileDeleteConfirmationModal from "./product.tile.table.delete";

function ProductTileTable() {
    const {
        state: { productTile },
    } = useContext(productContext);
    const [selectedTile, setSelectedTile] = useState(null);
    const confirmationModal = useDisclosure();
    const productTileModal = useDisclosure();
    const { showToast } = useAppToast();
    const basic_cta_row_style = { align: "center", gap: 2, color: "#C2C2C2", borderRadius: "6px", p: "8px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" };
    const rows =
        productTile?.map((tile) => {
            const option = (index: number, type: "color" | "size") => tile.skuIDs[index].options.find((option) => option.variantID === typesProperties[type === "color" ? 0 : 1]._id);
            return {
                _data: tile as any,
                variants: {
                    value: (
                        <Flex alignItems="center" flexWrap={"wrap"} gap={4}>
                            {tile.skuIDs.map((sku, index) => (
                                <Flex
                                    key={sku._id}
                                    position={"relative"}
                                    alignItems="center"
                                    gap={2}
                                    _after={{ content: "''", position: "absolute", top: 0, bottom: 0, right: "-9px", width: "1px", backgroundColor: "#262626" }}
                                    _last={{
                                        _after: { display: "none" },
                                    }}
                                >
                                    {option(index, "color") && <Box backgroundColor={option(index, "color")?.value} width="16px" height="16px" borderRadius="100%"></Box>}
                                    {option(index, "size") && <AppTypography>{option(index, "size")?.value}</AppTypography>}
                                </Flex>
                            ))}
                        </Flex>
                    ),
                },
                cta: {
                    caption: "",
                    value: (
                        <Flex justify="flex-end" align="center" gap={2}>
                            <Flex as="button" {...basic_cta_row_style} onClick={() => {navigator.clipboard.writeText(tile.embedded_tag); showToast({ message: "Copied", type: "info", options: { autoClose: 200, hideProgressBar: true }})}}><AppIcons.CopyIcon width={16} height={16} />Copy Component</Flex>
                            <Flex as="button" {...basic_cta_row_style} onClick={() => {setSelectedTile(tile); productTileModal.onOpen()}}> Edit</Flex>
                            <Flex as="button" {...basic_cta_row_style} onClick={() => {setSelectedTile(tile); confirmationModal.onOpen()}} backgroundColor="#E63F43" ><AppIcons.WhiteTrash /></Flex>
                        </Flex>
                    ),
                },
            };
        }) || [];

    return (
        <>
            <AppTable rows={rows} />
            {productTileModal.isOpen && <ProductTileModal isOpen={productTileModal.isOpen} close={productTileModal.onClose} selectedTile={selectedTile} />}
            <ProductTileDeleteConfirmationModal isOpen={confirmationModal.isOpen} close={confirmationModal.onClose} selectedTile={selectedTile} />
        </>
    );
}

export default ProductTileTable;
