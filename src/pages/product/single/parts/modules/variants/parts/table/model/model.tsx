import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { IproductState, Isku } from "lib/apis/product/interfaces";
import React from "react";
import CoverSku from "../parts/cover/CoverSku";
import FieldsSkuTable from "../parts/fields/FieldsSkuTable";
import VariantsUnlimited from "../parts/unlimited/VariantsUnlimited";

interface IgetRows {
    sku: Isku
    state: IproductState
    key: number
    available_variant: Array<any>
    onPriceChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    generalPrice?: number
    onQuantityChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    generalQuantity?: number
}

const SkuTableModel = ({
    getRows: ({ state, sku, key, available_variant, onPriceChange, generalPrice, onQuantityChange, generalQuantity }: IgetRows) => {
        const checkRecord = sku?.recordData && sku.recordData.status !== "NOT_RECORDED";
        const product_type = state.product_type;

        return {
            Variant: {
                caption: 
                    <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"16px"}>
                        <AppTypography>Variant</AppTypography>
                        <AppTypography>Change All</AppTypography>
                    </Flex>,
                props: {
                    width: "20%"
                },
                value: sku?.options?.map(el => el?.caption).join("-")
            },
            price: {
                caption: 
                    <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"8px"}>
                        <AppTypography>{product_type === "PRINT_ON_DEMAND" ? "Retail Price" : "Price"}</AppTypography>
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable
                                isDisabled={checkRecord}
                                index={key}
                                value={generalPrice}
                                name={"price"}
                                onChange={onPriceChange}
                                placeholder="0"
                            />
                            <AppTypography fontSize="12px" color={"#808080"}>USD</AppTypography>
                        </Flex>
                    </Flex>,
                props: {
                    width: "20%"
                },
                value: (
                    <Flex gap={2} alignItems="center">
                        <FieldsSkuTable
                            isDisabled={checkRecord}
                            index={key}
                            value={sku.price}
                            name={"price"}
                        />
                        <AppTypography fontSize="12px" color={"#808080"}>USD</AppTypography>
                    </Flex>
                )
            },
            externalID: {
                caption: "External ID",
                value: <FieldsSkuTable isDisabled={checkRecord || product_type === "PRINT_ON_DEMAND"} index={key} value={sku.externalID} name={"externalID"} />
            },
            ...product_type !== "PRINT_ON_DEMAND" && {
                quantity: {
                    caption: 
                        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"8px"}>
                            <AppTypography>Quantity</AppTypography>
                            {product_type === "DIGITAL" ? <VariantsUnlimited isDisabled={checkRecord} index={key} value={generalQuantity} onChange={onQuantityChange} name={"unlimited"} /> : <FieldsSkuTable isDisabled={checkRecord} index={key} value={generalQuantity} onChange={onQuantityChange} name={"quantity"} placeholder="0" />}
                        </Flex>,
                    value: product_type === "DIGITAL" ? <VariantsUnlimited isDisabled={checkRecord} index={key} value={sku.quantity} name={"unlimited"} /> : <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.quantity} name={"quantity"} />
                },
            },
            ...product_type === "PRINT_ON_DEMAND" && {
                cost: {
                    caption: "Product Cost",
                    value: available_variant ? <AppTypography fontSize="12px">{sku.rawPrice} USD</AppTypography> : 0
                },
            },
            ...product_type === "NORMAL" && {
                Packaging: {
                    caption: "Packaging Size",
                    value: (
                        <Flex gap={2} alignItems="center">
                            <Flex gap={1} alignItems="center">
                                <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.height} maxWidth="35px" textAlign={"center"} name={"height"} />
                                <AppTypography fontSize="12px" color={"#808080"}>x</AppTypography>
                                <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.length} maxWidth="35px" textAlign={"center"} name={"length"} />
                                <AppTypography fontSize="12px" color={"#808080"}>x</AppTypography>
                                <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.width} maxWidth="35px" textAlign={"center"} name={"width"} />
                            </Flex>
                            <AppTypography fontSize="12px" color={"#808080"}>Inc</AppTypography>
                        </Flex>
                    )
                },
                Weight: {
                    value: (
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.weight} name={"weight"} />
                            <AppTypography fontSize="12px" color={"#808080"}>oz</AppTypography>
                        </Flex>
                    )
                },
            },
            Cover: {
                value: <CoverSku index={key} image={sku.image} />
            },
        }
    }
})

export default SkuTableModel;
