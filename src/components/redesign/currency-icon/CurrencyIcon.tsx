import { Box, BoxProps } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';
import React from 'react';

export default function CurrencyIcon({ ...boxProps }: BoxProps) {
    const { symbol, abbreviation } = useCurrencyConverter()

    const renderIcon = () => {
        switch (abbreviation) {
            case "USD":
                return <AppIcons.DollarSign />
            case "EUR":
                return <AppIcons.Euro />
            case "JPY":
                return <AppIcons.JapaneseYen />
            case "GBP":
                return <AppIcons.Pound />
            case "AUD":
                return <AppTypography userSelect={"none"} fontSize={16} color={"#7b7b7b"}>{symbol}</AppTypography>
            case "CAD":
                return <AppIcons.CanadianDollar />
            case "AED":
                return <AppIcons.Dirham />
            case "CNY":
                return <AppIcons.ChineseYuan />
            default:
                return null;
        }
    }

    return (
        <Box
            __css={{
                path: { stroke: "#7b7b7b" },
                svg: { width: "20px", height: "20px" }
            }}
            {...boxProps}
        >
            {renderIcon()}
        </Box>
    )
}
