import { handleValidations } from '../../../pages/settings/validationHandlers';
import { ISettings } from '../../../pages/settings/formConfigs';

describe('Validation Handlers', () => {
    // Mock showToast function
    const showToastMock = jest.fn();

    // Reset mock between tests
    beforeEach(() => {
        showToastMock.mockClear();
    });

    describe('handleValidations', () => {
        it('should return true when all validations pass', () => {
            // Valid settings object
            const validSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: 'yes',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [
                    { type: 'CREDIT_CARD', isActive: true },
                    { type: 'CRYPTO', isActive: false },
                ],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 50 },
                            { destinationAddress: '0x456', percent: 50 },
                        ]
                    },
                    {
                        type: 'SOL',
                        destinationAddress: [
                            { destinationAddress: 'sol123', percent: 100 },
                        ]
                    }
                ],
                loginMethods: [
                    { name: 'Email', isActivated: true, type: 'EMAIL' },
                    { name: 'Wallet', isActivated: false, type: 'WALLET' },
                ]
            };

            const result = handleValidations({ values: validSettings, showToast: showToastMock });

            expect(result).toBe(true);
            expect(showToastMock).not.toHaveBeenCalled();
        });

        it('should validate and fail when total wallet percentage exceeds 100', () => {
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: 'yes',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [{ type: 'CREDIT_CARD', isActive: true }],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 60 },
                            { destinationAddress: '0x456', percent: 50 }, // Exceeds 100%
                        ]
                    }
                ],
                loginMethods: [{ name: 'Email', isActivated: true, type: 'EMAIL' }]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please double-check your EVM wallets section, the total percentage must not exceed 100.',
                options: { autoClose: 5000 }
            });
        });

        it('should validate and fail when wallet percentage is zero', () => {
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: 'yes',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [{ type: 'CREDIT_CARD', isActive: true }],
                paymentWallets: [
                    {
                        type: 'SOL',
                        destinationAddress: [
                            { destinationAddress: 'sol123', percent: 0 }, // Zero percentage
                            { destinationAddress: 'sol456', percent: 100 },
                        ]
                    }
                ],
                loginMethods: [{ name: 'Email', isActivated: true, type: 'EMAIL' }]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please ensure all Solana wallet percentages are greater than 0.',
                options: { autoClose: 5000 }
            });
        });

        it('should validate and fail when no payment methods are selected', () => {
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: 'yes',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [
                    { type: 'CREDIT_CARD', isActive: false },
                    { type: 'CRYPTO', isActive: false },
                ],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 100 },
                        ]
                    }
                ],
                loginMethods: [{ name: 'Email', isActivated: true, type: 'EMAIL' }]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please select at least one payment method.',
                options: { autoClose: 5000 }
            });
        });

        it('should validate and fail when no login methods are selected', () => {
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: 'yes',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [{ type: 'CREDIT_CARD', isActive: true }],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 100 },
                        ]
                    }
                ],
                loginMethods: [
                    { name: 'Email', isActivated: false, type: 'EMAIL' },
                    { name: 'Wallet', isActivated: false, type: 'WALLET' },
                ]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please select at least one login method.',
                options: { autoClose: 5000 }
            });
        });
    });

    describe('Individual validation handlers', () => {
        it('should validate wallet percentages correctly', () => {
            // We'll test the internal functions by calling handleValidations with specific test cases

            // Test case: EVM wallet with exactly 100% total (valid)
            const validSettings: ISettings = {
                name: 'Test',
                email: 'test@example.com',
                pre_purchase_data_fetch: '',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [{ type: 'CREDIT_CARD', isActive: true }],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 30 },
                            { destinationAddress: '0x456', percent: 70 },
                        ]
                    }
                ],
                loginMethods: [{ name: 'Email', isActivated: true, type: 'EMAIL' }]
            };

            const result = handleValidations({ values: validSettings, showToast: showToastMock });

            expect(result).toBe(true);
            expect(showToastMock).not.toHaveBeenCalled();

            // Test case: SOL wallet with over 100% total (invalid)
            const invalidSettings: ISettings = {
                ...validSettings,
                paymentWallets: [
                    {
                        type: 'SOL',
                        destinationAddress: [
                            { destinationAddress: 'sol123', percent: 80 },
                            { destinationAddress: 'sol456', percent: 30 },
                        ]
                    }
                ],
            };

            showToastMock.mockClear();
            const invalidResult = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(invalidResult).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith(expect.objectContaining({
                type: 'error',
                message: expect.stringContaining('Solana')
            }));
        });
    });

    // Testing validations in the order they're called in the handleValidations function
    describe('Validation order', () => {
        it('should stop after the first validation failure (percentage > 100)', () => {
            // Create settings that would fail all validations
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: '',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [
                    { type: 'CREDIT_CARD', isActive: false } // No active payment methods
                ],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 60 },
                            { destinationAddress: '0x456', percent: 50 }, // >100%
                        ]
                    },
                    {
                        type: 'SOL',
                        destinationAddress: [
                            { destinationAddress: 'sol123', percent: 0 }, // Zero percent
                        ]
                    }
                ],
                loginMethods: [
                    { name: 'Email', isActivated: false, type: 'EMAIL' } // No active login methods
                ]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledTimes(1); // Only called once
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please double-check your EVM wallets section, the total percentage must not exceed 100.',
                options: { autoClose: 5000 }
            });
        });

        it('should check zero percentage validation after total percentage validation', () => {
            // Create settings that would fail zero percentage but pass total percentage check
            const invalidSettings: ISettings = {
                name: 'Test Shop',
                email: 'test@example.com',
                pre_purchase_data_fetch: '',
                isAgeRestricted: false,
                currencyAbbreviation: 'USD',
                paymentMethods: [{ type: 'CREDIT_CARD', isActive: true }],
                paymentWallets: [
                    {
                        type: 'EVM',
                        destinationAddress: [
                            { destinationAddress: '0x123', percent: 0 }, // Zero percent
                            { destinationAddress: '0x456', percent: 90 }, // <100% total
                        ]
                    }
                ],
                loginMethods: [{ name: 'Email', isActivated: true, type: 'EMAIL' }]
            };

            const result = handleValidations({ values: invalidSettings, showToast: showToastMock });

            expect(result).toBe(false);
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Please ensure all EVM wallet percentages are greater than 0.',
                options: { autoClose: 5000 }
            });
        });
    });
});