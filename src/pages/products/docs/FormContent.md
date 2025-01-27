# 🛠️ FormContent Component Documentation

## Overview
The `FormContent` component renders a list of accordions, each representing a section that holds a group of related fields together. Some of the accordions are rendered conditionally based on the product type selected by the user in the product type popover.

## Components

### FormContent
The main component that renders the list of accordions. It uses the `useProductForm` hook to access the form values and conditionally renders accordions based on the product type.

### GeneralInformationAccordion
An accordion that contains fields for general information about the product, such as the product name, description, and category.

### ProductVariantsAccordion
An accordion that renders SKU creating and editing functionality based on the product data. It conditionally renders different components for managing variants and SKUs based on the product type.

### PhysicalProductVariants
A component within `ProductVariantsAccordion` that handles the creation and editing of variants for physical products. It allows users to add different versions of a product (e.g., size, color) and manage SKU settings.

### PODProductVariants
A component within `ProductVariantsAccordion` that handles the creation and editing of variants for print-on-demand (POD) products. It automatically generates SKUs based on the properties provided by the POD provider and allows users to manage bulk pricing.

### DigitalProductSKU
A component within `ProductVariantsAccordion` that handles the SKU settings for digital products. It includes fields for price, quantity, and external ID, and ensures that digital products have only one SKU.

### PODDesignAccordion
An accordion that contains fields specific to print-on-demand (POD) products, such as design options and customization settings.

### PODMint2MerchAccordion
An accordion that contains fields for minting POD products to merchandise, allowing users to manage the minting process.

### ShippingAccordion
An accordion that contains fields for managing shipping options and settings for physical products.

### Web3SettingsAccordion
An accordion that contains fields for managing Web3 settings, such as blockchain integration and smart contract details.

### AdditionalDetailsAccordion
An accordion that contains additional fields for managing extra details about the product, such as tags, metadata, and custom attributes.

## Conditional Rendering
- **POD Accordions**: The `PODDesignAccordion` and `PODMint2MerchAccordion` are rendered only if the product type is "PRINT_ON_DEMAND".
- **ShippingAccordion**: The `ShippingAccordion` is rendered only if the product type is "NORMAL".
- **ProductVariantsAccordion**: This accordion renders different components based on the product type:
  - `DigitalProductSKU` for digital products.
  - `PhysicalProductVariants` for normal and event products.
  - `PODProductVariants` for print-on-demand products.

## Conclusion
The `FormContent` component and its subcomponents provide a structured and organized way to manage product details through a series of accordions. By understanding the purpose and functionality of each accordion, developers can easily extend and customize the form to fit their needs.
