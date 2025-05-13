// filepath: i:\droplinked-shop-builder\src\pages\purchase-history\components\drawer-sections\ShippingSection.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import ShippingSection from './ShippingSection';

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

describe('ShippingSection', () => {
    test('renders correctly with multiple shipping items', () => {
        const mockShippings: IOrderDetails["shippings"] = [
            {
                title: 'Standard Shipping',
                value: 10
            },
            {
                title: 'Expedited Shipping',
                value: 20
            }
        ];

        render(<ShippingSection shippings={mockShippings} />);

        // Check that the info wrapper is rendered with correct title
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();
        expect(infoWrapper).toHaveAttribute('data-title', 'Shipping');

        // Check that both shipping items are displayed
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(2);

        // Check for standard shipping
        const standardShipping = titledTexts.find(el => el.getAttribute('data-title') === 'Standard Shipping');
        expect(standardShipping).toBeInTheDocument();

        // Check for expedited shipping
        const expeditedShipping = titledTexts.find(el => el.getAttribute('data-title') === 'Expedited Shipping');
        expect(expeditedShipping).toBeInTheDocument();

        // Check formatted prices are rendered
        const formattedPrices = screen.getAllByTestId('formatted-price');
        expect(formattedPrices).toHaveLength(2);

        // Check standard shipping price value
        expect(formattedPrices[0]).toHaveAttribute('data-price', '10');

        // Check expedited shipping price value
        expect(formattedPrices[1]).toHaveAttribute('data-price', '20');
    });

    test('renders correctly with single shipping item', () => {
        const mockShippings: IOrderDetails["shippings"] = [
            {
                title: 'Standard Shipping',
                value: 10
            }
        ];

        render(<ShippingSection shippings={mockShippings} />);

        // Check that the info wrapper is rendered
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();

        // Check that only one shipping item is displayed
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(1);

        // Check for standard shipping
        const standardShipping = titledTexts.find(el => el.getAttribute('data-title') === 'Standard Shipping');
        expect(standardShipping).toBeInTheDocument();

        // Check formatted price is rendered
        const formattedPrice = screen.getByTestId('formatted-price');
        expect(formattedPrice).toHaveAttribute('data-price', '10');
    });

    test('renders correctly with empty shipping array', () => {
        render(<ShippingSection shippings={[]} />);

        // Check that the info wrapper is still rendered
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();

        // Check that no shipping items are displayed
        const titledTexts = screen.queryAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(0);
    });
});