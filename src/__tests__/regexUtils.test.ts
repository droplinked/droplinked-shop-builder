import {
    usernameRegex,
    passwordRegex,
    domainRegex,
    customStoreURLRegex
} from '../utils/helpers/regexUtils';

describe('Regex Utility Patterns', () => {

    describe('usernameRegex', () => {
        test('should match valid usernames', () => {
            const validUsernames = [
                'user123',
                'User_123',
                'JohnDoe',
                '_user_',
                '123456',
                'a',
            ];

            validUsernames.forEach(username => {
                expect(username).toMatch(usernameRegex);
            });
        });

        test('should reject invalid usernames', () => {
            const invalidUsernames = [
                'user@123',
                'User 123',
                'John-Doe',
                'user.name',
                'user!',
                'user$',
                'user+name',
            ];

            invalidUsernames.forEach(username => {
                expect(username).not.toMatch(usernameRegex);
            });
        });
    });

    describe('passwordRegex', () => {
        test('should match valid passwords', () => {
            const validPasswords = [
                'Password123',
                'abcDEF123',
                'Pass1234!',
                'ComplexP@ssw0rd',
                '12345Aa!',
                'LongPassword123456',
            ];

            validPasswords.forEach(password => {
                expect(password).toMatch(passwordRegex);
            });
        });

        test('should reject invalid passwords', () => {
            const invalidPasswords = [
                'password',  // no uppercase, no number
                'PASSWORD',  // no lowercase, no number
                '12345678',  // no letters
                'Pass',      // too short
                'passwordpassword',  // no uppercase, no number
                'Password',  // no number
            ];

            invalidPasswords.forEach(password => {
                expect(password).not.toMatch(passwordRegex);
            });
        });

        test('should require minimum length of 8 characters', () => {
            expect('Abc123!').not.toMatch(passwordRegex); // 7 characters
            expect('Abcd123!').toMatch(passwordRegex);    // 8 characters
        });

        test('should require at least one uppercase letter', () => {
            expect('password123').not.toMatch(passwordRegex);
            expect('Password123').toMatch(passwordRegex);
        });

        test('should require at least one lowercase letter', () => {
            expect('PASSWORD123').not.toMatch(passwordRegex);
            expect('PASSWORd123').toMatch(passwordRegex);
        });

        test('should require at least one digit', () => {
            expect('PasswordAbc').not.toMatch(passwordRegex);
            expect('PasswordAbc1').toMatch(passwordRegex);
        });
    });

    describe('domainRegex', () => {
        test('should match valid domains', () => {
            const validDomains = [
                'example.com',
                'www.example.com',
                'sub.example.com',
                'http://example.com',
                'https://example.com',
                'https://www.example.com',
                'example-site.com',
                'example.co.uk',
            ];

            validDomains.forEach(domain => {
                expect(domain).toMatch(domainRegex);
            });
        });

        test('should reject invalid domains', () => {
            const invalidDomains = [
                'example',
                'example.',
                '.com',
                'example@.com',
                'https:/example.com',
                'http//example.com',
                'example..com',
                '-example.com',
                'example-.com',
                'example.com/',
                'example.c',  // TLD too short
            ];

            invalidDomains.forEach(domain => {
                expect(domain).not.toMatch(domainRegex);
            });
        });
    });

    describe('customStoreURLRegex', () => {
        test('should match valid custom store URLs', () => {
            const validStoreURLs = [
                'mystore.example.com',
                'my-store.example.com',
                'store123.example.co.uk',
            ];

            validStoreURLs.forEach(url => {
                expect(url).toMatch(customStoreURLRegex);
            });
        });

        test('should reject invalid custom store URLs', () => {
            const invalidStoreURLs = [
                'mystore',
                'mystore.c',
                'my store.example.com',
                'mystore@example.com',
                'http://mystore.example.com',
                'https://mystore.example.com',
                'www.mystore.example.com',
                'mystore.example.',
                '.mystore.example.com',
            ];

            invalidStoreURLs.forEach(url => {
                expect(url).not.toMatch(customStoreURLRegex);
            });
        });
    });
});