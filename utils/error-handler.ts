/**
 * Error Handler Utility
 * Centralized error handling for API requests
 */

import { APIError, NetworkError, ValidationError } from './errors';

interface ExchangeRateAPIError {
    result: 'error';
    'error-type': string;
}

/**
 * Handle API errors with proper typing and user-friendly messages
 */
export function handleAPIError(error: unknown): never {
    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError('Unable to connect to the exchange rate service. Please check your internet connection.');
    }

    // API-specific errors
    if (isExchangeRateAPIError(error)) {
        const errorType = error['error-type'];
        const errorMessages: Record<string, string> = {
            'unsupported-code': 'The selected currency is not supported.',
            'malformed-request': 'Invalid request format. Please try again.',
            'invalid-key': 'API key is invalid. Please contact support.',
            'inactive-account': 'API account is inactive. Please contact support.',
            'quota-reached': 'API request limit reached. Please try again later.',
        };

        throw new APIError(
            errorMessages[errorType] || 'An unexpected error occurred.',
            400,
            errorType
        );
    }

    // Generic errors
    if (error instanceof Error) {
        throw new APIError(error.message);
    }

    // Unknown errors
    throw new APIError('An unexpected error occurred. Please try again.');
}

/**
 * Type guard for ExchangeRate API errors
 */
function isExchangeRateAPIError(error: unknown): error is ExchangeRateAPIError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'result' in error &&
        error.result === 'error' &&
        'error-type' in error
    );
}

/**
 * Validate currency conversion inputs
 */
export function validateConversionInputs(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): void {
    if (!amount || amount <= 0) {
        throw new ValidationError('Please enter a valid amount greater than zero.');
    }

    if (!fromCurrency || !toCurrency) {
        throw new ValidationError('Please select both currencies.');
    }

    if (fromCurrency === toCurrency) {
        throw new ValidationError('Please select different currencies for conversion.');
    }
}
