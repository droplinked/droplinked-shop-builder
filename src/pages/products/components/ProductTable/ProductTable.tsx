import { Flex } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import Table from 'components/redesign/table/Table'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProducts, { productTypeMap } from 'hooks/products/useProducts'
import React, { memo } from 'react'
import EmptyProductList from './EmptyProductList'
import ProductStatusBadge from './ProductStatusBadge'
import ProductTableActionMenu from './ProductTableActionMenu'

interface Props {
    searchTerm: string
}

function ProductTable({ searchTerm }: Props) {
    const { t } = useLocaleResources('products');
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts(searchTerm)
    const products = data?.pages?.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: '_',
            header: t('productTable.columns.product'),
            cell: info => {
                const { media, title } = info.row.original
                const imageURL = (media.find(m => m.isMain === "true") ?? media[0])?.thumbnail
                const truncatedTitle = title.length <= 25 ? title : `${title.slice(0, 25)}...`

                return (
                    <Flex alignItems="center" gap={4}>
                        <AppImage src={imageURL} width={14} height={14} borderRadius={8} />
                        <AppTypography fontSize={16}>{truncatedTitle}</AppTypography>
                    </Flex>
                )
            }
        },
        {
            accessorKey: 'lowestSkuPrice',
            header: t('productTable.columns.price'),
            cell: (info) => {
                const price = info.getValue() as number
                if (price) return <FormattedPrice price={price} />
                return "-"
            }
        },
        { accessorKey: 'productCollectionID', header: t('productTable.columns.collection'), cell: info => (info.getValue() as any).title },
        { accessorKey: 'product_type', header: t('productTable.columns.type'), cell: info => productTypeMap[info.getValue() as string] },
        {
            accessorKey: 'publish_status',
            header: t('productTable.columns.status'),
            cell: info => {
                const { publish_status, purchaseAvailable } = info.row.original
                return <ProductStatusBadge status={publish_status} purchaseAvailable={purchaseAvailable} />
            }
        }
    ]

    if (!isFetching && !products.length) return <EmptyProductList />

    return (
        <Table
            isLoading={isFetching}
            columns={columns}
            data={products}
            renderActions={(product: any) => <ProductTableActionMenu product={product} />}
            infiniteScroll={{ dataLength: products.length, hasMore: hasNextPage, next: fetchNextPage, isFetchingNextPage }}
        />
    )
}

export default memo(ProductTable)