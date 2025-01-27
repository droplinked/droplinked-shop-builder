# TokenPay Components Documentation 🚀

## Overview
`TokenPay` is a set of components that enable users to manage and accept payments in native tokens (EVM, Solana, etc.). It works closely with Formik for state management and uses React Query for fetching payment methods. Below is a brief explanation of each part of the system.

---

## TokenPay 🔍
• Purpose: Central hub for configuring token-based payment options.  
• Integrates with a Formik form (`ISettings`) to read and update selected payment methods.  
• Fetches available tokens from `paymentPublicServiceV2()` using React Query.  
• Displays existing payment tokens, allowing the user to add or remove them with the help of the modal.  

Key features:
1. Opens `TokensModal` when the user clicks “Payment Token.”  
2. Filters out non-token methods (like Stripe or Coinbase) from the UI.  
3. Uses `BlockchainDisplay` to show token logos.  

---

## PaymentToken 🏷
• Reusable card component that shows an individual token’s details.  
• Displays an icon, token title, and a trash icon for removing it from the list.  
• Uses Chakra UI elements (`Flex`, `Box`) for layout.  

---

## TokensModal 💼
• Offers a searchable and filterable list of tokens.  
• Users can type in the search bar to filter tokens by name or symbol.  
• “All Networks” option resets the filter to show every available token.  
• Built on `AppModal` to follow the system’s design patterns.  

---

## TokensListContainer 🔗
• Accepts a list of tokens and renders them in a grid.  
• Splits tokens into EVM or Solana (depending on prop `isEvm`).  
• Shows a tooltip warning about wallet requirements if `isEvm` is false.  
• Renders multiple `TokenCard` items.  

---

## TokenCard 🔒
• Represents an individual token's configuration.  
• Uses a `SwitchBox` to toggle active/inactive states for each token.  
• Interacts with Formik to update the `paymentMethods` array.  
• Displays chain networks and icons via `TokensIcon`.  

---

## TokensIcon 🖼
• Renders a small group of chain icons using `BlockchainDisplay`.  
• Intended to visually indicate the blockchains each token supports.  

---

## TokenPayInformation ℹ️
• Contains helpful messages and tips about setting up TokenPay.  
• “Learn More” link and a warning `MessageBox` about wallet requirements.  

---

## Core Logic Highlights ⚙️
1. **React Query** – Fetches token data (`paymentPublicServiceV2()`) and handles loading states.  
2. **Formik State Updates** – Tracks toggling and removing chosen tokens:
   - On toggle ↓  
     • Updates `paymentMethods` array with new or adjusted token.  
   - On remove ↓  
     • Filters out the relevant token from the `paymentMethods`.  
3. **Filtering** – Uses `searchTerm` to filter tokens by name or symbol and network dropdown to show EVM/Solana or “All Networks.”  
