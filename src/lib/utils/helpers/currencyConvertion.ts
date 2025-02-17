export const currencyConvertion = (amount: number | string, rate: number, returnUSD: boolean) : number => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount) || isNaN(rate)) {
        return 0;
    }
    if (returnUSD) {
        return parseFloat((numericAmount / rate).toFixed(2));
    } else {
        return parseFloat((numericAmount * rate).toFixed(2));
    }
} 
