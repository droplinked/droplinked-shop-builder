import useAppToast from 'hooks/toast/useToast'
import { getChangelogEntries } from 'services/changelog/services'
import { useInfiniteQuery } from 'react-query'
import useChangelogEntries from './useChangelogEntries'

const mockGetChangelogEntries = getChangelogEntries as jest.Mock
const mockUseInfiniteQuery = useInfiniteQuery as jest.Mock

jest.mock('react-query', () => ({
    __esModule: true,
    useInfiniteQuery: jest.fn()
}))
jest.mock('lib/apis/changelog/services', () => ({
    __esModule: true,
    getChangelogEntries: jest.fn()
}))
jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('useChangelogEntries', () => {
    let mockShowToast: jest.Mock
    let fakeResult: any

    beforeEach(() => {
        jest.clearAllMocks()
        mockShowToast = jest.fn()
            ; (useAppToast as jest.Mock).mockReturnValue({ showToast: mockShowToast })
        fakeResult = { pages: [], pageParams: [] }
        mockUseInfiniteQuery.mockReturnValue(fakeResult)
    })

    it('returns the value from useInfiniteQuery', () => {
        const result = useChangelogEntries()
        expect(result).toBe(fakeResult)
    })

    it('calls useInfiniteQuery with correct config', () => {
        useChangelogEntries()
        const config = mockUseInfiniteQuery.mock.calls[0][0]
        expect(config.queryKey).toEqual(['changelog-entries'])
        expect(typeof config.queryFn).toBe('function')
        expect(typeof config.getNextPageParam).toBe('function')
        expect(typeof config.onError).toBe('function')
    })

    it('queryFn calls getChangelogEntries with default and overridden pageParam', async () => {
        useChangelogEntries()
        const config = mockUseInfiniteQuery.mock.calls[0][0]
        await config.queryFn({})
        await config.queryFn({ pageParam: 5 })
        expect(mockGetChangelogEntries).toHaveBeenNthCalledWith(1, { page: 1, limit: 10 })
        expect(mockGetChangelogEntries).toHaveBeenNthCalledWith(2, { page: 5, limit: 10 })
    })

    it('getNextPageParam extracts nextPage from lastPage.data', () => {
        useChangelogEntries()
        const config = mockUseInfiniteQuery.mock.calls[0][0]
        const next = config.getNextPageParam({ data: { nextPage: 42 } })
        expect(next).toBe(42)
    })

    it('onError shows an error toast', () => {
        useChangelogEntries()
        const config = mockUseInfiniteQuery.mock.calls[0][0]
        config.onError()
        expect(mockShowToast).toHaveBeenCalledWith({
            type: 'error',
            message: 'Failed to fetch changelog entries'
        })
    })
})
