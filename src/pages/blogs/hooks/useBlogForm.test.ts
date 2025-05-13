import { renderHook } from '@testing-library/react'
import { useFormikContext } from 'formik'
import type { Blog } from 'lib/apis/blog/interfaces'
import useBlogForm from './useBlogForm'

jest.mock('formik', () => ({
    __esModule: true,
    useFormikContext: jest.fn()
}))

describe('useBlogForm', () => {
    const mockUseFormikContext = useFormikContext as jest.Mock

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('throws if not inside a Formik context', () => {
        // Arrange: simulate no Formik context
        mockUseFormikContext.mockReturnValue(undefined)

        // Act & Assert: hook should throw
        expect(() => renderHook(() => useBlogForm()))
            .toThrowError('useBlogForm must be used within a Formik context')
    })

    it('returns the Formik context when available', () => {
        // Arrange: provide a fake Formik context object
        const fakeFormik = {
            values: { title: 'Hello', content: 'World' },
            handleSubmit: jest.fn(),
            setFieldValue: jest.fn()
        } as unknown as Blog & Record<string, any>
        mockUseFormikContext.mockReturnValue(fakeFormik)

        // Act
        const { result } = renderHook(() => useBlogForm())

        // Assert
        expect(result.current).toBe(fakeFormik)
    })
})
