import { Flex, ModalBody } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AppImage from 'components/common/image/AppImage'
import Table from 'components/redesign/table/Table'
import { CrawledProductsType } from 'pages/products/utils/types'
import React, { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Pagination from './Pagination'
import MessageBox from 'components/redesign/message-box/MessageBox'
import Checkbox from 'components/redesign/checkbox/Checkbox'

interface Props {
    handleClick: (url: string) => void
    handleBulkSelection: (shouldSelectAll: boolean) => void
    selectedProducts: string[]
    crawledProduct: CrawledProductsType[]
    maxSelectableItems: number
}

export default function IdentifiedItemsBody({
    handleClick,
    handleBulkSelection,
    selectedProducts,
    crawledProduct,
    maxSelectableItems
}: Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
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

    // Update header checkbox state based on selection status
    useEffect(() => {
        if (crawledProduct.length === 0) {
            setHeaderCheckState('unchecked')
            return
        }

        // The maximum number of items we could select is either all items or maxSelectableItems
        const maxPossibleSelections = Math.min(crawledProduct.length, maxSelectableItems)

        if (selectedProducts.length === 0) {
            setHeaderCheckState('unchecked')
        } else if (selectedProducts.length === maxPossibleSelections) {
            setHeaderCheckState('checked')
        } else {
            setHeaderCheckState('indeterminate')
        }
    }, [selectedProducts, crawledProduct, maxSelectableItems])

    // Handle header checkbox click
    const handleHeaderCheckboxChange = () => {
        // Toggle between select all and deselect all
        if (headerCheckState === 'checked') {
            handleBulkSelection(false) // Deselect all
        } else {
            handleBulkSelection(true) // Select all (up to max)
        }
    }

    const columns: ColumnDef<CrawledProductsType>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox
                    isChecked={headerCheckState === 'checked'}
                    isIndeterminate={headerCheckState === 'indeterminate'}
                    onChange={handleHeaderCheckboxChange}
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
                {selectedProducts.length >= maxSelectableItems && (
                    <MessageBox
                        title='Maximum selection limit reached'
                        description={`Maximum selection limit (${maxSelectableItems} items) reached and you cannot select more items.`}
                        theme='warning'
                    />
                )}

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
