import { render, screen } from '@testing-library/react';
import React from 'react';
import CartItem from './CartItem';
import { IOrderDetailsItems } from 'services/order/interfaces';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Box: function MockBox({ children, background, p, borderRadius, ...props }) {
        return (
            <div
                data-testid="box-component"
                data-background={background}
                data-p={p}
                data-border-radius={borderRadius}
                {...props}
            >
                {children}
            </div>
        );
    },
    Flex: function MockFlex({ children, border, borderRadius, flexDirection, p, borderBottom, width, gap, justifyContent, alignItems, flexWrap, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-border={border}
                data-border-radius={borderRadius}
                data-direction={flexDirection}
                data-padding={typeof p === 'object' ? JSON.stringify(p) : p}
                data-border-bottom={borderBottom}
                data-width={width}
                data-gap={gap}
                data-justify-content={justifyContent}
                data-align-items={alignItems}
                data-flex-wrap={flexWrap}
                {...props}
            >
                {children}
            </div>
        );
    },
    Text: function MockText({ children, color, fontSize, fontWeight, ...props }) {
        return (
            <div
                data-testid="text-component"
                data-color={color}
                data-font-size={fontSize}
                data-font-weight={fontWeight}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

// Mock imported components
jest.mock('assets/icons/System/Affiliate/AffiliateSm', () => ({
    AffiliateSm: function MockAffiliateSm({ color }) {
        return <div data-testid="affiliate-icon" data-color={color} />;
    }
}));

jest.mock('components/common/image/AppImage', () => ({
    __esModule: true,
    default: function MockAppImage({ src, width, height, borderRadius }) {
        return (
            <div
                data-testid="app-image"
                data-src={src}
                data-width={width}
                data-height={height}
                data-border-radius={borderRadius}
            />
        );
    }
}));

jest.mock('components/redesign/dot-separated-list/DotSeparatedList', () => ({
    __esModule: true,
    default: function MockDotSeparatedList({ children, border, px, py, borderRadius, ...props }) {
        return (
            <div
                data-testid="dot-separated-list"
                data-border={border}
                data-px={px}
                data-py={py}
                data-border-radius={borderRadius}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

jest.mock('components/redesign/formatted-price/FormattedPrice', () => ({
    __esModule: true,
    default: function MockFormattedPrice({ price, fontSize, fontWeight, ...props }) {
        return (
            <div
                data-testid="formatted-price"
                data-price={price}
                data-font-size={fontSize}
                data-font-weight={fontWeight}
                {...props}
            >
                ${price.toFixed(2)}
            </div>
        );
    }
}));

jest.mock('./TitledText', () => ({
    __esModule: true,
    default: function MockTitledText({ title, text, direction }) {
        return (
            <div data-testid="titled-text" data-title={title} data-direction={direction}>
                {text}
            </div>
        );
    }
}));

describe('CartItem', () => {
    const mockItem: IOrderDetailsItems = {
        _id: '123',
        image: 'test-image.jpg',
        isAffiliate: true,
        options: {
            color: { caption: 'Red' },
            size: { caption: 'M' }
        },
        price: 100,
        title: 'Test Product',
        quantity: 2,
        productId: '456',
        skuImage: 'test-sku-image.jpg',
    };

    test('renders with all product information', () => {
        render(<CartItem item={mockItem} />);

        // Check that the main container is rendered
        const mainContainer = screen.getAllByTestId('flex-container')[0];
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveAttribute('data-border', '1px solid #292929');
        expect(mainContainer).toHaveAttribute('data-border-radius', '16');

        // Check that the image is rendered
        const image = screen.getByTestId('app-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('data-src', 'test-image.jpg');
        expect(image).toHaveAttribute('data-width', '48px');
        expect(image).toHaveAttribute('data-height', '48px');

        // Check that the affiliate icon is rendered
        const affiliateIcon = screen.getByTestId('affiliate-icon');
        expect(affiliateIcon).toBeInTheDocument();
        expect(affiliateIcon).toHaveAttribute('data-color', '#2BCFA1');

        // Check that the title is rendered
        const title = screen.getByText('Test Product');
        expect(title).toBeInTheDocument();

        // Check that options are rendered
        const dotLists = screen.getAllByTestId('dot-separated-list');
        expect(dotLists.length).toBeGreaterThan(0);

        // Check that titled texts for prices are rendered
        const titledTexts = screen.getAllByTestId('titled-text');
        expect(titledTexts).toHaveLength(2);

        // Check unit price
        const unitPrice = titledTexts.find(el => el.getAttribute('data-title') === 'Unit Price');
        expect(unitPrice).toBeInTheDocument();
        expect(unitPrice).toHaveAttribute('data-direction', 'row');

        // Check total price
        const totalPrice = titledTexts.find(el => el.getAttribute('data-title') === 'Total');
        expect(totalPrice).toBeInTheDocument();
        expect(totalPrice).toHaveAttribute('data-direction', 'row');
    });

    test('renders without options', () => {
        const itemWithoutOptions: IOrderDetailsItems = {
            ...mockItem,
            options: {}
        };

        render(<CartItem item={itemWithoutOptions} />);

        // There should still be one dot-separated list for quantity
        const dotLists = screen.getAllByTestId('dot-separated-list');
        expect(dotLists).toHaveLength(1);

        // Check that quantity is displayed
        const quantityText = screen.getByText('Quantity');
        expect(quantityText).toBeInTheDocument();
    });

    test('renders without affiliate badge', () => {
        const nonAffiliateItem: IOrderDetailsItems = {
            ...mockItem,
            isAffiliate: false
        };

        render(<CartItem item={nonAffiliateItem} />);

        // There should be no affiliate icon
        const affiliateIcon = screen.queryByTestId('affiliate-icon');
        expect(affiliateIcon).not.toBeInTheDocument();
    });

    test('calculates unit price correctly', () => {
        render(<CartItem item={mockItem} />);

        // Check that formatted prices have correct values
        const formattedPrices = screen.getAllByTestId('formatted-price');

        // Unit price should be price divided by quantity
        expect(formattedPrices[0]).toHaveAttribute('data-price', '50');

        // Total price should be the full price
        expect(formattedPrices[1]).toHaveAttribute('data-price', '100');
        expect(formattedPrices[1]).toHaveAttribute('data-font-size', '16');
        expect(formattedPrices[1]).toHaveAttribute('data-font-weight', '700');
    });
});