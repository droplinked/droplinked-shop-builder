import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'
import BlogToggles from './BlogToggles'

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock(
    'pages/products/components/ProductDrawer/components/common/SwitchBox',
    () => {
        const React = require('react')
        return {
            __esModule: true,
            default: ({ title, description, switchProps }) =>
                React.createElement('div', {
                    'data-testid': 'switchbox',
                    'data-title': title,
                    'data-desc': description,
                    'data-checked': switchProps.isChecked,
                    onClick: () =>
                        switchProps.onChange({
                            target: { checked: !switchProps.isChecked }
                        })
                })
        }
    }
)

describe('BlogToggles', () => {
    const mockUseBlogForm = useBlogForm as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders SwitchBox with correct title, description, and checked state when featured', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isFeatured: true },
            setFieldValue
        })

        render(<BlogToggles />)

        const sb = screen.getByTestId('switchbox')
        expect(sb).toHaveAttribute('data-title', 'Featured')
        expect(sb).toHaveAttribute(
            'data-desc',
            'Pin the post on the header.'
        )
        expect(sb).toHaveAttribute('data-checked', 'true')
    })

    it('renders unchecked when not featured', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isFeatured: false },
            setFieldValue
        })

        render(<BlogToggles />)

        const sb = screen.getByTestId('switchbox')
        expect(sb).toHaveAttribute('data-checked', 'false')
    })

    it('toggles featured off when clicked if initially on', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isFeatured: true },
            setFieldValue
        })

        render(<BlogToggles />)

        const sb = screen.getByTestId('switchbox')
        await userEvent.click(sb)
        expect(setFieldValue).toHaveBeenCalledWith(
            'isFeatured',
            false
        )
    })

    it('toggles featured on when clicked if initially off', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isFeatured: false },
            setFieldValue
        })

        render(<BlogToggles />)

        const sb = screen.getByTestId('switchbox')
        await userEvent.click(sb)
        expect(setFieldValue).toHaveBeenCalledWith(
            'isFeatured',
            true
        )
    })
})
