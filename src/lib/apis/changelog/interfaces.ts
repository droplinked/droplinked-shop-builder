export interface ChangelogEntry {
    id: string
    title: string
    summary: string
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
        data: ChangelogEntry[]
        total: number
    }
}