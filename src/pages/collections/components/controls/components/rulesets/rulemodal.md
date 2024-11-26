# RuleModal Documentation

## RuleModal

This modal is used to add a new rule or edit an existing rule.

### Props
- `show`: boolean - Determines if the modal is visible.
- `collectionId`: string - The ID of the collection.
- `close`: function - Function to close the modal.
- `ruleId`: string - The ID of the rule being edited (if any).

### Components Used
- `ModalWrapper`
- `BlockchainNetworkSelect`
- `RulesetAddress`
- `GatingMessageInput`
- `MinimumAssetsRequiredInput`
- `NftUrlInput`
- `RulesetType`
- `BasicButton`
- `LoadingComponent`
- `Formik`

## ModalWrapper

A wrapper component for the modal.

### Props
- `ruleId`: string - The ID of the rule being edited (if any).
- `isOpen`: boolean - Determines if the modal is visible.
- `onClose`: function - Function to close the modal.
- `children`: ReactNode - The content of the modal.

## BlockchainNetworkSelect

A component to select the blockchain network.

### Props
- `chains`: object - The available blockchain networks.
- `values`: object - The form values.
- `errors`: object - The form errors.
- `setFieldValue`: function - Function to set form field values.
- `getRule`: object - The rule data.

## RulesetAddress

A component to input contract addresses.

### Props
- None (uses context)

## GatingMessageInput

A component to input the gating message.

### Props
- None (uses context)

## MinimumAssetsRequiredInput

A component to input the minimum assets required.

### Props
- None (uses context)

## NftUrlInput

A component to input the NFT URL.

### Props
- None (uses context)

## RulesetType

A component to select the ruleset type.

### Props
- None (uses context)

## SelectType

A component to select a type from a list.

### Props
- `element`: string - The form element name.
- `items`: array - The list of items to select from.
- `props`: object - Additional props.

## SelectRule

A component to select a rule from a list.

### Props
- `element`: string - The form element name.
- `items`: array - The list of items to select from.
- `props`: object - Additional props.
