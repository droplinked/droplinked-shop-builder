/**
 * Utility functions for managing language preferences via cookies
 * These functions work both on client and server side for SSR compatibility
 */

// Function to get language from cookie (works on both client and server)
export function getLanguageFromCookie(cookieString?: string): string {
    const cookie = cookieString || (typeof document !== 'undefined' ? document.cookie : '');
    const languageMatch = cookie.match(/language=([^;]+)/);
    return languageMatch ? languageMatch[1] : 'en';
}

// Function to set language in cookie (client-side only)
export function setLanguageInCookie(language: string): void {
    if (typeof document === 'undefined') return;

    // Set cookie with 1 year expiration
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `language=${language}; expires=${expirationDate.toUTCString()}; path=/`;
}

// Function to check if language is RTL
export function isRTLLanguage(language: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(language);
}

// Function to set HTML attributes based on language
export function setHTMLAttributes(language: string): void {
    if (typeof document === 'undefined') return;

    const isRTL = isRTLLanguage(language);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
}
