# 🌐 `currencyConvertion` Function

The `currencyConvertion` function 💱 helps convert prices between different currencies in a multi-currency application. It returns a formatted numeric string (two decimal places) that represents the converted amount, ensuring easy handling and display of prices.

---

### 📜 **Function Definition**

```typescript
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
```

---

### 📌 **Parameters**

- **`amount`**: `number | string`  
  🔢 The amount to be converted, which can be a number or a numeric string.

- **`rate`**: `number`  
  💵 The conversion rate between the current currency and USD (e.g., EUR to USD conversion rate).

- **`returnUSD`**: `boolean`  
  🌍 A flag to control the conversion direction:
  - **`true`**: Converts `amount` to USD.
  - **`false`**: Converts USD to the target currency.

---

### 🎯 **Return Value**

Returns a `string` representing the converted amount, formatted to two decimal places. If either `amount` or `rate` is not a valid number, it returns `"0"`.

---

### 💡 **Usage Example**

To display currency symbols or abbreviations alongside the converted amount, you can access them from the `currency` object in `shopData` as follows:

```javascript
const { shop: shopData } = useAppStore();
const { currency } = shopData;
```

Using this structure, you can display the converted amount with the currency symbol and abbreviation:

```javascript
<AppTypography color={"#2BCFA1"} fontSize={16} fontWeight={600}>
    {currency?.symbol} {/* Currency symbol, e.g., $ or € */}
    {currencyConvertion(shop?.credit, currency?.conversionRateToUSD, false)}
    {currency?.abbreviation} {/* Currency abbreviation, e.g., USD, EUR */}
</AppTypography>
```

---

### 📝 **Example Breakdown**

- **`currency?.symbol`**: Shows the currency symbol, like `$` for USD or `€` for EUR.
- **`currencyConvertion(...)`**: Converts the `shop?.credit` amount to the selected currency using the given rate.
- **`currency?.abbreviation`**: Appends the currency abbreviation, such as `USD` or `EUR`.

---

### ⚠️ **Notes**

- ✅ Ensure that `amount` and `rate` are valid numbers to prevent errors.
- 💡 The function performs basic linear conversion and does not manage complex scenarios like localized decimal formats.