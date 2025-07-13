jest.mock('react-query', () => ({
    __esModule: true,
    useQuery: jest.fn()
}))
jest.mock('react-router-dom', () => ({
    __esModule: true,
    useParams: jest.fn(),
    useNavigate: jest.fn()
}))
jest.mock('services/blog/services', () => ({
    __esModule: true,
    getBlogByIdService: jest.fn()
}))
jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

import useAppToast from 'hooks/toast/useToast'
import { getBlogByIdService } from 'services/blog/services'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import useBlog from './useBlog'

describe('useBlog', () => {
    // cast to Jest mocks
    const mockUseQuery = useQuery as jest.Mock
    const mockGetBlog = getBlogByIdService as jest.Mock
    const mockUseAppToast = useAppToast as jest.Mock
    const mockUseParams = useParams as jest.Mock
    const mockUseNavigate = useNavigate as jest.Mock

    let mockShowToast: jest.Mock
    let mockNavigate: jest.Mock
    let fakeQueryResult: any

    beforeEach(() => {
        jest.clearAllMocks()
        // set up toast
        mockShowToast = jest.fn()
        mockUseAppToast.mockReturnValue({ showToast: mockShowToast })
        // set up navigate
        mockNavigate = jest.fn()
        mockUseNavigate.mockReturnValue(mockNavigate)
        // set up query
        fakeQueryResult = { data: { foo: 'bar' } }
        mockUseQuery.mockReturnValue(fakeQueryResult)
    })

    it('returns the useQuery result when id is defined', () => {
        mockUseParams.mockReturnValue({ id: '123' })
        const result = useBlog()
        expect(result).toBe(fakeQueryResult)
    })

    it('configures useQuery correctly when id is present', () => {
        mockUseParams.mockReturnValue({ id: 'abc' })
        useBlog()
        const cfg = mockUseQuery.mock.calls[0][0]
        expect(cfg.queryKey).toEqual(['blog', 'abc'])
        expect(typeof cfg.queryFn).toBe('function')
        expect(cfg.enabled).toBe(true)
        expect(typeof cfg.onError).toBe('function')
    })

    it('queryFn calls getBlogByIdService with the id', async () => {
        mockUseParams.mockReturnValue({ id: 'xyz' })
        useBlog()
        const cfg = mockUseQuery.mock.calls[0][0]
        await cfg.queryFn()
        expect(mockGetBlog).toHaveBeenCalledWith('xyz')
    })

    it('onError shows toast and navigates back', () => {
        mockUseParams.mockReturnValue({ id: 'nope' })
        useBlog()
        const cfg = mockUseQuery.mock.calls[0][0]
        cfg.onError()
        expect(mockShowToast).toHaveBeenCalledWith({
            type: 'error',
            message: 'Failed to fetch blog'
        })
        expect(mockNavigate).toHaveBeenCalledWith('/analytics/blogs')
    })

    it('disables the query when id is missing', () => {
        mockUseParams.mockReturnValue({})
        useBlog()
        const cfg = mockUseQuery.mock.calls[0][0]
        expect(cfg.enabled).toBe(false)
        expect(cfg.queryKey).toEqual(['blog', undefined])
    })
})