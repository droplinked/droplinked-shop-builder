import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppImage from 'components/common/image/AppImage'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { CrawledProductsType } from 'pages/products/utils/types'

interface ItemsTableProps {
    items: CrawledProductsType[]
    selectedProducts: string[]
    headerCheckState: 'checked' | 'indeterminate' | 'unchecked'
    onHeaderCheckboxChange: () => void
    onItemClick: (url: string) => void
    isSelectionDisabled: (url: string) => boolean
    isLoading?: boolean
}

export default function ItemsTable({ items, selectedProducts, headerCheckState, onHeaderCheckboxChange, onItemClick, isSelectionDisabled, isLoading = false }: ItemsTableProps) {

    const columns: ColumnDef<CrawledProductsType>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox
                    isChecked={headerCheckState === 'checked'}
                    isIndeterminate={headerCheckState === 'indeterminate'}
                    onChange={onHeaderCheckboxChange}
                />
            ),
            cell: info => {
                const url = info.row.original.url
                const isSelected = selectedProducts.includes(url)
                const disabled = isSelectionDisabled(url)

                return (
                    <Checkbox
                        isChecked={isSelected}
                        onChange={() => onItemClick(url)}
                        isDisabled={disabled}
                    />
                )
            }
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: info => {
                const title = info.row.original.title
                const image = info.row.original.image
                const truncatedTitle = title.length <= 40 ? title : `${title.slice(0, 40)}...`

                return (
                    <Flex alignItems="center" gap={4}>
                        <AppImage
                            src={image}
                            width={14}
                            height={14}
                            borderRadius={8}
                            alt="Product"
                        />
                        <Text fontSize={16} fontWeight={500} color="white">{truncatedTitle}</Text>
                    </Flex>
                )
            }
        },
        {
            accessorKey: 'url',
            header: 'URL',
            cell: info => {
                const url = info.getValue() as string
                const truncatedUrl = url.length <= 30 ? url : `${url.slice(0, 30)}...`

                return (
                    <InteractiveText
                        to={url}
                        fontSize={16}
                        fontWeight={400}
                        color="#fff"
                        target="_blank"
                    >
                        {truncatedUrl}
                    </InteractiveText>
                )
            }
        }
    ]

    return (
        <Table
            columns={columns}
            data={items}
            isLoading={isLoading}
            emptyView={
                <Flex justifyContent="center" py={8}>
                    <Text fontSize={16} fontWeight={500} color="white">
                        No items available
                    </Text>
                </Flex>
            }
        />
    )
}