import { Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react'

interface Props {
    type: "DISCOUNT" | "CREDIT";
    isExpired: boolean;
}

export default function TypeColumn({ type, isExpired }: Props) {
    const isDiscount = type === "DISCOUNT"
    const color = isExpired ? '#FF2244' : "#2BCFA1"

    return (
        <Flex width={"min-content"} borderRadius={"8px"} sx={{ path: { stroke: color } }} background={isExpired ? "#FF22440D" : "#2BCFA11A"} px={3} py={2} gap={2}>
            <AppIcons.DiscountCouponIcon />
            <AppTypography fontSize={14} color={color}>
                {isDiscount ? "Discount" : "Coupon"}
            </AppTypography>
        </Flex>
    )
}
