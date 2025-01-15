import useAppStore from "lib/stores/app/appStore"

export type PriceConversionParams = {
    amount: number | string
    toUSD?: boolean
}

export function useCurrencyConverter() {
    const { shop: { currency } } = useAppStore()
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

    function getFormattedPrice({ amount, toUSD = false }: PriceConversionParams): string {
        const convertedPrice = convertPrice({ amount, toUSD })
        return `${symbol}${convertedPrice} ${abbreviation}`
    }

    return {
        convertPrice,
        getFormattedPrice,
        symbol,
        abbreviation
    }
}