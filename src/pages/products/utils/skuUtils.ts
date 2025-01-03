import { attributeToIdMap, ProductProperty, SKU, SKUOption } from "./types"

function createSKUs(
    properties: ProductProperty[],
    currentOptions: SKUOption[] = [],
    currentSKUs: SKU[] = []
): SKU[] {
    if (properties.length === 0) {
        return [
            {
                externalID: "",
                index: 0,
                options: currentOptions,
                price: 0,
                quantity: 0,
                record: false,
                weight: 0,
                dimensions: { width: 0, height: 0, length: 0 },
                royalty: null
            }
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
            isCustom: currentProperty.isCustom
        }

        const skus = createSKUs(remainingProperties, [...currentOptions, option], currentSKUs)
        newSKUs.push(...skus)
    }

    return newSKUs
}

export function convertPropertiesToSKUs(properties: ProductProperty[]): SKU[] {
    return createSKUs(properties)
}

export function updateSKUsOnVariantChange(params: { properties: ProductProperty[], currentSKUs: SKU[] }): SKU[] {
    const { properties, currentSKUs } = params
    return properties.length === 0 ? [] : createSKUs(properties, [], currentSKUs)
}

export function updatePropertiesOnSKUDelete(
    properties: ProductProperty[],
    skus: SKU[]
): ProductProperty[] {
    const usedOptions = new Set<string>()

    // Collect all options used in remaining SKUs
    skus.forEach(sku => {
        sku.options.forEach(option => {
            const key = `${option.variantName}-${option.value}-${option.caption || ''}`
            usedOptions.add(key)
        })
    })

    // Update properties to remove unused options
    const updatedProperties = properties
        .map(property => {
            const filteredItems = property.items.filter(item => {
                const key = `${property.title}-${item.value}-${item.caption || ''}`
                return usedOptions.has(key)
            })

            if (filteredItems.length === 0) {
                return null // Remove this property if no items are left
            }

            return {
                ...property,
                items: filteredItems
            }
        })
        .filter((property): property is ProductProperty => property !== null)

    return updatedProperties
}