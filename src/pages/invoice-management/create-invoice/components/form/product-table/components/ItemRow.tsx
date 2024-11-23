import { Flex, Td, Tr } from "@chakra-ui/react";
import AppImage from "components/common/image/AppImage";
import useAppStore from "lib/stores/app/appStore";
import { currencyConvertion } from "lib/utils/helpers/currencyConvertion";
import React from "react";
import { SerializedCartItem } from "../InvoiceProductTable";
import ProductTitleCell from "./ProductTitleCell";
import SKURemoveButton from "./SKURemoveButton";

function ItemRow({ cartItem, hasActionColumn }: { cartItem: SerializedCartItem, hasActionColumn?: boolean }) {
    const { product, skus } = cartItem
    const { shop: { currency } } = useAppStore()

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
                    <Td>{`${currency?.symbol}${currencyConvertion(sku.totals?.priceItem, currency?.conversionRateToUSD, false)} ${currency?.abbreviation}` || '-'}</Td>
                    {hasActionColumn && <SKURemoveButton itemId={sku._id} />}
                </Tr>
            ))}
        </>
    )
}

export default ItemRow