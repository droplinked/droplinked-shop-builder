// filepath: i:\droplinked-shop-builder\src\pages\purchase-history\components\drawer-sections\CommissionSection.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IOrderDetails } from 'services/order/interfaces';
import CommissionSection from './CommissionSection';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, direction, gap, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-direction={direction}
                data-gap={gap}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

// Mock the components before importing the component under test
jest.mock('components/redesign/formatted-price/FormattedPrice', () => ({
    __esModule: true,
    default: function MockFormattedPrice({ price, ...props }) {
        return (
            <div data-testid="formatted-price" data-price={price} {...props}>
                ${price.toFixed(2)}
            </div>
        );
    }
}));

jest.mock('../drawer-components/InfoWrapper', () => ({
    __esModule: true,
    default: function MockInfoWrapper({ title, children, ...props }) {
        return (
            <div data-testid="info-wrapper" data-title={title} {...props}>
                {children}
            </div>
        );
    }
}));

jest.mock('../drawer-components/TitledText', () => ({
    __esModule: true,
    default: function MockTitledText({ title, text, direction }) {
        return (
            <div data-testid="titled-text" data-title={title} data-direction={direction}>
                {text}
            </div>
        );
    }
}));

describe('CommissionSection', () => {
    test('renders correctly with both commission types', () => {
        const mockCommission: IOrderDetails["commision"] = {
            droplinked: 15,
            stripe: 5
        };

        render(<CommissionSection commission={mockCommission} />);

        // Check that the info wrapper is rendered with correct title
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();
        expect(infoWrapper).toHaveAttribute('data-title', 'Commision');

        // Check that both commission types are displayed
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(2);

        // Check for droplinked commission
        const droplinkedCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Droplinked');
        expect(droplinkedCommission).toBeInTheDocument();

        // Check for stripe commission
        const stripeCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Stripe');
        expect(stripeCommission).toBeInTheDocument();

        // Check formatted prices are rendered
        const formattedPrices = screen.getAllByTestId('formatted-price');
        expect(formattedPrices).toHaveLength(2);

        // Check droplinked price value
        expect(formattedPrices[0]).toHaveAttribute('data-price', '15');

        // Check stripe price value
        expect(formattedPrices[1]).toHaveAttribute('data-price', '5');
    });

    test('renders correctly with only droplinked commission', () => {
        const mockCommission: IOrderDetails["commision"] = {
            droplinked: 15,
            stripe: 0
        };

        render(<CommissionSection commission={mockCommission} />);

        // Check that the info wrapper is rendered
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();

        // Check that only droplinked commission is displayed
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(1);

        // Check for droplinked commission
        const droplinkedCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Droplinked');
        expect(droplinkedCommission).toBeInTheDocument();

        // Check that stripe commission is not displayed
        const stripeCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Stripe');
        expect(stripeCommission).toBeUndefined();
    });

    test('renders correctly with only stripe commission', () => {
        const mockCommission: IOrderDetails["commision"] = {
            droplinked: 0,
            stripe: 5
        };

        render(<CommissionSection commission={mockCommission} />);

        // Check that the info wrapper is rendered
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();

        // Check that only stripe commission is displayed
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(1);

        // Check that droplinked commission is not displayed
        const droplinkedCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Droplinked');
        expect(droplinkedCommission).toBeUndefined();

        // Check for stripe commission
        const stripeCommission = titledTexts.find(el => el.getAttribute('data-title') === 'Stripe');
        expect(stripeCommission).toBeInTheDocument();
    });

    test('renders correctly with no commissions', () => {
        const mockCommission: IOrderDetails["commision"] = {
            droplinked: 0,
            stripe: 0
        };

        render(<CommissionSection commission={mockCommission} />);

        // Check that the info wrapper is still rendered
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();

        // Check that no commission items are displayed
        const titledTexts = screen.queryAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(0);
    });
});