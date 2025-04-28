export interface Blog {
    _id?: string
    title: string
    content: any
    image: string
    tags?: string[]
    searchEngineSummary?: string
    category: string
    isFeatured: boolean
    isVisible: boolean
    slug?: string
    writer?: string
    createdAt?: string
}

export interface ICheckSlug {
    title: string
    shopId: string
}

export interface IBlogFetchParams {
    page: number
    limit: number
    search?: string
}