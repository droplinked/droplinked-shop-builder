import { Box, Flex, ModalBody } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AppImage from 'components/common/image/AppImage'
import Table from 'components/redesign/table/Table'
import { CrawledProductsType } from 'pages/products/utils/types'
import React, { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Pagination from './Pagination'
import Checkbox from 'components/redesign/checkbox/Checkbox'

interface Props {
    handleClick: (url: string) => void
    selectedProducts: string[]
    crawledProduct: CrawledProductsType[]
}

export default function IdentifiedItemsBody({ handleClick, selectedProducts, crawledProduct }: Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const maxSelectableItems = 200
    const totalPages = Math.ceil(crawledProduct.length / itemsPerPage)

    // Calculate current page items
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = crawledProduct.slice(indexOfFirstItem, indexOfLastItem)

    // State for header checkbox
    const [headerCheckState, setHeaderCheckState] = useState<'checked' | 'indeterminate' | 'unchecked'>('unchecked')

    // Selection can be disabled when 200 items are selected
    const isSelectionDisabled = (url: string) =>
        selectedProducts.length >= maxSelectableItems && !selectedProducts.includes(url)

    // Update header checkbox state based on selection
    useEffect(() => {
        if (currentItems.length === 0) {
            setHeaderCheckState('unchecked')
            return
        }

        const currentPageItemUrls = currentItems.map(item => item.url)
        const selectedOnCurrentPage = currentPageItemUrls.filter(url => selectedProducts.includes(url))

        if (selectedOnCurrentPage.length === 0) {
            setHeaderCheckState('unchecked')
        } else if (selectedOnCurrentPage.length === currentPageItemUrls.length) {
            setHeaderCheckState('checked')
        } else {
            setHeaderCheckState('indeterminate')
        }
    }, [selectedProducts, currentItems, currentPage])

    // Handle header checkbox click
    const handleHeaderCheckboxChange = () => {
        const currentPageItemUrls = currentItems.map(item => item.url)

        if (headerCheckState === 'checked') {
            // Unselect all current page items
            const newSelectedProducts = selectedProducts.filter(url => !currentPageItemUrls.includes(url))
            handleBulkSelection(newSelectedProducts)
        } else {
            // Select all current page items (up to max limit)
            const remainingSelections = maxSelectableItems - selectedProducts.length

            if (remainingSelections <= 0) return

            // Filter out already selected items from current page
            const unselectedCurrentItems = currentPageItemUrls.filter(url => !selectedProducts.includes(url))

            // Take only as many as we can still select
            const itemsToAdd = unselectedCurrentItems.slice(0, remainingSelections)

            const newSelectedProducts = [...selectedProducts, ...itemsToAdd]
            handleBulkSelection(newSelectedProducts)
        }
    }

    // Handle bulk selection
    const handleBulkSelection = (newSelectedProducts: string[]) => {
        // We need to manually trigger handleClick for each item that changed state
        const itemsToAdd: string[] = newSelectedProducts.filter(url => !selectedProducts.includes(url))
        const itemsToRemove: string[] = selectedProducts.filter(url => !newSelectedProducts.includes(url))

        // For each item that needs to change state, call handleClick
        const changedItems: string[] = [...itemsToAdd, ...itemsToRemove]
        changedItems.forEach((url: string) => {
            handleClick(url)
        })
    }

    const columns: ColumnDef<CrawledProductsType>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox
                    isChecked={headerCheckState === 'checked'}
                    isIndeterminate={headerCheckState === 'indeterminate'}
                    onChange={handleHeaderCheckboxChange}
                    isDisabled={selectedProducts.length >= maxSelectableItems && headerCheckState !== 'checked'}
                />
            ),
            cell: info => {
                const url = info.row.original.url
                const isSelected = selectedProducts.includes(url)
                const disabled = isSelectionDisabled(url)

                return (
                    <Checkbox
                        isChecked={isSelected}
                        onChange={() => handleClick(url)}
                        isDisabled={disabled}
                    />
                )
            }
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: info => (
                <AppImage
                    src={info.getValue() as string}
                    width={14}
                    height={14}
                    borderRadius={8}
                    alt="Product"
                />
            )
        },
        {
            accessorKey: 'title',
            header: 'Product',
            cell: info => {
                const title = info.getValue() as string
                const truncatedTitle = title.length <= 40 ? title : `${title.slice(0, 40)}...`

                return <AppTypography fontSize={16} color="white">{truncatedTitle}</AppTypography>
            }
        },
        {
            accessorKey: 'url',
            header: 'URL',
            cell: info => {
                const url = info.getValue() as string
                const truncatedUrl = url.length <= 30 ? url : `${url.slice(0, 30)}...`

                return <AppTypography fontSize={14} color="#B1B1B1">{truncatedUrl}</AppTypography>
            }
        }
    ]

    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
        >
            <Flex direction="column" gap={6}>
                <Box>
                    {selectedProducts.length >= maxSelectableItems && (
                        <AppTypography fontSize={14} color="red.400" mb={2}>
                            Maximum selection limit (200 items) reached
                        </AppTypography>
                    )}
                    <AppTypography fontSize={14} color="#B1B1B1" mb={2}>
                        {selectedProducts.length} of {maxSelectableItems} items selected
                    </AppTypography>
                </Box>

                <Table
                    columns={columns}
                    data={currentItems}
                    isLoading={false}
                    emptyView={
                        <Flex justifyContent="center" py={8}>
                            <AppTypography fontSize={16} fontWeight={500} color="white">
                                No items available
                            </AppTypography>
                        </Flex>
                    }
                />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </Flex>
        </ModalBody>
    )
}
