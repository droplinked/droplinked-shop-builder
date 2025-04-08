/**
 * useCurrencyConverter hook
 *
 * Provides functions to convert and format prices based on the shop's currency.
 * Defaults to USD values when no shop data is available.
 */

import useAppStore from "lib/stores/app/appStore"

export type PriceConversionParams = {
    amount: number | string
    toUSD?: boolean
    toFixed?: boolean
}

export function useCurrencyConverter() {
    const { shop } = useAppStore()
    const defaultCurrency = { conversionRateToUSD: 1, symbol: '$', abbreviation: 'USD' } // defined default currency because in affiliate public pages we do not have shop data
    const currency = shop?.currency ?? defaultCurrency
    const { conversionRateToUSD, symbol, abbreviation } = currency

    function convertPrice({ amount, toUSD = false }: PriceConversionParams): number {
        const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(numericAmount) || isNaN(conversionRateToUSD)) {
            return 0
        }

        const convertedAmount = toUSD
            ? numericAmount / conversionRateToUSD
            : numericAmount * conversionRateToUSD

        return convertedAmount
    }

    function getFormattedPrice({ amount, toUSD = false, toFixed = false }: PriceConversionParams): string {
        const convertedPrice = convertPrice({ amount, toUSD })
        const formattedPrice = toFixed ? convertedPrice.toFixed(2) : convertedPrice
        return `${symbol}${formattedPrice} ${abbreviation}`
    }

    return {
        convertPrice,
        getFormattedPrice,
        symbol,
        abbreviation
    }
}