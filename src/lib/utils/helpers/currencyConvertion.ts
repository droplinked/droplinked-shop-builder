export const currencyConvertion = (amount: number | string, rate: number, returnUSD: boolean) => {
    if (isNaN(amount) || isNaN(rate)) {
        return 0;
    }
    if (returnUSD) {
        return (amount / rate).toFixed(2);
    } else {
        return (amount * rate).toFixed(2);
    }
} 
