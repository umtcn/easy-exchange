/**
 * API Configuration
 * Centralized configuration for supported currencies
 * Note: API calls now go through server-side routes (/api/convert)
 */

/**
 * Supported currencies for conversion
 */
export const SUPPORTED_CURRENCIES = {
    USD: { code: 'USD', name: 'US Dollar', symbol: '$' },
    GBP: { code: 'GBP', name: 'British Pound', symbol: '£' },
    EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
} as const;

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;
