import useAppStore from "lib/stores/app/appStore"

export type PriceConversionParams = {
    amount: number | string
    toUSD?: boolean
    toFixed?: boolean
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