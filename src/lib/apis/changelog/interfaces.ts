export interface ChangelogEntry {
    _id: string
    title: string
    summary: string
    description?: any
    tags: string[]
    version: string
    date: string
}

export interface ChangelogQueryParams {
    page: number
    limit: number
}

export interface ChangelogResponse {
    statusCode: number
    message: string | null
    data: {
        currentPage: number
        data: ChangelogEntry[]
        total: number
        hasNextPage: boolean
        hasPreviousPage: boolean
        limit: number
        nextPage: number
        previousPage: number | null
        totalDocuments: number
        totalPages: number
    }
}