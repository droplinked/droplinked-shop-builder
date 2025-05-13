import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BodyEditor from './BodyEditor'

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('@blocknote/react', () => ({
    __esModule: true,
    useCreateBlockNote: jest.fn()
}))

jest.mock('@blocknote/mantine', () => {
    const React = require('react')
    return {
        __esModule: true,
        BlockNoteView: ({ editor, onChange, 'data-theme': dataTheme }) =>
            React.createElement('div', {
                'data-testid': 'blocknote-view',
                'data-doc': JSON.stringify(editor.document),
                'data-theme': dataTheme,
                onClick: onChange
            })
    }
})

jest.mock(
    'components/redesign/form-field-wrapper/FormFieldWrapper',
    () => {
        const React = require('react')
        return {
            __esModule: true,
            default: ({
                label,
                description,
                errorMessage,
                isRequired,
                sx,
                children
            }) =>
                React.createElement(
                    'div',
                    {
                        'data-testid': 'form-field-wrapper',
                        'data-label': label,
                        'data-desc': description,
                        'data-error': errorMessage,
                        'data-required': isRequired,
                        'data-sx': JSON.stringify(sx)
                    },
                    children
                )
        }
    }
)

describe('BodyEditor', () => {
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock
    const mockUseCreate = require('@blocknote/react').useCreateBlockNote as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders editor with initial content and no error', () => {
        const initialDoc = [{ type: 'paragraph', children: [{ text: 'Hello' }] }]
        const editorStub = { document: initialDoc }
        mockUseBlogForm.mockReturnValue({
            values: { content: JSON.stringify(initialDoc) },
            errors: {},
            setFieldValue: jest.fn()
        })
        mockUseCreate.mockReturnValue(editorStub)

        render(<BodyEditor />)

        const wrapper = screen.getByTestId('form-field-wrapper')
        expect(wrapper).toHaveAttribute('data-label', 'Body')
        expect(wrapper).toHaveAttribute(
            'data-desc',
            'Write detailed and engaging content to inform and captivate readers.'
        )
        expect(wrapper).toHaveAttribute('data-error', '')
        expect(wrapper).toHaveAttribute('data-required', 'true')

        const bnView = screen.getByTestId('blocknote-view')
        expect(bnView).toHaveAttribute('data-doc', JSON.stringify(initialDoc))
        expect(bnView).toHaveAttribute('data-theme', 'custom-dark')
    })

    it('renders error message when errors.content is present', () => {
        const initialDoc: any[] = []
        const editorStub = { document: initialDoc }
        mockUseBlogForm.mockReturnValue({
            values: { content: JSON.stringify(initialDoc) },
            errors: { content: new Error('Too short') },
            setFieldValue: jest.fn()
        })
        mockUseCreate.mockReturnValue(editorStub)

        render(<BodyEditor />)

        const wrapper = screen.getByTestId('form-field-wrapper')
        // Error.prototype.toString() === "Error: Too short"
        expect(wrapper).toHaveAttribute('data-error', 'Error: Too short')
    })

    it('calls setFieldValue with updated content on change', async () => {
        const initialDoc = [{ type: 'paragraph', children: [{ text: 'X' }] }]
        const updatedDoc = [{ type: 'paragraph', children: [{ text: 'Y' }] }]
        const editorStub: { document: any } = { document: initialDoc }
        const setFieldValue = jest.fn()

        mockUseBlogForm.mockReturnValue({
            values: { content: JSON.stringify(initialDoc) },
            errors: {},
            setFieldValue
        })
        mockUseCreate.mockReturnValue(editorStub)

        render(<BodyEditor />)

        // simulate editor content changing before onChange
        editorStub.document = updatedDoc

        const bnView = screen.getByTestId('blocknote-view')
        await userEvent.click(bnView)
        expect(setFieldValue).toHaveBeenCalledWith(
            'content',
            JSON.stringify(updatedDoc)
        )
    })
})
