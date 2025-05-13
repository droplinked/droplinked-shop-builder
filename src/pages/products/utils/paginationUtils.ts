/**
 * Generates page numbers array for pagination with ellipsis for large page counts
 * @param currentPage Current active page 
 * @param totalPages Total number of pages
 * @returns Array of page numbers and ellipsis strings
 */
export function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
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