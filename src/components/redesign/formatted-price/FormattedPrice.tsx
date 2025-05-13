import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react"
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter"
import React from "react"

/**
 * FormattedPrice Component - Displays price with currency formatting
 * 
 * Automatically formats and displays prices with the appropriate currency symbol
 * and abbreviation based on the user's selected currency settings.
 * 
 * @param {object} props - Component props
 * @param {number} props.price - The price value to format and display
 * @param {BoxProps} [props.abbreviationProps] - Additional props for the currency abbreviation text
 * @param {TextProps} props - Additional Chakra UI text props for the price display
 */
interface Props extends TextProps {
    price: number
    abbreviationProps?: BoxProps
}

export default function FormattedPrice({ price, abbreviationProps, ...rest }: Props) {
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter()

    // Convert and format the price
    const formattedPrice = formatPrice(convertPrice({ amount: price, toUSD: false }))

    return (
        <Text color="#fff" {...rest}>
            {symbol}
            {formattedPrice}{" "}
            <Box as="span" color="#B1B1B1" {...abbreviationProps}>
                {abbreviation}
            </Box>
        </Text>
    )
}

function formatPrice(price: number): string {
    return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}