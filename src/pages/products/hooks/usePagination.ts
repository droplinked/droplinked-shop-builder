import { useState } from 'react'
import { CrawledProductsType } from 'pages/products/utils/types'

interface UsePaginationProps {
    items: CrawledProductsType[]
    itemsPerPage: number
}

export function usePagination({ items, itemsPerPage }: UsePaginationProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(items.length / itemsPerPage)

    // Calculate current page items
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return {
        currentPage,
        totalPages,
        currentItems,
        handlePageChange
    }
}