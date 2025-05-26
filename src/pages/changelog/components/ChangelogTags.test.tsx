// __tests__/ChangelogTags.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import type { ChangelogEntry } from 'services/changelog/interfaces'
import React from 'react'
import ChangelogTags from './ChangelogTags'

// mock Chakra’s Flex
jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    Flex: ({ children, flexWrap, gap, direction }) => (
        <div
            data-testid='flex'
            {...(flexWrap !== undefined ? { 'data-flex-wrap': flexWrap } : {})}
            {...(gap !== undefined ? { 'data-gap': gap } : {})}
            {...(direction !== undefined ? { 'data-direction': direction } : {})}
        >
            {children}
        </div>
    )
}))

// mock the Tag icon
jest.mock('assets/icons/Finance/Tag/TagMd', () => ({
    __esModule: true,
    TagMd: props => <svg data-testid='TagMd' {...props} />
}))

// mock SectionHeader from the same folder
jest.mock('./SectionHeader', () => ({
    __esModule: true,
    default: ({ icon, title }) => (
        <div data-testid='section-header'>
            <div data-testid='section-header-icon'>{icon}</div>
            <h2>{title}</h2>
        </div>
    )
}))

// mock ChangelogBadge from the same folder
jest.mock('./ChangelogBadge', () => ({
    __esModule: true,
    default: ({ label }) => <span data-testid='changelog-badge'>{label}</span>
}))

describe('ChangelogTags', () => {
    const sampleTags = ['Bugfix', 'Improvement', 'Integration']
    const sampleEntry: ChangelogEntry = {
        _id: 'abc123',
        title: 'Some change',
        summary: 'This is a summary',
        description: undefined,
        tags: sampleTags,
        version: '1.2.3',
        date: '2025-05-11'
    }

    it('renders nothing when there are no tags', () => {
        const emptyEntry = { ...sampleEntry, tags: [] }
        const { container } = render(<ChangelogTags changelogItem={emptyEntry} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders badges inside a flex when withHeading is false', () => {
        render(<ChangelogTags changelogItem={sampleEntry} />)

        const flex = screen.getByTestId('flex')
        const badges = screen.getAllByTestId('changelog-badge')

        expect(flex).toHaveAttribute('data-flex-wrap', 'wrap')
        expect(flex).toHaveAttribute('data-gap', '2')
        expect(badges).toHaveLength(sampleTags.length)
        sampleTags.forEach((tag, i) => {
            expect(badges[i]).toHaveTextContent(tag)
        })
    })

    it('renders section header and nested badges when withHeading is true', () => {
        render(<ChangelogTags changelogItem={sampleEntry} withHeading />)

        const [outerFlex, innerFlex] = screen.getAllByTestId('flex')
        const header = screen.getByTestId('section-header')
        const headerIcon = screen.getByTestId('section-header-icon').querySelector('svg')
        const headerTitle = screen.getByRole('heading', { level: 2, name: 'Tags' })
        const badges = screen.getAllByTestId('changelog-badge')

        // outer Flex
        expect(outerFlex).toHaveAttribute('data-direction', 'column')
        expect(outerFlex).toHaveAttribute('data-gap', '4')

        // header
        expect(header).toBeInTheDocument()
        expect(headerIcon).toBeInTheDocument()
        expect(headerTitle).toBeInTheDocument()

        // inner Flex
        expect(innerFlex).toHaveAttribute('data-flex-wrap', 'wrap')
        expect(innerFlex).toHaveAttribute('data-gap', '2')

        // badges
        expect(badges).toHaveLength(sampleTags.length)
        sampleTags.forEach((tag, i) => {
            expect(badges[i]).toHaveTextContent(tag)
        })
    })
})
