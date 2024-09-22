export interface IPagination {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
    limit: number;
    totalDocuments: number;
}
