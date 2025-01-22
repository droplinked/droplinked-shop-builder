import AppTypography from "components/common/typography/AppTypography";
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice";
import React from "react";

interface Props {
    type: "DISCOUNT" | "CREDIT";
    balance: number;
}

export default function AmountColumn({ type, balance }: Props) {
    return (
        type === "DISCOUNT" ? (
            <AppTypography fontSize={16}>{balance}%</AppTypography>
        ) : (
            <FormattedPrice fontSize={16} price={balance} />
        )
    );
}
