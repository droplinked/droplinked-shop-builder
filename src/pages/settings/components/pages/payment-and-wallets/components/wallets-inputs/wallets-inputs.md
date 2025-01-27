# WalletsInputs Documentation 🚀

Welcome to the WalletsInputs module! This collection of components and logic helps manage multiple wallet addresses and their percentage allocations.

---

## Overview 🌐

1. **WalletInputs** (Main Component)
2. **WalletRow** (Row Container)
3. **WalletAddressInput** (Address Field)
4. **PercentageInput** (Percentage Field)
5. **ActionButtons** (Edit/Delete Buttons)
6. **Helpers** (Utility functions for data filtering and default descriptions)

---

## 1. WalletInputs Component 💳

• File: `WalletsInputs.tsx`  
• Purpose: The main UI section for configuring wallet addresses and their corresponding percentages.

### Key Points
- **tempData**: A local state array that temporarily holds user-updated wallets (to avoid directly mutating Formik state).
- **handleAddWallet**: Adds a new wallet entry with default 0% allocation.
- **handleDelete**: Removes a wallet entry (unless it’s the only one).
- **handleChange**: Updates the address or percentage of a specific wallet.
- **handleSave**: Persists the temporary state changes into the main Formik state.
- **handleSetDefault**: Sets the single Circle wallet as the default if available (overwrites all percentages to 100%).

The component also renders a badge to quickly mark the wallet as default and a “Target Wallet” button to add new wallet addresses.

---

## 2. WalletRow Component 📋

• File: `WalletRow.tsx`  
• Purpose: Displays a single row with address input, percentage input, and action buttons (edit/delete).

### Key Points
- **isEditing**: Toggles whether the row inputs are in an editable mode.
- **onEdit**, **onDelete**, **onSave**: Handlers that trigger the parent’s logic to modify wallets.

---

## 3. WalletAddressInput Component 📬

• File: `WalletAddressInput.tsx`  
• Purpose: Address input field with a “Save” button on the right side.

### Key Points
- **isEditing**: Controls whether the input is disabled or can accept changes.
- **isButtonDisabled**: Determines if the “Save” button is visible based on user input presence.

---

## 4. PercentageInput Component 📈

• File: `PercentageInput.tsx`  
• Purpose: Numeric input for setting a wallet’s allocation in percentages.

### Key Points
- **value**: The current percentage.
- **isDisabled**: If not in editing mode, this field is read-only.

---

## 5. ActionButtons Component 🎛️

• File: `ActionButtons.tsx`  
• Purpose: Edit and Delete buttons for each wallet row.

### Key Points
- **onEdit**: Enables editing mode.
- **onDelete**: Removes the wallet row (if allowed).
- **isSingleWallet**: Disables deletion if there’s only one wallet.

---

## 6. Helpers 💡

• File: `helpers.ts`  
• **getDescription(isSolana?: boolean)**: Returns text describing the purpose of the wallet setup.  
• **getWalletsData(values, walletType)**: Fetches existing data for a specific wallet type or provides a default.

---

## Common Flow 🏗️

1. **Adding a Wallet**  
   - User clicks “Target Wallet”.  
   - A new empty row is inserted with 0% allocation.  

2. **Deleting a Wallet**  
   - If more than one row exists, the user can delete a row.  

3. **Editing and Saving**  
   - Clicking the edit button enables editing mode.  
   - After modifying address and percentage, clicking “Save” updates the row, then updates parent state.  

4. **Setting a Default Wallet**  
   - If Circle’s wallet is available, a single wallet row is created and assigned 100%.  

This system ensures you can mix multiple wallet addresses for payment or rely solely on Circle’s default address. All changes are stored in Formik’s `paymentWallets` field for easy form submission.

---
