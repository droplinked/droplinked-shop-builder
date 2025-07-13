// filepath: i:\droplinked-shop-builder\src\pages\purchase-history\components\drawer-sections\PaymentDetailsSection.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IOrderDetails } from 'services/order/interfaces';
import PaymentDetailsSection from './PaymentDetailsSection';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, direction, gap, borderBottom, px, pb, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-direction={direction}
                data-gap={gap}
                data-border-bottom={borderBottom}
                {...props}
            >
                {children}
            </div>
        );
    },
    Box: function MockBox({ children, as, color, ...props }) {
        return (
            <div
                data-testid="box"
                data-as={as}
                data-color={color}
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

jest.mock('components/common/clipboardText/ClipboardText', () => ({
    __esModule: true,
    default: function MockClipboardText({ text, ...props }) {
        return (
            <div data-testid="clipboard-text" data-text={text} {...props}>
                Copy
            </div>
        );
    }
}));

jest.mock('components/redesign/external-link/ExternalLink', () => ({
    __esModule: true,
    default: function MockExternalLink({ href, children, ...props }) {
        return (
            <a
                data-testid="external-link"
                href={href}
                {...props}
            >
                {children}
            </a>
        );
    }
}));

jest.mock('../drawer-components/InfoWrapper', () => ({
    __esModule: true,
    default: function MockInfoWrapper({ title, children, flexProps, textProps }) {
        return (
            <div
                data-testid="info-wrapper"
                data-title={title}
                data-flex-props={flexProps ? JSON.stringify(flexProps) : ''}
                data-text-props={textProps ? JSON.stringify(textProps) : ''}
            >
                {children}
            </div>
        );
    }
}));

jest.mock('../drawer-components/TitledText', () => ({
    __esModule: true,
    default: function MockTitledText({ title, text, direction, rightContent }) {
        return (
            <div
                data-testid="titled-text"
                data-title={title}
                data-direction={direction}
            >
                <div data-testid="titled-text-content">{text}</div>
                {rightContent && <div data-testid="titled-text-right-content">{rightContent}</div>}
            </div>
        );
    }
}));

describe('PaymentDetailsSection', () => {
    const mockDetails: IOrderDetails["details"] = {
        products: 100,
        shipping: 15,
        tax: 10,
        cart: 125,
        profit: 85,
        paidWith: 'Credit Card',
        type: 'physical'
    };

    const mockTrackingInfo: IOrderDetails["trackingInfo"] = [
        {
            title: 'Shipping Tracking',
            trackings: [
                {
                    name: 'Tracking Number 1',
                    url: 'https://example.com/track1'
                }
            ]
        }
    ];

    const mockGiftCard: IOrderDetails["giftCard"] = {
        credit: 20,
        amount: 10,
        netProfit: 75,
        ruleset: 5
    };

    const mockOrderId = 'order-123456';

    test('renders correctly with all props for physical product', () => {
        render(
            <PaymentDetailsSection
                details={mockDetails}
                trackingInfo={mockTrackingInfo}
                giftCard={mockGiftCard}
                isPhysical={true}
                orderId={mockOrderId}
            />
        );

        // Check the main wrapper
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toBeInTheDocument();
        expect(infoWrapper).toHaveAttribute('data-title', 'Payment Details');

        // Check the discount section
        const titledTexts = screen.getAllByTestId('titled-text');
        const discount = titledTexts.find(el => el.getAttribute('data-title') === 'Discount');
        expect(discount).toBeInTheDocument();

        // Check the ruleset section
        const ruleset = titledTexts.find(el => el.getAttribute('data-title') === 'Discount Ruleset');
        expect(ruleset).toBeInTheDocument();

        // Check the products section
        const products = titledTexts.find(el => el.getAttribute('data-title') === 'Total Products');
        expect(products).toBeInTheDocument();

        // Check that shipping is displayed for physical products
        const shipping = titledTexts.find(el => el.getAttribute('data-title') === 'Shipping');
        expect(shipping).toBeInTheDocument();

        // Check the profit section
        const profit = titledTexts.find(el => el.getAttribute('data-title') === 'Total Net Profit');
        expect(profit).toBeInTheDocument();

        // Check the payment method
        const paymentMethod = titledTexts.find(el => el.getAttribute('data-title') === 'Payment Method');
        expect(paymentMethod).toBeInTheDocument();

        // Check the order ID
        const orderIdElement = titledTexts.find(el => el.getAttribute('data-title') === 'Order ID');
        expect(orderIdElement).toBeInTheDocument();

        // Check the tracking info
        const trackingTitle = titledTexts.find(el => el.getAttribute('data-title') === mockTrackingInfo[0].title);
        expect(trackingTitle).toBeInTheDocument();

        // Check the external link for tracking
        const externalLink = screen.getByTestId('external-link');
        expect(externalLink).toBeInTheDocument();
        expect(externalLink).toHaveAttribute('href', mockTrackingInfo[0].trackings[0].url);
    });

    test('renders correctly for digital product (no shipping)', () => {
        render(
            <PaymentDetailsSection
                details={mockDetails}
                trackingInfo={mockTrackingInfo}
                giftCard={mockGiftCard}
                isPhysical={false}
                orderId={mockOrderId}
            />
        );

        // Check that shipping is not displayed for digital products
        const titledTexts = screen.getAllByTestId('titled-text');
        const shippingTexts = titledTexts.filter(el => el.getAttribute('data-title') === 'Shipping');
        expect(shippingTexts.length).toBe(0);
    });

    test('renders correctly without gift card', () => {
        render(
            <PaymentDetailsSection
                details={mockDetails}
                trackingInfo={mockTrackingInfo}
                isPhysical={true}
                orderId={mockOrderId}
            />
        );

        // Discount shouldn't be present without gift card
        const titledTexts = screen.getAllByTestId('titled-text');
        const discountTexts = titledTexts.filter(el => el.getAttribute('data-title') === 'Discount');
        expect(discountTexts.length).toBe(0);

        const rulesetTexts = titledTexts.filter(el => el.getAttribute('data-title') === 'Discount Ruleset');
        expect(rulesetTexts.length).toBe(0);
    });

    test('renders correctly with gift card that has no ruleset', () => {
        const giftCardWithoutRuleset = { ...mockGiftCard, ruleset: 0 };

        render(
            <PaymentDetailsSection
                details={mockDetails}
                trackingInfo={mockTrackingInfo}
                giftCard={giftCardWithoutRuleset}
                isPhysical={true}
                orderId={mockOrderId}
            />
        );

        // Discount should be present
        const titledTexts = screen.getAllByTestId('titled-text');
        const discountTexts = titledTexts.filter(el => el.getAttribute('data-title') === 'Discount');
        expect(discountTexts.length).toBe(1);

        // Ruleset shouldn't be present with ruleset = 0
        const rulesetTexts = titledTexts.filter(el => el.getAttribute('data-title') === 'Discount Ruleset');
        expect(rulesetTexts.length).toBe(0);
    });
});