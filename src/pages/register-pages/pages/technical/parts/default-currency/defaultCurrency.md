# 📘 DefaultCurrency Component Documentation

## 📄 Overview
The `DefaultCurrency` component allows users to select the default currency for their store. It fetches a list of available currencies and provides a dropdown for easy selection.

## 📂 Components

### 1️⃣ `DefaultCurrency` (Main Component)
The main component that handles currency data fetching and rendering the UI.

#### **Props**
- **None**

#### **Usage**
```tsx
import DefaultCurrency from "./path/to/DefaultCurrency";

function App() {
  return (
    <div>
      <DefaultCurrency />
    </div>
  );
}
```

---

### 2️⃣ `CurrencySelect` (Sub-component)
A reusable sub-component within `DefaultCurrency` that renders the currency selection dropdown.

#### **Props**
- **`isLoading`** *(boolean)*: Indicates if the currency data is currently loading.
- **`shopInfoLoading`** *(boolean)*: Shows whether the shop information is loading.
- **`currencyAbbreviation`** *(string)*: Displays the currently selected currency abbreviation.
- **`updateState`** *(function)*: Function to update the state. This function changes the data in localStorage and must be used.
- **`currencyData`** *(array)*: List of available currencies to display in the dropdown.

#### **Usage**
```tsx
import { CurrencySelect } from "./path/to/CurrencySelect";

<CurrencySelect
  isLoading={isLoading}
  shopInfoLoading={shopInfoLoading}
  currencyAbbreviation={currencyAbbreviation}
  updateState={updateState}
  currencyData={currencyData}
/>
```

---

### 3️⃣ `DefaultCurrencyDescription` (Sub-component)
A simple component used to render the description of the currency selection within `DefaultCurrency`.

#### **Props**
- **None**

#### **Usage**
```tsx
import { DefaultCurrencyDescription } from "./path/to/DefaultCurrencyDescription";

<DefaultCurrencyDescription />
```

---

## 📝 Additional Notes
- ⚙️ Ensure that the `technicalContext` and `useAppStore` hooks are correctly set up in your application.
- 📡 The `getCurrencyList` function should be configured to retrieve the list of available currencies from your API. This data will populate the currency dropdown.
- ⚠️ Ensure that if users don’t already have the currency object in their `appStore` (localStorage), the backend should force a logout to prompt users to re-fetch their data.
