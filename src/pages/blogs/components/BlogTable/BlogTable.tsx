import { Flex, Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { EditLg } from 'assets/icons/Action/Edit/EditLg'
import AppImage from 'components/common/image/AppImage'
import AppBadge from 'components/redesign/badge/AppBadge'
import Table from 'components/redesign/table/Table'
import { Blog } from 'lib/apis/blog/interfaces'
import useBlogs from 'pages/blogs/hooks/useBlogs'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateToLongStyle } from 'utils/helpers'
import BlogTableActionMenu from './BlogTableActionMenu'
import BlogTableEmptyState from './BlogTableEmptyState'

interface Props {
    searchTerm: string
}

function BlogTable({ searchTerm }: Props) {
    const navigate = useNavigate()
    const { isFetching, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBlogs(searchTerm)

    const blogPosts = data?.pages.flatMap(page => page.data.data) || []

    const columns: ColumnDef<Blog>[] = [
        {
            header: 'Post',
            cell: info => {
                const { image, title } = info.row.original
                const truncatedTitle = title.length <= 25 ? title : `${title.slice(0, 25)}...`

                return (
                    <Flex alignItems="center" gap={4}>
                        <AppImage src={image} width={14} height={14} borderRadius={8} />
                        <Text fontSize={16} fontWeight={500}>{truncatedTitle}</Text>
                    </Flex>
                )
            }
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: (info) => {
                const category = info.getValue()

                return typeof category === "string"
                    ? <Text fontSize={16}>{category ?? "-"}</Text>
                    : <Text fontSize={16}>-</Text>
            }
        },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: info => {
                const date = new Date(info.getValue() as string)

                return <Text fontSize={16}>{formatDateToLongStyle(date)}</Text>
            }
        },
        {
            accessorKey: 'isVisible',
            header: 'Status',
            cell: info => {
                const isVisible = info.getValue() as boolean
                const text = isVisible ? "Published" : "Draft"
                const status = isVisible ? "success" : "pending"

                return <AppBadge text={text} status={status} />
            }
        }
    ]

    const renderActions = (blogPost: Blog) => {
        return (
            <Flex alignItems="center" gap={1} sx={{ button: { padding: 2 } }}>
                <button onClick={() => navigate(blogPost._id)}><EditLg color='#fff' /></button>
                <BlogTableActionMenu blogPost={blogPost} />
            </Flex>
        )
    }

    if (!isFetching && !blogPosts?.length) return <BlogTableEmptyState />

    return (
        <Table
            isLoading={isFetching}
            columns={columns}
            data={blogPosts}
            renderActions={renderActions}
            infiniteScroll={{ dataLength: blogPosts?.length ?? 0, hasMore: hasNextPage, next: fetchNextPage, isFetchingNextPage }}
        />
    )
}

export default memo(BlogTable)