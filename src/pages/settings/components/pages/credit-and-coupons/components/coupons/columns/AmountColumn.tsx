import AppTypography from "components/common/typography/AppTypography";
import useAppStore from "lib/stores/app/appStore";
import { currencyConvertion } from "lib/utils/helpers/currencyConvertion";
import React from "react";

interface Props {
    type: "DISCOUNT" | "CREDIT";
    balance: number;
}

export default function AmountColumn({ type, balance }: Props) {
    const { shop: { currency } } = useAppStore();

    return (
        type === "DISCOUNT" ? (
            <AppTypography>{balance}%</AppTypography>
        ) : (
            <AppTypography
                color={"#fff"}
                sx={{ span: { color: "#7B7B7B" } }}
            >
                {currency?.symbol}{" "}
                {currencyConvertion(balance, currency?.conversionRateToUSD, false)}{" "}
                <span>{currency?.abbreviation}</span>
            </AppTypography>
        )
    );
}
