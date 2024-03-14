import { Box, HStack } from "@chakra-ui/react"
import AppSelectBox from "components/common/form/select/AppSelectBox"
import AppTypography from "components/common/typography/AppTypography"
import { typesProperties } from "lib/utils/statics/types"
import { IproductOrderSkues } from "pages/product/order/context"
import React from "react"

interface Irows {
    product: any
    SkuesIDs: string[]
    skus: IproductOrderSkues
    updateState: any
    orderId: string
}

namespace productOrderSkuesModel {
    export const rows = ({ product, SkuesIDs, skus, updateState, orderId }: Irows) => product ? product.skuIDs.map(el => {
        const option = (type: 'color' | 'Size') => el.options.find(option => option.variantID === typesProperties[type === "color" ? 0 : 1]._id)
        return {
            _data: el,
            variant: {
                value: (
                    <HStack alignItems="center">
                        {option('color') && <Box backgroundColor={option('color')?.value} width="16px" height="16px" borderRadius="100%"></Box>}
                        {option('Size') && <AppTypography>{option('Size')?.value}</AppTypography>}
                    </HStack>
                )
            },
            cost: {
                caption: "Product Cost",
                value: (
                    <HStack spacing={2}>
                        <AppTypography>{el?.rawPrice}</AppTypography>
                        <AppTypography color="#808080">USD</AppTypography>
                    </HStack>
                )
            },
            quantity: {
                value: (
                    <AppSelectBox
                        isDisabled={!SkuesIDs.includes(el._id) || !!orderId}
                        items={Array.from({ length: 20 }).map((el, key) => ({ caption: key.toString(), value: key }))}
                        name=""
                        value={skus[el._id]?.quantity || 0}
                        onChange={e => updateState('skus', { ...skus, [el._id]: { _id: el._id, quantity: parseInt(e.target.value) } })}
                    />
                )
            }
        }
    }) : []
}

export default productOrderSkuesModel