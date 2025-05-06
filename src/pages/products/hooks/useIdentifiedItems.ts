import { useState, useEffect } from 'react'
import { CrawledProductsType } from 'pages/products/utils/types'

interface UseIdentifiedItemsProps {
    crawledProducts: CrawledProductsType[]
    maxSelectableItems: number
}

export function useIdentifiedItems({ crawledProducts, maxSelectableItems }: UseIdentifiedItemsProps) {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [headerCheckState, setHeaderCheckState] = useState<'checked' | 'indeterminate' | 'unchecked'>('unchecked')

    // Handle individual item selection
    const handleItemSelection = (url: string) => {
        const newSelectedProducts = selectedProducts.includes(url)
            ? selectedProducts.filter((item) => item !== url)
            : [...selectedProducts, url]

        setSelectedProducts(newSelectedProducts)
    }

    // Handle bulk selection (for "Select All" functionality)
    const handleBulkSelection = (shouldSelectAll: boolean) => {
        if (shouldSelectAll) {
            // Select up to the maximum number of items
            const allUrls = crawledProducts.map(product => product.url)
            const urlsToSelect = allUrls.slice(0, maxSelectableItems)
            setSelectedProducts(urlsToSelect)
        } else {
            // Deselect all items
            setSelectedProducts([])
        }
    }

    // Check if selection is disabled for an item
    const isSelectionDisabled = (url: string) =>
        selectedProducts.length >= maxSelectableItems && !selectedProducts.includes(url)

    // Update header checkbox state based on selection status
    useEffect(() => {
        if (crawledProducts.length === 0) {
            setHeaderCheckState('unchecked')
            return
        }

        // The maximum number of items we could select is either all items or maxSelectableItems
        const maxPossibleSelections = Math.min(crawledProducts.length, maxSelectableItems)

        if (selectedProducts.length === 0) {
            setHeaderCheckState('unchecked')
        } else if (selectedProducts.length === maxPossibleSelections) {
            setHeaderCheckState('checked')
        } else {
            setHeaderCheckState('indeterminate')
        }
    }, [selectedProducts, crawledProducts, maxSelectableItems])

    // Handle header checkbox click
    const handleHeaderCheckboxChange = () => {
        // Toggle between select all and deselect all
        if (headerCheckState === 'checked') {
            handleBulkSelection(false) // Deselect all
        } else {
            handleBulkSelection(true) // Select all (up to max)
        }
    }

    const resetSelection = () => {
        setSelectedProducts([])
    }

    return {
        selectedProducts,
        headerCheckState,
        handleItemSelection,
        handleBulkSelection,
        isSelectionDisabled,
        handleHeaderCheckboxChange,
        resetSelection
    }
}