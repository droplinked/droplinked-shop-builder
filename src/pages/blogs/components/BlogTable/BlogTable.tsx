import { Flex, Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { EditLg } from 'assets/icons/Action/Edit/EditLg'
import AppImage from 'components/common/image/AppImage'
import AppBadge from 'components/redesign/badge/AppBadge'
import Table from 'components/redesign/table/Table'
import useBlogs from 'pages/blogs/hooks/useBlogs'
import React from 'react'
import { formatDateToLongStyle } from 'utils/helpers'
import BlogTableActionMenu from './BlogTableActionMenu'
import BlogTableEmptyState from './BlogTableEmptyState'

interface Props {
    searchTerm: string
}

function BlogTable({ searchTerm }: Props) {
    const { isFetching, data } = useBlogs(searchTerm)
    const blogPosts = data?.data ?? []

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: '_',
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
                const category = info.getValue() as string

                return <Text fontSize={16}>{category}</Text>
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
        { accessorKey: 'likes', header: 'View Count', cell: info => <Text fontSize={16}>{info.getValue() as String}</Text> },
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

    const renderActions = (blogPost: any) => {
        return (
            <Flex alignItems="center" gap={1} sx={{ button: { padding: 2 } }}>
                {/* <button onClick={() => console.log(blogPost.title, "chat")}><ChatLg color='#fff' /></button> */}
                <button onClick={() => console.log(blogPost.title, "edit")}><EditLg color='#fff' /></button>
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
            infiniteScroll={{ dataLength: blogPosts?.length ?? 0, hasMore: false, next: () => { }, isFetchingNextPage: false }}
        />
    )
}

export default BlogTable