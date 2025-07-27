import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react"
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"

/**
 * FormattedPrice Component - Displays price with currency formatting
 * 
 * Automatically formats and displays prices with the appropriate currency symbol
 * and abbreviation based on the user's selected currency settings.
 * 
 * The display order adapts to text direction:
 * - In LTR (e.g., English): [symbol][price] [abbreviation]
 *   Example: $1,234.56 USD
 * - In RTL (e.g., Arabic): [abbreviation] [price] [symbol]
 *   Example: USD 1,234.56 $
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
    const { isRTL } = useLocaleResources("common")    

    // Convert and format the price
    const formattedPrice = formatPrice(convertPrice({ amount: price, toUSD: false }), isRTL)

    return (
        <Text
            color="neutral.white"
            {...(isRTL
                ? { direction: 'rtl', textAlign: 'right' }
                : { direction: 'ltr', textAlign: 'left' })}
            {...rest}
        >
            {isRTL ? (
                <>
                    <Box as="span" color="#B1B1B1" {...abbreviationProps}>
                        {abbreviation}
                    </Box>{" "}
                    {formattedPrice}
                    <Box as="span" mx="1">
                        {symbol}
                    </Box>
                </>
            ) : (
                <>
                    {symbol}
                    {formattedPrice}{" "}
                    <Box as="span" color="#B1B1B1" {...abbreviationProps}>
                        {abbreviation}
                    </Box>
                </>
            )}
        </Text>
    )
}

function formatPrice(price: number, isRTL: boolean): string {
    return price.toLocaleString(isRTL ? 'ar-EG' : undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}