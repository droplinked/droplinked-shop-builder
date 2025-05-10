// filepath: i:\droplinked-shop-builder\src\pages\purchase-history\components\drawer-sections\OrderInformation.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IOrderDetails } from 'lib/apis/order/interfaces';
// Import the component under test after all mocks are defined
import OrderInformation from './OrderInformation';

// Mock the components before importing the component under test
jest.mock('./CustomerInfoSection', () => ({
    __esModule: true,
    default: function MockCustomerInfoSection({ customer, details, isPhysical }) {
        return (
            <div
                data-testid="customer-info-section"
                data-customer-email={customer.email}
                data-is-physical={isPhysical.toString()}
            >
                Customer Info Section
            </div>
        );
    }
}));

jest.mock('./ShippingSection', () => ({
    __esModule: true,
    default: function MockShippingSection({ shippings }) {
        return (
            <div
                data-testid="shipping-section"
                data-shipping-count={shippings.length}
            >
                Shipping Section
            </div>
        );
    }
}));

jest.mock('./AffiliateSection', () => ({
    __esModule: true,
    default: function MockAffiliateSection({ affiliate }) {
        return (
            <div
                data-testid="affiliate-section"
                data-affiliate-count={affiliate.length}
            >
                Affiliate Section
            </div>
        );
    }
}));

jest.mock('./CommissionSection', () => ({
    __esModule: true,
    default: function MockCommissionSection({ commission }) {
        return (
            <div
                data-testid="commission-section"
                data-droplinked={commission.droplinked}
                data-stripe={commission.stripe}
            >
                Commission Section
            </div>
        );
    }
}));

jest.mock('./PaymentDetailsSection', () => ({
    __esModule: true,
    default: function MockPaymentDetailsSection({ details, trackingInfo, giftCard, isPhysical, orderId }) {
        return (
            <div
                data-testid="payment-details-section"
                data-order-id={orderId}
                data-is-physical={isPhysical.toString()}
                data-has-gift-card={Boolean(giftCard).toString()}
            >
                Payment Details Section
            </div>
        );
    }
}));

jest.mock('@chakra-ui/react', () => {
    const actual = jest.requireActual('@chakra-ui/react');
    return {
        ...actual,
        Spinner: function MockSpinner() {
            return <div>Spinner</div>;
        },
        Flex: function MockFlex({ children, ...props }) {
            return <div data-testid="flex-container" {...props}>{children}</div>;
        }
    };
});


describe('OrderInformation', () => {
    const mockOrderData: IOrderDetails = {
        orderInformation: {
            orderId: 'order-123456',
            status: 'PAYMENT_CONFIRMED',
        },
        customer: {
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Main St',
            phone: '123-456-7890'
        },
        details: {
            products: 100,
            shipping: 15,
            tax: 10,
            cart: 125,
            profit: 85,
            paidWith: 'Credit Card',
            type: 'physical'
        },
        trackingInfo: [{
            title: 'Shipping Tracking',
            trackings: [{
                name: 'Tracking Number 1',
                url: 'https://example.com/track1'
            }]
        }],
        shippings: [{
            title: 'Standard Shipping',
            value: 15
        }],
        tax: {
            droplinked: 5,
            shop: 5,
            total: 10
        },
        giftCard: {
            credit: 20,
            amount: 10,
            netProfit: 75,
            ruleset: 5
        },
        affiliates: [{
            total: 100,
            publisherProfit: 30,
            publisher: 'Publisher One'
        }],
        commision: {
            droplinked: 15,
            stripe: 5
        },
        items: [{
            _id: 'item-123',
            productId: 'prod-123',
            title: 'Test Product',
            image: 'image.jpg',
            skuImage: null,
            options: {},
            quantity: 1,
            isAffiliate: false,
            price: 100
        }]
    };

    test('renders loading spinner when fetching data', () => {
        render(<OrderInformation orderData={mockOrderData} isFetching={true} />);

        // Check that spinner is rendered
        const spinner = screen.getByText(/Spinner/i);
        expect(spinner).toBeInTheDocument();

        // Check that no sections are rendered when loading
        const customerSection = screen.queryByTestId('customer-info-section');
        expect(customerSection).not.toBeInTheDocument();
    });

    test('renders all sections with physical product', () => {
        render(<OrderInformation orderData={mockOrderData} isFetching={false} />);

        // Check that all sections are rendered
        const customerSection = screen.getByTestId('customer-info-section');
        expect(customerSection).toBeInTheDocument();
        expect(customerSection).toHaveAttribute('data-customer-email', mockOrderData.customer.email);
        expect(customerSection).toHaveAttribute('data-is-physical', 'true');

        const shippingSection = screen.getByTestId('shipping-section');
        expect(shippingSection).toBeInTheDocument();
        expect(shippingSection).toHaveAttribute('data-shipping-count', '1');

        const affiliateSection = screen.getByTestId('affiliate-section');
        expect(affiliateSection).toBeInTheDocument();
        expect(affiliateSection).toHaveAttribute('data-affiliate-count', '1');

        const commissionSection = screen.getByTestId('commission-section');
        expect(commissionSection).toBeInTheDocument();
        expect(commissionSection).toHaveAttribute('data-droplinked', '15');
        expect(commissionSection).toHaveAttribute('data-stripe', '5');

        const paymentDetailsSection = screen.getByTestId('payment-details-section');
        expect(paymentDetailsSection).toBeInTheDocument();
        expect(paymentDetailsSection).toHaveAttribute('data-order-id', mockOrderData.orderInformation.orderId);
        expect(paymentDetailsSection).toHaveAttribute('data-is-physical', 'true');
        expect(paymentDetailsSection).toHaveAttribute('data-has-gift-card', 'true');
    });

    test('renders correctly for digital product (no shipping section)', () => {
        const digitalProductOrderData = {
            ...mockOrderData,
            customer: {
                ...mockOrderData.customer,
                address: null
            }
        };

        render(<OrderInformation orderData={digitalProductOrderData} isFetching={false} />);

        // Check that customer section is rendered with is-physical=false
        const customerSection = screen.getByTestId('customer-info-section');
        expect(customerSection).toBeInTheDocument();
        expect(customerSection).toHaveAttribute('data-is-physical', 'false');

        // Check that shipping section is not rendered
        const shippingSection = screen.queryByTestId('shipping-section');
        expect(shippingSection).not.toBeInTheDocument();

        // Check that payment details section has is-physical=false
        const paymentDetailsSection = screen.getByTestId('payment-details-section');
        expect(paymentDetailsSection).toBeInTheDocument();
        expect(paymentDetailsSection).toHaveAttribute('data-is-physical', 'false');
    });

    test('renders correctly without affiliates', () => {
        const orderDataWithoutAffiliates = {
            ...mockOrderData,
            affiliates: undefined
        };

        render(<OrderInformation orderData={orderDataWithoutAffiliates} isFetching={false} />);

        // Check that affiliate section is not rendered
        const affiliateSection = screen.queryByTestId('affiliate-section');
        expect(affiliateSection).not.toBeInTheDocument();

        // Other sections should still be rendered
        const customerSection = screen.getByTestId('customer-info-section');
        expect(customerSection).toBeInTheDocument();

        const paymentDetailsSection = screen.getByTestId('payment-details-section');
        expect(paymentDetailsSection).toBeInTheDocument();
    });
});