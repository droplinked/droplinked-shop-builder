import { Flex, Td, Tr } from "@chakra-ui/react";
import AppImage from "components/common/image/AppImage";
import React from "react";
import { SerializedCartItem } from "../InvoiceProductTable";
import ProductTitleCell from "./ProductTitleCell";
import SKURemoveButton from "./SKURemoveButton";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";

function ItemRow({ cartItem, hasActionColumn }: { cartItem: SerializedCartItem, hasActionColumn?: boolean }) {
    const { product, skus } = cartItem
    const { getFormattedPrice } = useCurrencyConverter()

    return (
        <>
            {skus.map((sku, index) => (
                <Tr position={"relative"} key={sku._id} borderBottom={sku === skus[skus.length - 1] ? 'default' : 'none !important'}>
                    <Td>
                        <Flex alignItems="center" gap={3} display={index === 0 ? "flex" : "none"}>
                            <AppImage src={product.m2m_preview || product.skuImage || product.image} width={12} height={12} />
                            <ProductTitleCell title={product.title} wordLimit={10} />
                        </Flex>
                    </Td>
                    <Td>{sku.options?.color?.caption || '-'}</Td>
                    <Td>{sku.options?.size?.caption || '-'}</Td>
                    <Td>{sku.options?.quantity || '-'}</Td>
                    <Td>{`${getFormattedPrice({ amount: sku.totals?.priceItem, toFixed: true })}` || '-'}</Td>
                    {hasActionColumn && <SKURemoveButton itemId={sku._id} />}
                </Tr>
            ))}
        </>
    )
}

export default ItemRow