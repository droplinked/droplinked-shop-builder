import { render, screen } from '@testing-library/react';
import React from 'react';
import { TabsList } from './TabList';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Tab: function MockTab({ children, width, pb, color, fontSize, _selected, _focusWithin, isDisabled, ...props }) {
        return (
            <div
                data-testid="tab-component"
                data-width={width}
                data-pb={pb}
                data-color={color}
                data-font-size={typeof fontSize === 'object' ? JSON.stringify(fontSize) : fontSize}
                data-selected={JSON.stringify(_selected)}
                data-focus-within={JSON.stringify(_focusWithin)}
                data-disabled={isDisabled}
                {...props}
            >
                {children}
            </div>
        );
    },
    TabList: function MockTabList({ children, borderBottom, width, ...props }) {
        return (
            <div
                data-testid="tablist-container"
                data-border-bottom={borderBottom}
                data-width={width}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

describe('TabsList', () => {
    test('renders tabs correctly', () => {
        const mockTabs = [
            { title: 'Tab 1', content: 'Content 1' },
            { title: 'Tab 2', content: 'Content 2' },
            { title: 'Tab 3', content: 'Content 3' }
        ];

        render(<TabsList tabs={mockTabs} />);

        // Check that the TabList container is rendered
        const tabList = screen.getByTestId('tablist-container');
        expect(tabList).toBeInTheDocument();
        expect(tabList).toHaveAttribute('data-border-bottom', 'none');
        expect(tabList).toHaveAttribute('data-width', '100%');

        // Check that all tabs are rendered
        const tabs = screen.getAllByTestId('tab-component');
        expect(tabs).toHaveLength(3);

        // Check each tab content
        expect(tabs[0]).toHaveTextContent('Tab 1');
        expect(tabs[1]).toHaveTextContent('Tab 2');
        expect(tabs[2]).toHaveTextContent('Tab 3');

        // Check tab styling
        tabs.forEach(tab => {
            expect(tab).toHaveAttribute('data-width', '100%');
            expect(tab).toHaveAttribute('data-pb', '16px');
            expect(tab).toHaveAttribute('data-color', '#7B7B7B');
        });
    });

    test('renders disabled tabs correctly', () => {
        const mockTabs = [
            { title: 'Enabled Tab', content: 'Content 1' },
            { title: 'Disabled Tab', content: 'Content 2', isDisabled: true }
        ];

        render(<TabsList tabs={mockTabs} />);

        // Check that both tabs are rendered
        const tabs = screen.getAllByTestId('tab-component');
        expect(tabs).toHaveLength(2);

        // First tab should be enabled
        expect(tabs[0]).toHaveTextContent('Enabled Tab');
        expect(tabs[0]).not.toHaveAttribute('data-disabled', 'true');

        // Second tab should be disabled
        expect(tabs[1]).toHaveTextContent('Disabled Tab');
        expect(tabs[1]).toHaveAttribute('data-disabled', 'true');
    });

    test('displays correct styling configurations', () => {
        const mockTabs = [
            { title: 'Test Tab', content: 'Content' }
        ];

        render(<TabsList tabs={mockTabs} />);

        // Check tab styling config is correctly applied
        const tab = screen.getByTestId('tab-component');

        // Check _selected styling
        const selectedStyle = JSON.parse(tab.getAttribute('data-selected') || '{}');
        expect(selectedStyle.borderBottom).toBe('1px solid #fff');
        expect(selectedStyle.color).toBe('#fff');
        expect(selectedStyle.fontWeight).toBe(500);

        // Check _focusWithin styling
        const focusWithinStyle = JSON.parse(tab.getAttribute('data-focus-within') || '{}');
        expect(focusWithinStyle.background).toBe('transparent');
        expect(focusWithinStyle.borderBottom).toBe('1px solid #fff');
    });
});