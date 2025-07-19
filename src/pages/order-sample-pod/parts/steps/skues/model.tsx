import { Box, HStack } from "@chakra-ui/react";
import AppSelectBox from "components/common/form/select/AppSelectBox";
import AppTypography from "components/common/typography/AppTypography";
import { PriceConversionParams } from "hooks/useCurrencyConverter/useCurrencyConverter";
import { typesProperties } from "utils/constants/types";
import { IproductOrderSkues } from "pages/order-sample-pod/context";
import React from "react";

interface Irows {
    product: any;
    SkuesIDs: string[];
    skus: IproductOrderSkues;
    updateState: any;
    orderId: string;
    t: (key: string) => string;
}
interface ICurrencyConverter {
    convertPrice: (params: PriceConversionParams) => void;
    getFormattedPrice: (params: PriceConversionParams) => void;
    abbreviation: string;
    symbol: string;
}

namespace productOrderSkuesModel {
    export const rows = (
        { product, SkuesIDs, skus, updateState, orderId, t }: Irows,
        currencyConverter: ICurrencyConverter
    ) =>
        product
            ? product.skuIDs.map((el) => {
                const option = (type: "color" | "Size") =>
                    el.options.find(
                        (option) =>
                            option.variantID ===
                            typesProperties[type === "color" ? 0 : 1]._id
                    );
                const { convertPrice, abbreviation, symbol } = currencyConverter;
                return {
                    _data: el,
                    variant: {
                        caption: t("ProductOrderSkues.variant"),
                        value: (
                            <HStack alignItems="center">
                                {option("color") && (
                                    <Box
                                        backgroundColor={option("color")?.value}
                                        width="16px"
                                        height="16px"
                                        borderRadius="100%"
                                    ></Box>
                                )}
                                {option("Size") && (
                                    <AppTypography>{option("Size")?.value}</AppTypography>
                                )}
                            </HStack>
                        ),
                    },
                    cost: {
                        caption: t("ProductOrderSkues.productCost"),
                        value: (
                            <AppTypography>
                                {`${symbol}${convertPrice({
                                    amount: el?.rawPrice,
                                    toFixed: true,
                                })}`}{" "}
                                <Box as="span" color="#808080">
                                    {abbreviation}
                                </Box>
                            </AppTypography>
                        ),
                    },
                    quantity: {
                        caption: t("ProductOrderSkues.quantity"),
                        value: (
                            <AppSelectBox
                                isDisabled={!SkuesIDs.includes(el._id) || !!orderId}
                                items={Array.from({ length: 20 }).map((el, key) => ({
                                    caption: key.toString(),
                                    value: key,
                                }))}
                                name=""
                                value={skus[el._id]?.quantity || 0}
                                onChange={(e) =>
                                    updateState("skus", {
                                        ...skus,
                                        [el._id]: {
                                            _id: el._id,
                                            quantity: parseInt(e.target.value),
                                        },
                                    })
                                }
                            />
                        ),
                    },
                };
            })
            : [];
}

export default productOrderSkuesModel;
