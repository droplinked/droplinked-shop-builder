// __tests__/ChangelogBadge.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'

// 1) Mock Chakra’s Badge so it’s just a <span>
jest.mock('@chakra-ui/react', () => ({
    Badge: ({ children, ...props }) => <span {...props}>{children}</span>
}))

// 2) Mock each icon so it’s a harmless <svg>
jest.mock('assets/icons/Action/Trash/TrashSm', () => ({
    TrashSm: (props) => <svg data-testid='TrashSm' {...props} />
}))
jest.mock('assets/icons/Sign/Bug/BugSm', () => ({
    BugSm: (props) => <svg data-testid='BugSm' {...props} />
}))
jest.mock('assets/icons/Sign/Pluster/PlusterSm', () => ({
    PlusterSm: (props) => <svg data-testid='PlusterSm' {...props} />
}))
jest.mock('assets/icons/System/Puzzle/PuzzleSm', () => ({
    PuzzleSm: (props) => <svg data-testid='PuzzleSm' {...props} />
}))
jest.mock('assets/icons/System/Star2/Star2Sm', () => ({
    Star2Sm: (props) => <svg data-testid='Star2Sm' {...props} />
}))

import ChangelogBadge from './ChangelogBadge'

describe('ChangelogBadge', () => {
    const knownLabels = [
        'Integration',
        'New Feature',
        'Deprecation',
        'Improvement',
        'Bugfix'
    ]

    it.each(knownLabels)('renders icon and text for %s badge', label => {
        render(<ChangelogBadge label={label} />)

        const badgeText = screen.getByText(label)
        const badge = badgeText.closest('span')

        expect(badgeText).toBeInTheDocument()
        expect(badge).toBeInTheDocument()
        // first child of the badge should be our mocked <svg>
        expect(badge?.querySelector('svg')).toBeInTheDocument()
    })

    it('renders fallback badge with no icon for unknown label', () => {
        render(<ChangelogBadge label='SomethingElse' />)

        const badgeText = screen.getByText('SomethingElse')
        const badge = badgeText.closest('span')

        expect(badgeText).toBeInTheDocument()
        expect(badge?.querySelector('svg')).not.toBeInTheDocument()
    })
})
