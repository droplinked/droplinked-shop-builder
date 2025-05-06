import { Button, Flex, HStack } from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Create page numbers array
    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = []

        if (totalPages <= 7) {
            // If less than 7 pages, show all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Always show first and last pages
            if (currentPage <= 3) {
                // Current page is at the beginning
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Current page is at the end
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                // Current page is in the middle
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <Flex justifyContent="center" alignItems="center" width="100%" mt={4} mb={2}>
            <HStack spacing={2}>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    variant="secondary"
                    size="sm"
                    p={2}
                    w="40px"
                    h="40px"
                    border="1px solid #292929"
                    aria-label="Previous page"
                >
                    <ChevronleftMd color={currentPage === 1 ? "#646464" : "#fff"} />
                </Button>

                {getPageNumbers().map((pageNumber, index) => (
                    <Button
                        key={index}
                        onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
                        variant={currentPage === pageNumber ? "solid" : "secondary"}
                        size="sm"
                        w="40px"
                        h="40px"
                        minW="40px"
                        fontSize={16}
                        fontWeight={400}
                        border="1px solid #292929"
                        isDisabled={pageNumber === '...'}
                        color="#fff"
                        _hover={{
                            border: '1px solid rgba(43, 207, 161, 0.10)',
                        }}
                        sx={currentPage === pageNumber ? {
                            border: '1px solid rgba(43, 207, 161, 0.10)',
                            background: 'rgba(43, 207, 161, 0.10) !important',
                            color: '#2BCFA1'
                        } : {}}
                    >
                        {pageNumber}
                    </Button>
                ))}

                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    variant="secondary"
                    size="sm"
                    p={2}
                    w="40px"
                    h="40px"
                    border="1px solid #292929"
                    aria-label="Next page"
                >
                    <ChevronrightMd color={currentPage === totalPages ? "#646464" : "#fff"} />
                </Button>
            </HStack>
        </Flex>
    )
}