// Mock axios before imports
jest.mock('axios', () => ({
    create: jest.fn(() => ({
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
        },
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
    }))
}));

// Mock react-router-dom dependencies
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
    Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
        <a href={to} data-testid="link">{children}</a>
    )
}));

import React from 'react';
import ChangelogEntryCard from './ChangelogEntryCard';

describe('ChangelogEntryCard', () => {
    it('exists as a component', () => {
        // Simple smoke test to verify the component is defined
        expect(ChangelogEntryCard).toBeDefined();
    });
}); 