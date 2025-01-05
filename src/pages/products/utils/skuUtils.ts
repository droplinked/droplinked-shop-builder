import useProductPageStore from "../stores/ProductPageStore"
import { attributeToIdMap, ProductFormValues, ProductProperty, SKU, SKUOption } from "./types"

// Helper function to calculate rawPrice and externalID for POD
function calculatePODDetails(options: SKUOption[], formValues: ProductFormValues): {
    rawPrice: number,
    externalID: string
} {
    const availableVariants = useProductPageStore.getState().available_variants

    const color = options.find((option) => option.variantName === "Color")?.caption || ""
    const size = options.find((option) => option.variantName === "Size")?.value || ""

    const matchingVariant = availableVariants?.find(
        (variant) => variant.color === color && variant.sizes.some((s) => s.size === size)
    )
    const matchingSize = matchingVariant?.sizes.find((s) => s.size === size)

    const artworkCount = [formValues.artwork, formValues.artwork2].filter(Boolean).length
    const rawPrice =
        (matchingSize?.finalPrice ? Math.round(parseFloat(matchingSize.finalPrice)) : 0) +
        (artworkCount > 1
            ? (matchingVariant?.printPrice || 0) * artworkCount
            : matchingVariant?.printPrice || 0)

    const externalID = matchingSize?.id?.toString() || ""

    return { rawPrice, externalID }
}

// Function to create SKUs recursively
function createSKUs(
    properties: ProductProperty[],
    formValues: ProductFormValues,
    currentOptions: SKUOption[] = [],
    isPOD: boolean = false
): SKU[] {
    if (properties.length === 0) {
        const podDetails = isPOD
            ? calculatePODDetails(currentOptions, formValues)
            : { rawPrice: 0, externalID: "" }

        return [
            {
                externalID: podDetails.externalID,
                rawPrice: podDetails.rawPrice,
                index: 0,
                options: currentOptions,
                price: 0,
                quantity: isPOD ? -1 : 0,
                record: false,
                weight: 0,
                dimensions: { width: 0, height: 0, length: 0 },
                royalty: null,
            },
        ]
    }

    const [currentProperty, ...remainingProperties] = properties
    const newSKUs: SKU[] = []

    for (const item of currentProperty.items) {
        const option: SKUOption = {
            variantID: attributeToIdMap[currentProperty.title],
            variantName: currentProperty.title,
            value: item.value,
            caption: item.caption,
            isCustom: currentProperty.isCustom,
        }

        const skus = createSKUs(remainingProperties, formValues, [...currentOptions, option], isPOD)
        newSKUs.push(...skus)
    }

    return newSKUs
}

// Updated function specifically for POD products
export function convertPropertiesToPODSKUs(formValues: ProductFormValues): SKU[] {
    const { properties, product_type } = formValues

    if (product_type !== "PRINT_ON_DEMAND") {
        throw new Error("This function is only for PRINT_ON_DEMAND products.")
    }

    return createSKUs(properties, formValues, [], true)
}

// Function to update SKUs on variant change (unchanged)
export function updateSKUsOnVariantChange(params: { properties: ProductProperty[], currentSKUs: SKU[] }): SKU[] {
    const { properties, currentSKUs } = params
    return properties.length === 0 ? [] : createSKUs(properties, { properties, sku: currentSKUs } as any)
}

// Function to update properties on SKU deletion (unchanged)
export function updatePropertiesOnSKUDelete(properties: ProductProperty[], skus: SKU[]): ProductProperty[] {
    const usedOptions = new Set<string>()

    // Collect all options used in remaining SKUs
    skus.forEach((sku) => {
        sku.options.forEach((option) => {
            const key = `${option.variantName}-${option.value}-${option.caption || ""}`
            usedOptions.add(key)
        })
    })

    // Update properties to remove unused options
    const updatedProperties = properties
        .map((property) => {
            const filteredItems = property.items.filter((item) => {
                const key = `${property.title}-${item.value}-${item.caption || ""}`
                return usedOptions.has(key)
            })

            if (!filteredItems.length) {
                return null // Remove this property if no items are left
            }

            return {
                ...property,
                items: filteredItems,
            }
        })
        .filter((property): property is ProductProperty => property !== null)

    return updatedProperties
}