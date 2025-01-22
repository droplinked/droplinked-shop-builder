import { Box, ChakraProps } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';
import React from 'react'

interface Props {
    strokeColor?: string;
    svgStyle?: ChakraProps
}

export default function CurrencyIcon({ strokeColor = "#7b7b7b", svgStyle = { width: "20px", height: "20px" } }: Props) {
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
                return <AppTypography fontSize={16} color={strokeColor}>{symbol}</AppTypography>
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
        <Box sx={{ path: { stroke: strokeColor }, svg: svgStyle }}>
            {renderIcon()}
        </Box>
    )
}
