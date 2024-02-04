import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { Isku, IproductState } from "lib/apis/product/interfaces";
import React from "react";
import FieldsSkuTable from "../parts/fields/FieldsSkuTable";
import ProductSkuesTable from "./modules/table";

interface IgetRows {
    sku: Isku
    state: IproductState
    key: number
    variants: any
}

export default class SkuTableModel {
    private static table = ProductSkuesTable
    static getRows = ({ state, sku, key, variants }: IgetRows) => {
        const checkRecord = sku?.recordData && sku.recordData.status !== "NOT_RECORDED"
        const product_type = state.product_type
        return {
            Variant: {
                props: {
                    width: "20%"
                },
                value: sku.options.map(el => el.value).join("-")
            },
            price: {
                caption: product_type === "PRINT_ON_DEMAND" ? "Retail Price" : "Price",
                props: {
                    width: "20%"
                },
                value: (
                    <Flex gap={2} alignItems="center">
                        <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.price} name={"price"} />
                        <AppTypography size="12px" color={"#808080"}>USD</AppTypography>
                    </Flex>
                )
            },
            externalID: {
                caption: "External ID",
                value: <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.externalID} name={"externalID"} />
            },
            ...product_type !== "PRINT_ON_DEMAND" && {
                quantity: {
                    value: <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.quantity} name={"quantity"} />
                },
            },
            ...product_type === "PRINT_ON_DEMAND" && {
                cost: {
                    caption: "Product Cost",
                    value: variants ? <AppTypography size="12px">{this.table.variants({ variants, state })}</AppTypography> : 0
                },
            },
            ...product_type === "NORMAL" && {
                Packaging: {
                    caption: "Packaging Size",
                    value: (
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.height} maxWidth="35px" textAlign={"center"} name={"height"} />
                            <AppTypography size="12px" color={"#808080"}>x</AppTypography>
                            <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.length} maxWidth="35px" textAlign={"center"} name={"length"} />
                            <AppTypography size="12px" color={"#808080"}>x</AppTypography>
                            <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.dimensions.width} maxWidth="35px" textAlign={"center"} name={"width"} />
                        </Flex>
                    )
                },
                Weight: {
                    value: (
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable isDisabled={checkRecord} index={key} value={sku.weight} name={"weight"} />
                            <AppTypography size="12px" color={"#808080"}>oz</AppTypography>
                        </Flex>
                    )
                },
            },
        }
    }
}