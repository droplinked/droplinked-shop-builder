import { render, screen } from '@testing-library/react';
import React from 'react';
import OrderCart from './OrderCart';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import { IOrders } from '../../interface';

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

// Mock AppSkeleton component
jest.mock('components/common/skeleton/AppSkeleton', () => ({
    __esModule: true,
    default: function MockAppSkeleton({ children, isLoaded, ...props }) {
        return (
            <div data-testid="app-skeleton" data-loaded={isLoaded} {...props}>
                {isLoaded ? children : <div>Loading...</div>}
            </div>
        );
    }
}));

// Mock CartItem component
jest.mock('../drawer-components/CartItem', () => ({
    __esModule: true,
    default: function MockCartItem({ item }) {
        return (
            <div data-testid="cart-item" data-product-id={item.productId}>
                {item.title} - {item.quantity} x ${item.price}
            </div>
        );
    }
}));

describe('OrderCart', () => {
    const mockOrderData: IOrderDetails = {
        orderInformation: {
            orderId: 'order123',
            status: 'PAYMENT_CONFIRMED',
        },
        customer: {
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Main St',
        },
        details: {
            products: 150,
            shipping: 10,
            tax: 5,
            cart: 165,
            profit: 30,
            paidWith: 'Credit Card',
            type: 'Standard',
        },
        trackingInfo: [],
        shippings: [],
        tax: {
            droplinked: 2,
            shop: 3,
            total: 5,
        },
        commision: {
            droplinked: 5,
            stripe: 3,
        },
        items: [
            {
                _id: 'item1',
                productId: 'prod1',
                title: 'Product One',
                image: 'image1.jpg',
                skuImage: null,
                options: { size: { caption: 'Large' }, color: { caption: 'Blue' } },
                quantity: 2,
                isAffiliate: true,
                price: 100,
            },
            {
                _id: 'item2',
                productId: 'prod2',
                title: 'Product Two',
                image: 'image2.jpg',
                skuImage: 'sku2.jpg',
                options: {},
                quantity: 1,
                isAffiliate: false,
                price: 50,
            },
        ],
    };

    const mockRowData: IOrders = {
        _id: 'order123',
        customerEmail: 'john@example.com',
        status: 'PAYMENT_CONFIRMED',
        updatedAt: new Date('2023-10-01T12:00:00Z'),
        customerAddressBook: {
            firstName: "John",
            lastName: "Doe",
        }
    };

    test('renders cart items when data is loaded', () => {
        render(
            <OrderCart
                orderData={mockOrderData}
                isFetching={false}
                rowData={mockRowData}
            />
        );

        // Check that the skeleton is loaded
        const skeleton = screen.getByTestId('app-skeleton');
        expect(skeleton).toHaveAttribute('data-loaded', 'true');

        // Check that all cart items are rendered
        const cartItems = screen.getAllByTestId('cart-item');
        expect(cartItems).toHaveLength(2);

        // Check product IDs
        expect(cartItems[0]).toHaveAttribute('data-product-id', 'prod1');
        expect(cartItems[1]).toHaveAttribute('data-product-id', 'prod2');

        // Check content
        expect(cartItems[0]).toHaveTextContent('Product One - 2 x $100');
        expect(cartItems[1]).toHaveTextContent('Product Two - 1 x $50');
    });

    test('shows loading state when fetching data', () => {
        render(
            <OrderCart
                orderData={mockOrderData}
                isFetching={true}
                rowData={mockRowData}
            />
        );

        // Check that the skeleton is in loading state
        const skeleton = screen.getByTestId('app-skeleton');
        expect(skeleton).toHaveAttribute('data-loaded', 'false');
        expect(skeleton).toHaveTextContent('Loading...');

        // Cart items should not be visible
        const cartItems = screen.queryAllByTestId('cart-item');
        expect(cartItems).toHaveLength(0);
    });

    test('renders empty cart when no items are present', () => {
        const emptyOrderData = {
            ...mockOrderData,
            items: []
        };

        render(
            <OrderCart
                orderData={emptyOrderData}
                isFetching={false}
                rowData={mockRowData}
            />
        );

        // Check that the skeleton is loaded
        const skeleton = screen.getByTestId('app-skeleton');
        expect(skeleton).toHaveAttribute('data-loaded', 'true');

        // There should be no cart items
        const cartItems = screen.queryAllByTestId('cart-item');
        expect(cartItems).toHaveLength(0);
    });
});