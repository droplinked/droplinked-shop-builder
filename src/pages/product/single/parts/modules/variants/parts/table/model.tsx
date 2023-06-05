import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { Isku, product_type } from "lib/apis/product/interfaces";
import React from "react";
import FieldsSkuTable from "./parts/fields/FieldsSkuTable";

interface IgetRows {
    sku: Isku
    product_type: product_type
    key: number
}

export default class SkuTableModel {
    static getRows = ({ product_type, sku, key }: IgetRows) => {
        const checkRecord = sku?.recordData && sku.recordData.status !== "NOT_RECORDED"
        return {
            Variant: {
                props: {
                    width: "20%"
                },
                value: `${sku.options[0].value}${sku?.options[1] ? "-" + sku.options[1].value : ""}`
            },
            price: {
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
            ...product_type !== "DIGITAL" && {
                quantity: {
                    value: <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.quantity} name={"quantity"} />
                }
            },
            externalID: {
                value: <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.externalID} name={"externalID"} />
            },
            ...product_type === "NORMAL" && {
                Packaging: {
                    value: (
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.dimensions.height} maxWidth="35px" textAlign={"center"} name={"height"} />
                            <AppTypography size="12px" color={"#808080"}>x</AppTypography>
                            <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.dimensions.length} maxWidth="35px" textAlign={"center"} name={"length"} />
                            <AppTypography size="12px" color={"#808080"}>x</AppTypography>
                            <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.dimensions.width} maxWidth="35px" textAlign={"center"} name={"width"} />
                        </Flex>
                    )
                },
                Weight: {
                    value: (
                        <Flex gap={2} alignItems="center">
                            <FieldsSkuTable isDisabled={checkRecord}  index={key} value={sku.weight} name={"weight"} />
                            <AppTypography size="12px" color={"#808080"}>oz</AppTypography>
                        </Flex>
                    )
                },
            },
        }
    }
}