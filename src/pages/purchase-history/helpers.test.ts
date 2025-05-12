import {
    getStatusColorScheme,
    isOrderCancelled,
    formatUnderlinedText,
    truncateText,
    getCustomerDisplayName,
} from './helpers';

describe('getStatusColorScheme', () => {
    it('returns success for PAYMENT_CONFIRMED status', () => {
        expect(getStatusColorScheme('PAYMENT_CONFIRMED')).toBe('success');
    });

    it('returns pending for INITIALIZED_FOR_PAYMENT status', () => {
        expect(getStatusColorScheme('INITIALIZED_FOR_PAYMENT')).toBe('pending');
    });

    it('returns error for CANCELED status', () => {
        expect(getStatusColorScheme('CANCELED')).toBe('error');
    });

    it('returns pending for undefined status', () => {
        expect(getStatusColorScheme(undefined)).toBe('pending');
    });
});

describe('isOrderCancelled', () => {
    it('returns true for CANCELED status', () => {
        expect(isOrderCancelled('CANCELED')).toBe(true);
    });

    it('returns false for other statuses', () => {
        expect(isOrderCancelled('PAYMENT_CONFIRMED')).toBe(false);
        expect(isOrderCancelled('INITIALIZED_FOR_PAYMENT')).toBe(false);
        expect(isOrderCancelled(undefined)).toBe(false);
    });
});

describe('formatUnderlinedText', () => {
    it('converts underscored text to title case', () => {
        expect(formatUnderlinedText('PAYMENT_CONFIRMED')).toBe('Payment Confirmed');
        expect(formatUnderlinedText('INITIALIZED_FOR_PAYMENT')).toBe('Initialized For Payment');
        expect(formatUnderlinedText('CANCELED')).toBe('Canceled');
    });

    it('returns empty string for empty input', () => {
        expect(formatUnderlinedText('')).toBe('');
    });
});

describe('truncateText', () => {
    it('returns the original text if length is less than maxLength', () => {
        expect(truncateText('Short text', 15)).toBe('Short text');
    });

    it('truncates text if length exceeds maxLength', () => {
        expect(truncateText('This is a very long text that should be truncated', 15)).toBe('This is a very ...');
    });

    it('uses default maxLength if not provided', () => {
        expect(truncateText('This is a very long text that should be truncated')).toBe('This is a very ...');
    });

    it('returns empty string for empty input', () => {
        expect(truncateText('')).toBe('');
    });
});

describe('getCustomerDisplayName', () => {
    it('returns full name if both first and last name are available', () => {
        expect(getCustomerDisplayName(
            { firstName: 'John', lastName: 'Doe' },
            'john.doe@example.com'
        )).toBe('John Doe');
    });

    it('returns only firstName if lastName is not available', () => {
        expect(getCustomerDisplayName(
            { firstName: 'John', lastName: '' },
            'john.doe@example.com'
        )).toBe('John');
    });

    it('returns only lastName if firstName is not available', () => {
        expect(getCustomerDisplayName(
            { firstName: '', lastName: 'Doe' },
            'john.doe@example.com'
        )).toBe('Doe');
    });

    it('returns email if addressBook is not available', () => {
        expect(getCustomerDisplayName(
            undefined,
            'john.doe@example.com'
        )).toBe('john.doe@example.com');
    });

    it('returns empty string if neither addressBook nor email is available', () => {
        expect(getCustomerDisplayName(
            undefined,
            undefined
        )).toBe('');
    });
});
