import { Flex } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import Table from 'components/redesign/table/Table'
import { productStatusMap, productTypeMap } from 'functions/hooks/useProducts/useProducts'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'
import React, { memo } from 'react'
import ProductStatusBadge from './ProductStatusBadge'
import ProductTableActionMenu from './ProductTableActionMenu'
import { UseInfiniteQueryResult } from 'react-query'
import { AxiosResponse } from 'axios'
import EmptyProductList from './EmptyProductList'

interface Props {
    searchTerm: string,
    productsList: UseInfiniteQueryResult<AxiosResponse<any, any>, unknown>
    onProductTypeModalOpen: () => void
}

function ProductTable({ searchTerm, productsList, onProductTypeModalOpen }: Props) {
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = productsList
    const { shop: { currency } } = useAppStore()
    const products = data?.pages?.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: '_',
            header: 'Product Name',
            cell: info => {
                const { media, title } = info.row.original
                const imageURL = (media.find(m => m.isMain === "true") ?? media[0]).thumbnail

                return (
                    <Flex alignItems="center" gap={4}>
                        <AppImage src={imageURL} width={14} height={14} borderRadius={8} />
                        <AppTypography fontSize={16}>{title}</AppTypography>
                    </Flex>
                )
            }
        },
        {
            accessorKey: 'lowestPrice',
            header: 'Price',
            cell: (info) => {
                const price = info.getValue() as number
                if (price) return `${currency?.symbol} ${currencyConvertion(price, currency?.conversionRateToUSD, false)} ${currency?.abbreviation}`
                return "-"
            }
        },
        { accessorKey: 'productCollectionID', header: 'Collection', cell: info => (info.getValue() as any).title },
        { accessorKey: 'product_type', header: 'Type', cell: info => productTypeMap[info.getValue() as string] },
        { accessorKey: 'publish_status', header: 'Status', cell: info => <ProductStatusBadge status={productStatusMap[info.getValue() as string]} /> }
    ]
    if (!products.length && !isFetching) {
        return <EmptyProductList onProductTypeModalOpen={onProductTypeModalOpen} />
    }

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