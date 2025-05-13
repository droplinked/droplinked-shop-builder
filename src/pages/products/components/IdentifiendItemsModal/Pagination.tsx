import { Button, Flex, HStack } from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import React from 'react'
import { generatePageNumbers } from '../../utils/paginationUtils'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    const pageNumbers = generatePageNumbers(currentPage, totalPages)

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

                {pageNumbers.map((pageNumber, index) => (
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