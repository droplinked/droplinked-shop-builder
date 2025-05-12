import { render, screen } from '@testing-library/react'
import React from 'react'
import BlogForm from './BlogForm'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Box: props => React.createElement('div', { 'data-testid': 'Box', ...props }, props.children),
        Flex: props => React.createElement('div', { 'data-testid': 'Flex', ...props }, props.children),
        Grid: props => React.createElement('div', { 'data-testid': 'Grid', ...props }, props.children),
        GridItem: props => React.createElement('div', { 'data-testid': 'GridItem', ...props }, props.children),
        useBreakpointValue: jest.fn()
    }
})

jest.mock('formik', () => {
    const React = require('react')
    return {
        __esModule: true,
        Formik: ({ children }) =>
            React.createElement(React.Fragment, null, children({})),
        Form: ({ children }) => React.createElement('form', { 'data-testid': 'Form' }, children)
    }
})

jest.mock('components/redesign/ruled-grid/RuledGrid', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ children }) =>
            React.createElement('div', { 'data-testid': 'RuledGrid' }, children)
    }
})

jest.mock('./FormFields/FeaturedPictureUpload', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'FeaturedPictureUpload' })
    }
})

jest.mock('./FormFields/TitleInput', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'TitleInput' })
    }
})

jest.mock('./FormFields/BodyEditor', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'BodyEditor' })
    }
})

jest.mock('./FormFields/SearchEngineSummary', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'SearchEngineSummary' })
    }
})

jest.mock('./FormFields/CategorySelect', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'CategorySelect' })
    }
})

jest.mock('./FormFields/Keywords', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'Keywords' })
    }
})

jest.mock('./FormFields/VisibilityStatusRadio', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'VisibilityStatusRadio' })
    }
})

jest.mock('./FormFields/BlogToggles', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'BlogToggles' })
    }
})

jest.mock('./FormFields/BlogFormActions', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'BlogFormActions' })
    }
})

describe('BlogForm', () => {
    const useBreakpointValue = require('@chakra-ui/react').useBreakpointValue as jest.Mock

    it('renders mobile layout when breakpoint is base (isLessThanLg=true)', () => {
        // first call for isLessThanLg, second for isTablet
        useBreakpointValue
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false)

        render(<BlogForm onSubmit={async () => { }} />)

        expect(screen.getByTestId('FeaturedPictureUpload')).toBeInTheDocument()
        expect(screen.getByTestId('TitleInput')).toBeInTheDocument()
        expect(screen.getByTestId('BodyEditor')).toBeInTheDocument()
        expect(screen.getByTestId('SearchEngineSummary')).toBeInTheDocument()
        expect(screen.getByTestId('CategorySelect')).toBeInTheDocument()
        expect(screen.getByTestId('Keywords')).toBeInTheDocument()
        expect(screen.getByTestId('VisibilityStatusRadio')).toBeInTheDocument()
        expect(screen.getByTestId('BlogToggles')).toBeInTheDocument()
        expect(screen.getByTestId('BlogFormActions')).toBeInTheDocument()
    })

    it('renders desktop layout when breakpoint is lg or above (isLessThanLg=false)', () => {
        useBreakpointValue.mockReturnValue(false)

        render(<BlogForm onSubmit={async () => { }} />)

        // in desktop, TitleInput and others still render
        expect(screen.getByTestId('TitleInput')).toBeInTheDocument()
        expect(screen.getByTestId('BodyEditor')).toBeInTheDocument()
        expect(screen.getByTestId('SearchEngineSummary')).toBeInTheDocument()
        expect(screen.getByTestId('CategorySelect')).toBeInTheDocument()
        expect(screen.getByTestId('Keywords')).toBeInTheDocument()
        // FeaturedPictureUpload appears in the right column
        expect(screen.getByTestId('FeaturedPictureUpload')).toBeInTheDocument()
        // visibility and toggles inside RuledGrid
        expect(screen.getByTestId('RuledGrid')).toBeInTheDocument()
        expect(screen.getByTestId('VisibilityStatusRadio')).toBeInTheDocument()
        expect(screen.getByTestId('BlogToggles')).toBeInTheDocument()
        // actions at bottom of right column
        expect(screen.getByTestId('BlogFormActions')).toBeInTheDocument()
    })
})
