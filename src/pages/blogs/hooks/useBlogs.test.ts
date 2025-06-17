jest.mock('react-query', () => ({
    __esModule: true,
    useInfiniteQuery: jest.fn(),
    useQueryClient: jest.fn()
}))
jest.mock('services/blog/services', () => ({
    __esModule: true,
    getShopBlogsService: jest.fn()
}))

import { getShopBlogsService } from 'services/blog/services'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import useBlogs, { BLOG_LIST_QUERY_KEY, useInvalidateBlogList } from './useBlogs'

describe('useBlogs', () => {
    const mockUseInfiniteQuery = useInfiniteQuery as jest.Mock
    const mockGetShopBlogsService = getShopBlogsService as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns whatever useInfiniteQuery returns', () => {
        const fakeResult = { pages: [], pageParams: [] }
        mockUseInfiniteQuery.mockReturnValue(fakeResult)

        const result = useBlogs('searchTerm')

        expect(result).toBe(fakeResult)
    })

    it('calls useInfiniteQuery with correct config', () => {
        useBlogs('searchTerm')

        expect(mockUseInfiniteQuery).toHaveBeenCalledTimes(1)
        const config = mockUseInfiniteQuery.mock.calls[0][0]

        expect(config.queryKey).toEqual([BLOG_LIST_QUERY_KEY, 'searchTerm'])
        expect(typeof config.queryFn).toBe('function')
        expect(typeof config.getNextPageParam).toBe('function')
    })

    it('queryFn calls getShopBlogsService with default pageParam', async () => {
        useBlogs('foo')
        const config = mockUseInfiniteQuery.mock.calls[0][0]

        await config.queryFn({})
        expect(mockGetShopBlogsService).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            search: 'foo'
        })
    })

    it('queryFn calls getShopBlogsService with overridden pageParam', async () => {
        useBlogs('bar')
        const config = mockUseInfiniteQuery.mock.calls[0][0]

        await config.queryFn({ pageParam: 5 })
        expect(mockGetShopBlogsService).toHaveBeenCalledWith({
            page: 5,
            limit: 10,
            search: 'bar'
        })
    })

    it('getNextPageParam returns nextPage when present, otherwise null', () => {
        useBlogs('baz')
        const config = mockUseInfiniteQuery.mock.calls[0][0]

        expect(config.getNextPageParam({ data: { nextPage: 3 } })).toBe(3)
        expect(config.getNextPageParam({ data: { nextPage: null } })).toBeNull()
        expect(config.getNextPageParam({})).toBeNull()
    })
})

describe('useInvalidateBlogList', () => {
    const mockInvalidateQueries = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useQueryClient as jest.Mock).mockReturnValue({
                invalidateQueries: mockInvalidateQueries
            })
    })

    it('returns a function that invalidates queries for BLOG_LIST_QUERY_KEY', () => {
        const invalidate = useInvalidateBlogList()

        invalidate()

        expect(mockInvalidateQueries).toHaveBeenCalledWith([BLOG_LIST_QUERY_KEY])
    })
})
