import useAppToast from 'hooks/toast/useToast'
import { getChangelogEntry } from 'services/changelog/services'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import useChangelogEntry from './useChangelogEntry'

jest.mock('react-query', () => ({
    __esModule: true,
    useQuery: jest.fn()
}))

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useParams: jest.fn(),
    useNavigate: jest.fn()
}))

jest.mock('lib/apis/changelog/services', () => ({
    __esModule: true,
    getChangelogEntry: jest.fn()
}))

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('useChangelogEntry', () => {
    let mockShowToast: jest.Mock
    let mockNavigate: jest.Mock
    const fakeQueryResult = { data: { foo: 'bar' } }

    beforeEach(() => {
        // reset and set up our mocks
        jest.clearAllMocks()
        mockShowToast = jest.fn()
            ; (useAppToast as jest.Mock).mockReturnValue({ showToast: mockShowToast })
        mockNavigate = jest.fn()
            ; (useNavigate as jest.Mock).mockReturnValue(mockNavigate)
            ; (useQuery as jest.Mock).mockReturnValue(fakeQueryResult)
    })

    it('calls useQuery with correct config when id is present', () => {
        // Arrange
        ; (useParams as jest.Mock).mockReturnValue({ id: 'abc123' })

        // Act
        const result = useChangelogEntry()

        // Assert useQuery return
        expect(result).toBe(fakeQueryResult)

        // Assert useQuery called once
        expect(useQuery).toHaveBeenCalledTimes(1)

        const config = (useQuery as jest.Mock).mock.calls[0][0]
        expect(config.queryKey).toEqual(['changelog-entry', 'abc123'])
        expect(config.enabled).toBe(true)
        expect(typeof config.queryFn).toBe('function')
        expect(typeof config.onError).toBe('function')
    })

    it('queryFn calls getChangelogEntry with the id', async () => {
        // Arrange
        ; (useParams as jest.Mock).mockReturnValue({ id: 'xyz789' })
        const config = (useQuery as jest.Mock).mock.calls[0]?.[0] || useChangelogEntry() && (useQuery as jest.Mock).mock.calls[0][0]

        // Act
        await config.queryFn()

        // Assert
        expect(getChangelogEntry).toHaveBeenCalledWith('xyz789')
    })

    it('onError shows toast and navigates away', () => {
        // Arrange
        ; (useParams as jest.Mock).mockReturnValue({ id: 'nope' })
        const config = useChangelogEntry() && (useQuery as jest.Mock).mock.calls[0][0]

        // Act
        config.onError()

        // Assert
        expect(mockShowToast).toHaveBeenCalledWith({
            type: 'error',
            message: 'Failed to fetch changelog entry'
        })
        expect(mockNavigate).toHaveBeenCalledWith('/analytics/changelog')
    })

    it('disables the query when id is missing', () => {
        // Arrange
        ; (useParams as jest.Mock).mockReturnValue({})

        // Act
        useChangelogEntry()

        // Assert
        const config = (useQuery as jest.Mock).mock.calls[0][0]
        expect(config.enabled).toBe(false)
        expect(config.queryKey).toEqual(['changelog-entry', undefined])
    })
})
